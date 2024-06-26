import React from "react";
import * as ReactDOM from "react-dom/client";
import {  RouterProvider } from "react-router-dom";

// bootstrap
import "bootstrap";

// css
import "@fortawesome/fontawesome-free/css/all.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";
import "./scss/react.scss";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./config/app-route.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
