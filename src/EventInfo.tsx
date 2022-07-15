import { Component, Accessor, Show } from "solid-js";

import Modal from "./Modal";
import { DeltaChatEvent } from "./event";
import Button from "./Button";

const InfoRow: Component<{ label: string; value: any }> = (props) => {
  return (
    <div class="flex">
      <div class="w-1/4 font-semibold">{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
};

const EventInfoContent: Component<{ value: DeltaChatEvent }> = (props) => {
  return (
    <div class="flex w-full flex-col">
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
  onContext: (value: DeltaChatEvent) => void;
}> = (props) => {
  const handleContext = () => {
    const value = props.value();
    if (value != null) {
      props.onContext(value);
    }
    props.onClose();
  };
  return (
    <Show when={props.value()}>
      {(value) => (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <div class="flex h-full items-center justify-center">
            <div class="flex h-5/6 w-5/6 flex-col justify-between">
              <EventInfoContent value={value} />
              <div class="flex items-center justify-center">
                <Button class="h-16 w-64" onClick={handleContext}>
                  Context
                </Button>
                <Button class="h-16 w-64" onClick={props.onClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Show>
  );
};

export default EventInfo;
