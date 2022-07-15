import {
  Component,
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  Show,
} from "solid-js";

import Table, { Column } from "./Table";
import TimestampRangeFilter from "./TimestampRangeFilter";
import TextInput from "./TextInput";
import { DeltaChatEvent } from "./event";
import { randomEvents } from "./fake-event";
import { searchEvents, TimestampRange, setEvents } from "./store";
import { parse } from "./dc-desktop-log";
import EventInfo from "./EventInfo";
import { createOpen } from "./createOpen";
import { AppContainer, Header, Content } from "./Layout";
import Button from "./Button";

const columns: Column<DeltaChatEvent>[] = [
  {
    label: "ts",
    width: "20%",
    render: (props) => new Date(props.record.ts).toISOString(),
  },
  {
    label: "event",
    width: "20%",
    render: (props) => props.record.event_type,
  },
  {
    label: "data1",
    width: "10%",
    render: (props) => props.record.data1,
  },
  {
    label: "data2",
    width: "50%",
    render: (props) => props.record.data2,
  },
];

const App: Component = () => {
  const [timestampRange, setTimestampRange] = createSignal<TimestampRange>({
    start: null,
    end: null,
  });
  const [fulltext, setFulltext] = createSignal<string>("");

  const { isOpen, onOpen, onClose } = createOpen();

  const events = createMemo(() =>
    searchEvents({
      timestampRange: timestampRange(),
      fulltext: fulltext(),
    })
  );

  const handleFake = (amount: number) => {
    setEvents(randomEvents(new Date(Date.now()), amount));
  };

  const handlePaste = (ev: ClipboardEvent) => {
    if (ev.clipboardData == null) {
      console.error("No clipboardData");
      return;
    }
    let data = ev.clipboardData.getData("text/plain");
    console.log("Got clipboard data!");

    let events: DeltaChatEvent[];

    try {
      events = parse(data);
    } catch (e) {
      console.error("Could not parse clipboard data, is it a DC desktop log?");
      throw e;
    }
    setEvents(events);
  };

  onMount(() => {
    document.addEventListener("paste", handlePaste);
  });

  onCleanup(() => {
    document.removeEventListener("paste", handlePaste);
  });

  return (
    <AppContainer>
      <Header>
        <div class="flex flex-col gap-2 bg-slate-200 px-2 py-2">
          <div class="flex flex-row gap-2 bg-slate-200">
            <TextInput
              placeholder="Search"
              value={fulltext}
              setValue={setFulltext}
              debounce={500}
            />
            <Show
              when={!isOpen()}
              fallback={<Button onClick={onClose}>Less</Button>}
            >
              <Button onClick={onOpen}>More</Button>
            </Show>
          </div>
          <Show when={isOpen()}>
            <TimestampRangeFilter
              value={timestampRange}
              setValue={setTimestampRange}
            />
            <div class="flex flex-row gap-1">
              <Button onClick={() => handleFake(10)}>Fake 10</Button>
              <Button onClick={() => handleFake(100)}>Fake 100</Button>
              <Button onClick={() => handleFake(1000)}>Fake 1k</Button>
              <Button onClick={() => handleFake(10000)}>Fake 10k</Button>
              <Button onClick={() => handleFake(100000)}>Fake 100k</Button>
            </div>
          </Show>
        </div>
      </Header>
      <Content>
        <Table columns={columns} data={events} infoModal={EventInfo} />
      </Content>
    </AppContainer>
  );
};

export default App;
