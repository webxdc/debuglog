import {
  createSignal,
  Component,
  For,
  Accessor,
  createMemo,
  Setter,
} from "solid-js";

import { createVirtualizer } from "./solid-virtual";
import { createOpen } from "./Modal";
import "./table.css";

export type Column<T> = {
  label: string;
  width: string;
  render: Component<{ value: T }>;
};

function Row<T>(props: {
  columns: Column<T>[];
  data: Accessor<T[]>;
  index: number;
  onSelect: (value: Accessor<T | undefined>) => void;
}) {
  const value = createMemo(() => {
    return props.data()[props.index];
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        "flex-direction": "row",
        "justify-content": "flex-start",
        gap: "10px",
      }}
      onClick={() => {
        props.onSelect(value);
      }}
    >
      <For each={props.columns}>
        {(column) => <Cell value={value} column={column} />}
      </For>
    </div>
  );
}

function Cell<T>(props: { column: Column<T>; value: Accessor<T> }) {
  const rendered = createMemo(() =>
    props.column.render({ value: props.value() })
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

type InfoModal<T> = Component<{
  value: Accessor<T | undefined>;
  onClose: () => void;
  isOpen: Accessor<boolean>;
}>;

function Table<T>(props: {
  columns: Column<T>[];
  data: Accessor<T[]>;
  infoModal: InfoModal<T>;
}) {
  const { isOpen, onClose, onOpen } = createOpen();
  const [selectedValue, setSelectedValue] = createSignal<T | undefined>(
    undefined
  );

  const handleClose = () => {
    setSelectedValue(undefined);
    onClose();
  };
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
      {props.infoModal({ value: selectedValue, onClose: handleClose, isOpen })}
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
                  <Row
                    data={props.data}
                    columns={props.columns}
                    index={virtualItem.index}
                    onSelect={(value: Accessor<T | undefined>) => {
                      onOpen();
                      setSelectedValue(value);
                    }}
                  />
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
