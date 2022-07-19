import { addEvent } from "./store";

export function installUpdateListener() {
  window.webxdc.setUpdateListener((update) => {
    addEvent({ ...update.payload, id: update.serial });
  }, 0);
}
