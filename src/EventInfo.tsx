import { Component, Accessor, Show } from "solid-js";

import Modal from "./Modal";
import { DeltaChatEvent } from "./event";

const InfoRow: Component<{ label: string; value: any }> = (props) => {
  return (
    <div class="flex">
      <div class="w-1/6 font-semibold">{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
};

const EventInfoContent: Component<{ value: DeltaChatEvent }> = (props) => {
  return (
    <div class="m-6 flex flex-col">
      <InfoRow label="ts" value={props.value.ts} />
      <InfoRow label="event" value={props.value.event_type} />
      <InfoRow label="data1" value={props.value.data1} />
      <InfoRow label="data2" value={props.value.data2} />
    </div>
  );
};

const EventInfo: Component<{
  value: Accessor<DeltaChatEvent | undefined>;
  onClose: () => void;
  isOpen: Accessor<boolean>;
}> = (props) => {
  return (
    <Show when={props.value()}>
      {(value) => (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <EventInfoContent value={value} />
        </Modal>
      )}
    </Show>
  );
};

export default EventInfo;
