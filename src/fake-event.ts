import {
  eventDeclarations,
  EventDeclarations,
  EventDeclaration,
  DeclarationField,
  DeltaChatEvent,
} from "./event";

type EventDeclarationArray = [string, EventDeclaration][];

export function randomEvents(
  startTime: Date,
  amount: number
): DeltaChatEvent[] {
  const declarations = createEventDeclarationArray(eventDeclarations);
  const result: DeltaChatEvent[] = [];
  let ts = startTime.getTime();
  for (let i = 0; i < amount; i++) {
    result.push(randomEvent(declarations, i, ts));
    ts = ts + randomInt(1000);
  }
  return result;
}

function randomEvent(
  declarations: EventDeclarationArray,
  id: number,
  ts: number
): DeltaChatEvent {
  const [eventType, declaration] = declarations[randomInt(declarations.length)];
  return {
    id,
    ts,
    event_type: eventType,
    data1: randomField(declaration.data1),
    data2: randomField(declaration.data2),
  };
}

function createEventDeclarationArray(
  declarations: EventDeclarations
): EventDeclarationArray {
  return Object.entries(declarations);
}

function randomField(
  field: DeclarationField | undefined
): string | number | undefined {
  if (field == null) {
    return undefined;
  }
  if (field.type === "string") {
    return randomChoice(["Alpha", "Beta", "Gamma", "Delta"]);
  } else if (field.type === "int") {
    return randomInt(1000);
  } else {
    throw new Error("Unknown field type");
  }
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function randomChoice<T>(l: T[]): T {
  return l[randomInt(l.length)];
}
