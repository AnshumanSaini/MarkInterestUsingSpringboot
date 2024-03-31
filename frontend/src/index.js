import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const id=process.env.REACT_APP_CLIENT_ID;
// console.log(id);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={id}>
        <App />
      </GoogleOAuthProvider>
      ;
    </React.StrictMode>
  </Router>
);
