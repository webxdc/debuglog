import {
  Component,
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  JSX,
} from "solid-js";

import Table, { Column } from "./Table";
import TimestampRangeFilter from "./TimestampRangeFilter";
import TextInput from "./TextInput";
import { DeltaChatEvent } from "./event";
import { randomEvents } from "./fake-event";
import { searchEvents, TimestampRange, setEvents } from "./store";
import { parse } from "./dc-desktop-log";
import EventInfo from "./EventInfo";

const columns: Column<DeltaChatEvent>[] = [
  {
    label: "ts",
    width: "15%",
    render: (props) => new Date(props.value.ts).toISOString(),
  },
  {
    label: "event",
    width: "15%",
    render: (props) => props.value.event_type,
  },
  {
    label: "data1",
    width: "5%",
    render: (props) => props.value.data1,
  },
  {
    label: "data2",
    width: "55%",
    render: (props) => props.value.data2,
  },
];

const Button: Component<JSX.IntrinsicElements["button"]> = (props) => {
  return <button class="border-2 p-1 border-solid" {...props} />;
};

const App: Component = () => {
  const [timestampRange, setTimestampRange] = createSignal<TimestampRange>({
    start: null,
    end: null,
  });
  const [fulltext, setFulltext] = createSignal<string>("");

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
    <div class="font-sans">
      <div class="flex flex-row gap-4">
        <TextInput
          placeholder="Search"
          value={fulltext}
          setValue={setFulltext}
          debounce={500}
        />
        <TimestampRangeFilter
          value={timestampRange}
          setValue={setTimestampRange}
        />
      </div>
      <div class="flex flex-row gap-2">
        <Button onClick={() => handleFake(10)}>Fake 10</Button>
        <Button onClick={() => handleFake(100)}>Fake 100</Button>
        <Button onClick={() => handleFake(1000)}>Fake 1k</Button>
        <Button onClick={() => handleFake(10000)}>Fake 10k</Button>
        <Button onClick={() => handleFake(100000)}>Fake 100k</Button>
      </div>
      <Table columns={columns} data={events} infoModal={EventInfo} />
    </div>
  );
};

export default App;
