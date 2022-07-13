import { Component, Accessor, Show } from "solid-js";

import Modal from "./Modal";
import { DeltaChatEvent } from "./event";

const EventInfo: Component<{
  value: Accessor<DeltaChatEvent | undefined>;
  onClose: () => void;
  isOpen: Accessor<boolean>;
}> = (props) => {
  return (
    <Show when={props.value()}>
      {(value) => (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <table class="event-info-table">
            <tbody>
              <tr>
                <td style={{ width: "10%" }}>ts</td>
                <td>{value.ts}</td>
              </tr>
              <tr>
                <td>event</td>
                <td>{value.event_type}</td>
              </tr>
              <tr>
                <td>data1</td>
                <td>{value.data1}</td>
              </tr>
              <tr>
                <td>data2</td>
                <td>
                  <p>{value.data2}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </Show>
  );
};

export default EventInfo;
