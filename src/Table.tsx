import { createSignal, Component, For, Accessor, createMemo } from "solid-js";

import { createVirtualizer } from "./solid-virtual";
import { createOpen } from "./createOpen";

export type Column<T> = {
  label: string;
  width: string;
  render: Component<{ record: T }>;
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
      class="flex w-full flex-row justify-start gap-2.5"
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
    props.column.render({ record: props.value() })
  );

  return (
    <div
      class="truncate"
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
    <div class="flex h-full flex-col">
      {props.infoModal({ value: selectedValue, onClose: handleClose, isOpen })}
      <div class="flex w-full flex-row justify-start gap-2.5">
        <For each={props.columns}>
          {(column) => (
            <div class="truncate font-semibold" style={{ width: column.width }}>
              {column.label}
            </div>
          )}
        </For>
      </div>
      <div
        ref={scrollParentRef}
        class="w-full max-w-full overflow-y-auto
               border border-solid border-slate-200"
      >
        <div
          class="relative w-full"
          style={{
            height: `${rowVirtualizer().getTotalSize()}px`,
          }}
        >
          <For each={rowVirtualizer().getVirtualItems()}>
            {(virtualItem) => {
              return (
                <div
                  class="absolute top-0 left-0 flex w-full items-center justify-center"
                  classList={{
                    "bg-slate-200": virtualItem.index % 2 === 0,
                  }}
                  style={{
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
    </div>
  );
}

export default Table;
