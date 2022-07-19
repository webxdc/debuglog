import { addEvent } from "./store";

let idCounter = 0;

export function installUpdateListener() {
  window.webxdc.setUpdateListener((update) => {
    addEvent({ ...update.payload, id: idCounter });
    idCounter++;
  }, 0);
}
