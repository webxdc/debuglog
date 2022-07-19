import { WebXdc, UpdateListener } from "webxdc-types";

import { Payload } from "./types";

class FakeDatabase {
  payloads: Payload[] = [];
  listener: UpdateListener<Payload> | undefined = undefined;
  serial: number = 0;

  createFakeWebXdc(): WebXdc<Payload> {
    return {
      sendUpdate: () => {
        // ignore any updates sent
      },
      setUpdateListener: async (listener, serial = 0) => {
        this.listener = listener;
        // send the initial events
        const payloads = this.payloads.slice(serial);
        let currentSerial = serial;
        for (const payload of payloads) {
          this.listen(payload);
        }
      },
      selfAddr: "debuglog",
      selfName: "debuglog",
    };
  }

  // send an event
  listen(payload: Payload): void {
    if (this.listener == null) {
      return;
    }
    this.listener({
      serial: this.serial,
      max_serial: this.payloads.length,
      payload: payload,
    });
    this.serial++;
  }

  // add a payload and send it if there's a listener
  add(payload: Payload): void {
    this.payloads.push(payload);
    this.listen(payload);
  }

  addPayloads(payloads: Payload[]): void {
    for (const payload of payloads) {
      this.add(payload);
    }
  }
}

export const fakeDb = new FakeDatabase();
