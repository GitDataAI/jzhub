import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import {BrowserRouter} from "react-router";
import "./style/app.sass"
import {createTheme, MantineProvider} from "@mantine/core";
import { Toaster } from '@pheralb/toast';

const theme = createTheme({
    /** Put your mantine theme override here */
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </MantineProvider>
      <Toaster position="top-right"/>
  </StrictMode>,
)
