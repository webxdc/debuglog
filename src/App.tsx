import {
  Component,
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  JSX,
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
  // class="mr-1 rounded-lg border border-blue-700 px-1 py-1
  // text-center text-sm font-medium text-blue-700
  // hover:bg-blue-800 hover:text-white focus:outline-none
  // focus:ring-4 focus:ring-blue-300 dark:border-blue-500
  // dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white
  // dark:focus:ring-blue-800"

  return (
    <button
      class="mr-1 rounded-lg border border-gray-200 bg-white py-1
             px-1 text-sm font-medium text-gray-900 hover:bg-gray-100
             hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4
             focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800
             dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
             dark:focus:ring-gray-700"
      {...props}
    />
  );
};

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
    <div class="flex flex-col gap-1 font-sans">
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
        </Show>
      </div>
      <div class="flex flex-row gap-1">
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
