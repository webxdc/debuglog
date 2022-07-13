import { DeltaChatEvent } from "./event";

export function parse(log: string): DeltaChatEvent[] {
  const lines = log.split("\n");
  const result: DeltaChatEvent[] = [];
  let id = 0;
  for (const line of lines) {
    const parts = line.split("\t");
    if (parts[1].trim() !== "core/event") {
      continue;
    }
    const ts = new Date(parts[0]).getTime();
    const event_type = unquote(parts[5]);
    // XXX should parse these into right types?
    const data1 = Number(parts[6]);
    const data2 = unquote(parts[7]);

    result.push({
      id,
      ts,
      event_type,
      data1,
      data2,
    });
  }
  return result;
}

function unquote(s: string): string {
  if (s.startsWith('"')) {
    s = s.slice(1);
  }
  if (s.endsWith('"')) {
    s = s.slice(0, s.length - 1);
  }
  return s;
}
