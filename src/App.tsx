import {
  Component,
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  Show,
  batch,
  createEffect,
} from "solid-js";

import Table, { Column } from "./Table";
import TimestampRangeFilter from "./TimestampRangeFilter";
import TextInput from "./TextInput";
import { DeltaChatEvent } from "./event";
import { searchEvents, TimestampRange, setEvents } from "./store";
import { parse } from "./dc-desktop-log";
import EventInfo from "./EventInfo";
import { createOpen } from "./createOpen";
import { AppContainer, Header, Content } from "./Layout";
import Button from "./Button";

const CONTEXT_TIME = 5000; // 5 seconds

const columns: Column<DeltaChatEvent>[] = [
  {
    label: "ts",
    width: "20%",
    render: (props) => {
      let data = new Date(props.record.ts * 1000)
      return `${data.toLocaleDateString()} <${data.toLocaleTimeString()}>`
    }
    ,
  },
  {
    label: "event",
    width: "20%",
    render: (props) => props.record.event_type,
  },
  {
    label: "data2",
    width: "50%",
    render: (props) => props.record.data2,
  },
  {
    label: "data1",
    width: "10%",
    render: (props) => props.record.data1,
  },
];

const App: Component = () => {
  const [timestampRange, setTimestampRange] = createSignal<TimestampRange>({
    start: null,
    end: null,
  });
  const [fulltext, setFulltext] = createSignal<string>("");

  const { isOpen, onOpen, onClose } = createOpen();

  const [scroll, setScroll] = createSignal<
    ((index: number) => void) | undefined
  >(undefined);

  const events = createMemo(() =>
    searchEvents({
      timestampRange: timestampRange(),
      fulltext: fulltext(),
    })
  );

  const scrollTo = (index: number) => {
    const scrollFunc = scroll();
    if (scrollFunc != null) {
      scrollFunc(index);
    }
  };

  createEffect(() => {
    events();
    // scroll to index 0 when events are filtered
    scrollTo(0);
  });

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

  const handleContext = (selected: DeltaChatEvent) => {
    batch(() => {
      setFulltext("");
      setTimestampRange({ start: null, end: null });
    });
    scrollTo(selected.id);
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
          <div class="flex flex-row justify-between gap-2 bg-slate-200">
            <div class="flex w-1/2 flex-row justify-between">
              <TextInput
                placeholder="Search"
                value={fulltext}
                setValue={setFulltext}
                debounce={500}
              />
              <div class="text-lg">{events().length}</div>
            </div>
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
          </Show>
        </div>
      </Header>
      <Content>
        <Table
          columns={columns}
          data={events}
          infoModal={(props) => (
            <EventInfo {...props} onContext={handleContext} />
          )}
          setScroll={(scroll) => {
            setScroll(() => scroll);
          }}
        />
      </Content>
    </AppContainer>
  );
};

export default App;
