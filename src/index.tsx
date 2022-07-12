/* @refresh reload */
import "the-new-css-reset/css/reset.css";
import "fg-select-css/src/select-css.css";
import "./index.css";
import { render } from "solid-js/web";

import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
