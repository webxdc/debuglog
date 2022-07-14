import {
  Component,
  Accessor,
  Setter,
  createSignal,
  createEffect,
} from "solid-js";

import DateInput from "./DateInput";
import { TimestampRange } from "./store";

const TimestampRangeFilter: Component<{
  value: Accessor<TimestampRange>;
  setValue: Setter<TimestampRange>;
}> = (props) => {
  const [startDate, setStartDate] = createSignal<Date | undefined>(
    timestampToDate(props.value().start)
  );
  const [endDate, setEndDate] = createSignal<Date | undefined>(
    timestampToDate(props.value().end)
  );

  createEffect(() => {
    props.setValue({
      start: dateToTimestamp(startDate()),
      end: dateToTimestamp(endDate()),
    });
  });

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
