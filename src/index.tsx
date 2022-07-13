/* @refresh reload */
import "the-new-css-reset/css/reset.css";
import { render } from "solid-js/web";

import "./index.css";

import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
