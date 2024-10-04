import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Show from "./Show";
import "./CSS/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/show/:id" element={<Show />} />
    </Routes>
  </BrowserRouter>
);

// reportWebVitals();
