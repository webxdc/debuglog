import {
  createSignal,
  Component,
  For,
  Accessor,
  createMemo,
  createEffect,
  onMount,
} from "solid-js";

import { createVirtualizer, VirtualItem } from "./solid-virtual";
import { createOpen } from "./createOpen";

export type Column<T> = {
  label: string;
  width: string;
  render: Component<{ record: T }>;
};

function Row<T>(props: {
  columns: Column<T>[];
  data: Accessor<T[]>;
  virtualItem: VirtualItem<unknown>;
  onSelect: (value: T) => void;
  onInfo: (value: T) => void;
  isSelected: (value: T) => boolean;
}) {
  const value = createMemo(() => {
    return props.data()[props.virtualItem.index];
  });

  return (
    <div
      class="absolute top-0 left-0 flex w-full items-center justify-center"
      classList={{
        "bg-slate-200": props.virtualItem.index % 2 === 0,
        "bg-slate-400": props.isSelected(value()),
      }}
      style={{
        height: `${props.virtualItem.size}px`,
        transform: `translateY(${props.virtualItem.start}px)`,
      }}
      onClick={() => {
        props.onSelect(value());
      }}
      onDblClick={() => {
        props.onInfo(value());
      }}
      // onContextMenu={() => {
      //   // this should be a long-press on mobile
      //   props.onInfo(value());
      // }}
    >
      <div class="flex w-full flex-row justify-start gap-2.5">
        <For each={props.columns}>
          {(column) => <Cell value={value} column={column} />}
        </For>
      </div>
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

export type InfoModalProps<T> = {
  selected: Accessor<T | undefined>;
  onClose: () => void;
  isOpen: Accessor<boolean>;
};

type InfoModal<T> = Component<InfoModalProps<T>>;

function Table<T>(props: {
  columns: Column<T>[];
  data: Accessor<T[]>;
  infoModal: InfoModal<T>;
  setScroll: (scroll: (index: number) => void) => void;
}) {
  const { isOpen, onClose, onOpen } = createOpen();

  const handleClose = () => {
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

  createEffect(() => {
    const virtualizer = rowVirtualizer();
    props.setScroll((index) => {
      virtualizer.scrollToIndex(index);
    });
  });

  const [selected, setSelected] = createSignal<T | undefined>(undefined);

  const handleSelect = (selected: T) => {
    setSelected(() => selected);
  };

  const handleInfo = (selected: T) => {
    setSelected(() => selected);
    onOpen();
  };

  const isSelected = (record: T) => {
    const current = selected();
    if (current == null) {
      return false;
    }
    return current === record;
  };

  return (
    <div class="flex h-full select-none flex-col">
      {props.infoModal({
        selected: selected,
        onClose: handleClose,
        isOpen,
      })}
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
            {(virtualItem) => (
              <Row
                data={props.data}
                columns={props.columns}
                virtualItem={virtualItem}
                onInfo={handleInfo}
                onSelect={handleSelect}
                isSelected={isSelected}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

export default Table;
