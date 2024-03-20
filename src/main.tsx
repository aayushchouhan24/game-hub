import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import "./index.css";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

const queryClint = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript
        initialColorMode={theme.config.initialColorMode}
      ></ColorModeScript>
      <QueryClientProvider client={queryClint}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
