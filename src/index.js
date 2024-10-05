import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Show from "./Show";
import "./CSS/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModeProvider } from "./Context";
// import { UseMode } from "./Context";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
// const {mode} = UseMode();
root.render(
  <ModeProvider>
    <BrowserRouter>
      <Routes>
        {/* <div style={{backgroundColor: `${mode === 'light' ? '#fff': '#0f0f0f'}`}}> */}
          <Route path="*" element={<App />} />
          <Route path="/show/:id" element={<Show />} />
        {/* </div> */}
      </Routes>
    </BrowserRouter>
  </ModeProvider>
);

// reportWebVitals();
