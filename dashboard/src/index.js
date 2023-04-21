import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import AuthProvider from "context/auth";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <ArgonControllerProvider>
        <PerfectScrollbar>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </PerfectScrollbar>
      </ArgonControllerProvider>
    </AuthProvider>
  </BrowserRouter>
);
