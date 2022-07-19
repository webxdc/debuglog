/* @refresh reload */
// import "the-new-css-reset/css/reset.css";
import { render } from "solid-js/web";
import "tailwindcss/tailwind.css";

import "./index.css";
import App from "./App";
import { fakeDb } from "./fake-webxdc";
import { installUpdateListener } from "./webxdc";

if (window.webxdc === undefined) {
  window.webxdc = fakeDb.createFakeWebXdc();
}

installUpdateListener();

render(() => <App />, document.getElementById("root") as HTMLElement);
