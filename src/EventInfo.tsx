import { Component, Accessor, Show } from "solid-js";

import Modal from "./Modal";
import { DeltaChatEvent } from "./event";

const InfoRow: Component<{ label: string; value: any }> = (props) => {
  return (
    <tr>
      <td class="w-1/12 font-semibold">{props.label}</td>
      <td>
        <p>{props.value}</p>
      </td>
    </tr>
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
          <table class="my-14 ml-10 w-full border">
            <tbody>
              <InfoRow label="ts" value={value.ts} />
              <InfoRow label="event" value={value.event_type} />
              <InfoRow label="data1" value={value.data1} />
              <InfoRow label="data2" value={value.data2} />
            </tbody>
          </table>
        </Modal>
      )}
    </Show>
  );
};

export default EventInfo;
