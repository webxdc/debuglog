import { WebXdc } from "webxdc-types";

type Payload = {
  ts: number;
  event_type: string;
  data1: number | null;
  data2: string | number | null;
};

declare global {
  interface Window {
    webxdc: WebXdc<Payload>;
  }
}
