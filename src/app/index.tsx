import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { QueryBoundary, Skeleton } from "@/shared";

import * as hocs from "./hocs";
import router from "./router";

import "./styles/normalize.css";
import "./styles/inline-style.css";
import "./styles/editor-style.css";
import { HelmetProvider } from "react-helmet-async";

const root = createRoot(document.getElementById("root") as HTMLElement);

const helmetContext = {};

root.render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <hocs.QueryClient>
        <QueryBoundary loadingFallback={<Skeleton height={300} />}>
          <hocs.ToastContainer>
            <RouterProvider router={router} />
          </hocs.ToastContainer>
        </QueryBoundary>
      </hocs.QueryClient>
    </HelmetProvider>
    <SpeedInsights />
  </React.StrictMode>
);
