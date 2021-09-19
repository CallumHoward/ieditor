import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

// uncomment this if you need this for debugging. Do not make it
// available when building for production or else it will slow down
// the app

// import whyDidYouRender from "@welldone-software/why-did-you-render";
//   whyDidYouRender(React, {
//     trackAllPureComponents: false,
//   });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
