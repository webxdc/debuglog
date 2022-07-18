import { Component, Show } from "solid-js";

import Modal from "./Modal";
import { DeltaChatEvent } from "./event";
import Button from "./Button";
import type { InfoModalProps } from "./Table";

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

function EventInfo<C>(
  props: InfoModalProps<DeltaChatEvent> & {
    onContext: (record: DeltaChatEvent) => void;
  }
) {
  const handleContext = () => {
    const selected = props.selected();
    if (selected != null) {
      props.onContext(selected);
    }
    props.onClose();
  };
  return (
    <Show when={props.selected()}>
      {(selected) => (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <div class="flex h-full items-center justify-center">
            <div class="flex h-5/6 w-5/6 flex-col justify-between">
              <EventInfoContent value={selected} />
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
}

export default EventInfo;
