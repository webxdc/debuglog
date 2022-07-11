import { Component } from "solid-js";

import Table, { Column } from "./Table";

type Record = {
  label: string;
  value: number;
};

const columns: Column<Record>[] = [
  {
    label: "Label",
    width: "70%",
    render: (props) => props.value.label,
  },
  { label: "Value", width: "30%", render: (props) => props.value.value },
];

const data: Record[] = [];
for (let i = 0; i < 10000; i++) {
  data.push({
    label: `Label ${i}`,
    value: i,
  });
}

const App: Component = () => {
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default App;
