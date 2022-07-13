import { JSX, Component, For, Accessor, createMemo } from "solid-js";

import { createVirtualizer } from "./solid-virtual";

import "./table.css";

export type Column<T> = {
  label: string;
  width: string;
  render: Component<{ value: T }>;
};

function Cell<T>(props: {
  column: Column<T>;
  data: Accessor<T[]>;
  index: number;
}) {
  const rendered = createMemo(() =>
    props.column.render({ value: props.data()[props.index] })
  );
  return (
    <div
      class="TableCell"
      style={{
        width: props.column.width,
      }}
    >
      {rendered()}
    </div>
  );
}

function Table<T>(props: { columns: Column<T>[]; data: Accessor<T[]> }) {
  // it's important for this ref not to be height 100% as
  // this breaks virtualizer
  let scrollParentRef: HTMLDivElement | undefined;

  const rowVirtualizer = createMemo(() =>
    createVirtualizer({
      count: props.data().length,
      getScrollElement: () => scrollParentRef,
      estimateSize: () => 35,
      overscan: 5,
    })
  );

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          "flex-direction": "row",
          "justify-content": "flex-start",
          gap: "10px",
        }}
      >
        <For each={props.columns}>
          {(column) => (
            <div class="TableHeadCell" style={{ width: column.width }}>
              {column.label}
            </div>
          )}
        </For>
      </div>
      <div
        ref={scrollParentRef}
        class="Table"
        style={{
          height: `87vh`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer().getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          <For each={rowVirtualizer().getVirtualItems()}>
            {(virtualItem) => {
              return (
                <div
                  class={
                    virtualItem.index % 2 ? "TableItemOdd" : "TableItemEven"
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      "flex-direction": "row",
                      "justify-content": "flex-start",
                      gap: "10px",
                    }}
                  >
                    <For each={props.columns}>
                      {(column) => (
                        <Cell
                          data={props.data}
                          column={column}
                          index={virtualItem.index}
                        />
                      )}
                    </For>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </>
  );
}

export default Table;
