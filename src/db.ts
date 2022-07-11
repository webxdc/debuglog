import { Accessor } from "solid-js";
import Dexie, { Table } from "dexie";
import { createDexieSignalQuery, createDexieArrayQuery } from "solid-dexie";

// export class Db extends Dexie {
//   records!: Table<Record>;

//   constructor() {
//     super("debuglog");
//     this.version(1).stores({
//       records: "++id, timestamp, instanceId, type, hasInfo",
//     });
//   }
// }

// export const db = new Db();
