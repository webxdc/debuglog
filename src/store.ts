import { createStore } from "solid-js/store";
import lunr from "lunr";

import { DeltaChatEvent } from "./event";
import { randomEvents } from "./fake-event";
import { createEffect } from "solid-js";

type Search = {
  eventType?: string;
  timestampRange?: TimestampRange;
  fulltext?: string;
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
  const filteredEvents =
    search.fulltext != null && search.fulltext.trim() != ""
      ? fulltextSearchEvents(search.fulltext)
      : events;

  return filteredEvents.filter(
    (event) =>
      (search.eventType == null || event.event_type === search.eventType) &&
      (search.timestampRange == null ||
        inRange(search.timestampRange, event.ts))
  );
}

export function fulltextSearchEvents(fulltext: string): DeltaChatEvent[] {
  return fulltextIndex
    .search(fulltext)
    .map((entry) => idToEvent.get(Number(entry.ref))!);
}

const idToEvent = new Map<number, DeltaChatEvent>();

const fulltextIndex = lunr((o) => {
  o.ref("id");
  o.field("event_type", { boost: 50 });
  o.field("data1", { boost: 100 });
  o.field("data2", { boost: 100 });
  // XXX this will be very expensive if new events come in, so
  // need to change strategy then
  createEffect(() => {
    for (const event of events) {
      idToEvent.set(event.id, event);
      o.add(event);
    }
  });
});
