import { addEvent, convert_to_dcevent } from "./store";

let idCounter = 0;

export function installUpdateListener() {
  window.webxdc.setUpdateListener((update) => {
    addEvent({ ...convert_to_dcevent(update.payload), id: idCounter });
    idCounter++;
  }, 0);
}
