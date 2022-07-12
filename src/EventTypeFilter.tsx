import { Component, Accessor, Setter, For } from "solid-js";
import { eventTypes } from "./event";

type SelectValue = string | undefined;

const EventTypeFilter: Component<{
  eventType: Accessor<SelectValue>;
  setEventType: Setter<SelectValue>;
}> = (props) => {
  const eventType = () => {
    const value = props.eventType();
    if (value == null) {
      return "*";
    }
    return value;
  };

  return (
    <select
      value={eventType()}
      class="select-css"
      onChange={(ev) => {
        const value = ev.currentTarget.value;
        const eventType = value !== "*" ? value : undefined;
        props.setEventType(eventType);
      }}
    >
      <option value="*">No filter</option>
      <For each={eventTypes()}>
        {(eventType) => <option>{eventType}</option>}
      </For>
    </select>
  );
};

export default EventTypeFilter;
