import { DeltaChatEvent } from "./event";
import { randomEvents } from "./fake-event";

type Search = {
  eventType?: string;
};

const events = randomEvents(new Date(Date.now()), 1000);

export function searchEvents(search: Search): DeltaChatEvent[] {
  return events.filter(
    (event) => search.eventType == null || event.event_type === search.eventType
  );
}
