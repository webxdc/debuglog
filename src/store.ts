import { createMemo, createRoot } from "solid-js";
import { createStore, produce } from "solid-js/store";
import lunr from "lunr";

import { DeltaChatEvent } from "./event";
import { debounce } from "./debounce";

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
        q.term(term.toLowerCase(), {
          wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
        });
      }
    })
    .map((entry) => idToEvent.get(Number(entry.ref))!);
}

const idToEvent = new Map<number, DeltaChatEvent>();

let eventsToAdd: DeltaChatEvent[] = [];

const debouncedFlushEvents = debounce(() => {
  setEvents(
    produce((events) => {
      events.push(...eventsToAdd);
    })
  );
  eventsToAdd = [];
}, 300);

export function addEvent(event: DeltaChatEvent): void {
  eventsToAdd.push(event);
  // add events to the events store, but debounced so they are added in
  // batches
  debouncedFlushEvents();
}

const fulltextIndex = createRoot(() =>
  createMemo(() =>
    lunr((o) => {
      o.ref("id");
      o.field("event_type", { boost: 50 });
      o.field("data1", { boost: 10 });
      o.field("data2", { boost: 100 });
      // recalculating the index as new events come in and reconstructing from
      // the events is expensive, but the performance seems to be tolerable
      // Unfortunately lunr only allows precalculated indices and not incremental
      // ones.
      // https://github.com/olivernn/lunr.js/issues/284
      idToEvent.clear();
      for (const event of events) {
        idToEvent.set(event.id, event);
        o.add(event);
      }
    })
  )
);
