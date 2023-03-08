import { createMemo, createRoot } from "solid-js";
import { createStore, produce } from "solid-js/store";
import lunr from "lunr";

import { DeltaChatEvent } from "./event";
import { debounce } from "./debounce";
import { Payload } from "./types";
import sampleEvents from "./sampledata.json"

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

export function convert_to_dcevent(event: any): Payload {
  if (typeof event.event === "object") {
    let event_name = Object.keys(event.event)[0]
    console.log(typeof event.event[event_name]);

    if (typeof event.event[event_name] == "object") {
      let inner_event = event.event[event_name]
      let keys = Object.keys(inner_event)
      return {
        ts: event.time,
        event_type: event_name,
        data1: inner_event[keys[0]],
        data2: inner_event[keys[1]],
      }

    } else {
      return {
        ts: event.time,
        event_type: event_name,
        data1: null,
        data2: event.event[event_name],
      }
    }
  }
  else if (typeof event.event === "string") {
    return {
      ts: event.time,
      data1: null,
      data2: null,
      event_type: event.event,
    }
  } else {
    throw new Error("can't happen")
  }
}

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

export function addMockEvents() {
  setEvents(
    produce((events) => {
      let curr_index = events.length
      events.push(...sampleEvents.map((payload, i) => { return { ...convert_to_dcevent(payload), id: curr_index + i } }));
    })
  );
}

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
