import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./i18n";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
