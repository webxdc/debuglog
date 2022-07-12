import { Component, createSignal } from "solid-js";

import Table, { Column } from "./Table";
import EventTypeFilter from "./EventTypeFilter";
import { DeltaChatEvent } from "./event";
import { searchEvents } from "./store";

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
  return (
    <div>
      <EventTypeFilter eventType={eventType} setEventType={setEventType} />
      <Table
        columns={columns}
        data={searchEvents({ eventType: eventType() })}
      />
    </div>
  );
};

export default App;
