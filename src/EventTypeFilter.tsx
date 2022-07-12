import { Component, Accessor, Setter, For } from "solid-js";
import { eventTypes } from "./event";

type SelectValue = string | undefined;

const EventTypeFilter: Component<{
  eventType: Accessor<SelectValue>;
  setEventType: Setter<SelectValue>;
}> = (props) => {
  return (
    <select
      value={props.eventType()}
      class="select-css"
      onChange={(ev) => {
        props.setEventType(ev.currentTarget.value);
      }}
    >
      <For each={eventTypes()}>
        {(eventType) => <option>{eventType}</option>}
      </For>
    </select>
  );
};

export default EventTypeFilter;
