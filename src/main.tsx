import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routers from "./router/Routers";
import "./i18n/i18n";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/index.css";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./theme/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <PrimeReactProvider>
        <RouterProvider router={Routers()} />
      </PrimeReactProvider>
    </ThemeProvider>
  </StrictMode>
);
