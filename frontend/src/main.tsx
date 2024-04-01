import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./font.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterRoutes } from "./router";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <RouterRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
