import { Component, Accessor, Setter, createMemo } from "solid-js";

import DateInput from "./DateInput";
import { TimestampRange } from "./store";

const TimestampRangeFilter: Component<{
  value: Accessor<TimestampRange>;
  setValue: Setter<TimestampRange>;
}> = (props) => {
  const startDate = createMemo(() => timestampToDate(props.value().start));
  const endDate = createMemo(() => timestampToDate(props.value().end));
  const setStartDate = (date: Date | undefined) => {
    props.setValue((prev) => ({
      start: dateToTimestamp(date),
      end: prev.end,
    }));
  };
  const setEndDate = (date: Date | undefined) => {
    props.setValue((prev) => ({
      start: prev.start,
      end: dateToTimestamp(date),
    }));
  };

  return (
    <div class="flex flex-row gap-1">
      <DateInput
        value={startDate}
        setValue={setStartDate}
        placeholder="Start time"
      />
      <DateInput value={endDate} setValue={setEndDate} placeholder="End time" />
    </div>
  );
};

function timestampToDate(timestamp: number | null): Date | undefined {
  if (timestamp == null) {
    return undefined;
  }
  return new Date(timestamp);
}

function dateToTimestamp(date: Date | undefined): number | null {
  if (date == null) {
    return null;
  }
  return date.getTime();
}

export default TimestampRangeFilter;
