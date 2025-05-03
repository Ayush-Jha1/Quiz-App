/**
 * Application Entry Point
 *
 * This file initializes the React application by rendering
 * the main App component into the root DOM element.
 */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the root element and render our App component into it
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
