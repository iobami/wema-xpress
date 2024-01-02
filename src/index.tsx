import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactSession } from "react-client-session";

import "react-toastify/dist/ReactToastify.css";
import "./css/bootstrap.min.css";
import "./css/fonts.css";
import "./css/components.css";
import "./css/typography.css";
import "./css/global.css";
import "./css/utils.css";
import "./css/responsive.css";

import reportWebVitals from "./reportWebVitals";
import { router } from "./navigation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  ReactSession.setStoreType('sessionStorage');

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
