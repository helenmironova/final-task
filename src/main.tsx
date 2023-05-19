import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context.tsx";

import App from "./App.tsx";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
