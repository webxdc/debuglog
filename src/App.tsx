import { Component } from "solid-js";

import Table, { Column } from "./Table";
import { DeltaChatEvent } from "./event";
import { randomEvents } from "./fake-event";

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

const events = randomEvents(new Date(Date.now()), 1000);

const App: Component = () => {
  return (
    <div>
      <Table columns={columns} data={events} />
    </div>
  );
};

export default App;
