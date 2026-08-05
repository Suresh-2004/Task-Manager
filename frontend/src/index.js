// main entry point
import React from "react";
import ReactDOM from "react-dom/client";

import "./app.css";
import App from "./App";

// grab the div with id root from index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// render the app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);