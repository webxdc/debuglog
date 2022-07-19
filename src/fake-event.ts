import { Payload } from "./types";
import {
  eventDeclarations,
  EventDeclarations,
  EventDeclaration,
  DeclarationField,
} from "./event";

type EventDeclarationArray = [string, EventDeclaration][];

export function randomEvents(startTime: Date, amount: number): Payload[] {
  const declarations = createEventDeclarationArray(eventDeclarations);
  const result: Payload[] = [];
  let ts = startTime.getTime();
  for (let i = 0; i < amount; i++) {
    result.push(randomEvent(declarations, ts));
    ts = ts + randomInt(1000);
  }
  return result;
}

function randomEvent(declarations: EventDeclarationArray, ts: number): Payload {
  const [eventType, declaration] = declarations[randomInt(declarations.length)];
  return {
    ts,
    event_type: eventType,
    data1: randomData1Field(declaration.data1),
    data2: randomData2Field(declaration.data2),
  };
}

function createEventDeclarationArray(
  declarations: EventDeclarations
): EventDeclarationArray {
  return Object.entries(declarations);
}

function randomData1Field(field: DeclarationField | undefined): number | null {
  if (field == null) {
    return null;
  }
  if (field.type === "int") {
    return randomInt(1000);
  } else {
    throw new Error("Unknown field type");
  }
}

function randomData2Field(
  field: DeclarationField | undefined
): string | number | null {
  if (field == null) {
    return null;
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
