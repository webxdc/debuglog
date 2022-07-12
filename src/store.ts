import { createStore } from "solid-js/store";

import { DeltaChatEvent } from "./event";
import { randomEvents } from "./fake-event";

type Search = {
  eventType?: string;
  timestampRange?: TimestampRange;
};

export type TimestampRange = {
  start: number | null;
  end: number | null;
};

const [events, setEvents] = createStore<DeltaChatEvent[]>([]);

setEvents(randomEvents(new Date(Date.now()), 1000));

function inRange(timestampRange: TimestampRange, timestamp: number): boolean {
  return (
    (timestampRange.start == null || timestamp >= timestampRange.start) &&
    (timestampRange.end == null || timestamp < timestampRange.end)
  );
}

export function searchEvents(search: Search): DeltaChatEvent[] {
  return events.filter(
    (event) =>
      (search.eventType == null || event.event_type === search.eventType) &&
      (search.timestampRange == null ||
        inRange(search.timestampRange, event.ts))
  );
}
