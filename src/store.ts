import { createMemo } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import lunr from "lunr";

import { DeltaChatEvent } from "./event";

type Search = {
  timestampRange?: TimestampRange;
  fulltext?: string;
};

export type TimestampRange = {
  start: number | null;
  end: number | null;
};

const [events, setEvents] = createStore<DeltaChatEvent[]>([]);

export { setEvents };

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
      search.timestampRange == null || inRange(search.timestampRange, event.ts)
  );
}

export function fulltextSearchEvents(fulltext: string): DeltaChatEvent[] {
  const terms = fulltext.split(" ");
  return fulltextIndex()
    .query((q) => {
      for (const term of terms) {
        q.term(term, {
          wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
        });
      }
    })
    .map((entry) => idToEvent.get(Number(entry.ref))!);
}

const idToEvent = new Map<number, DeltaChatEvent>();

const fulltextIndex = createMemo(() =>
  lunr((o) => {
    o.ref("id");
    o.field("event_type", { boost: 50 });
    o.field("data1", { boost: 10 });
    o.field("data2", { boost: 100 });
    // XXX this will be very expensive if new events come in, so
    // need to change strategy then
    idToEvent.clear();
    for (const event of events) {
      idToEvent.set(event.id, event);
      const cleaned = unwrap(event);
      o.add({
        id: cleaned.id,
        ts: cleaned.ts,
        event_type: cleaned.event_type,
        data1: cleaned.data1,
        data2: cleaned.data2,
      });
    }
  })
);
