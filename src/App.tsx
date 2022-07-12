import { Component, createSignal, createMemo } from "solid-js";

import Table, { Column } from "./Table";
import EventTypeFilter from "./EventTypeFilter";
import TimestampRangeFilter from "./TimestampRangeFilter";
import { DeltaChatEvent } from "./event";
import { searchEvents, TimestampRange } from "./store";

const columns: Column<DeltaChatEvent>[] = [
  {
    label: "ts",
    width: "20%",
    render: (props) => new Date(props.value.ts).toISOString(),
  },
  {
    label: "event",
    width: "30%",
    render: (props) => props.value.event_type,
  },
  {
    label: "data1",
    width: "30%",
    render: (props) => props.value.data1,
  },
  {
    label: "data2",
    width: "30%",
    render: (props) => props.value.data2,
  },
];

const App: Component = () => {
  const [eventType, setEventType] = createSignal<string | undefined>(undefined);
  const [timestampRange, setTimestampRange] = createSignal<TimestampRange>({
    start: null,
    end: null,
  });

  const events = createMemo(() =>
    searchEvents({
      eventType: eventType(),
      timestampRange: timestampRange(),
    })
  );
  return (
    <div>
      <EventTypeFilter value={eventType} setValue={setEventType} />
      <TimestampRangeFilter
        value={timestampRange}
        setValue={setTimestampRange}
      />
      <Table columns={columns} data={events} />
    </div>
  );
};

export default App;
