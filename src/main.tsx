import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import "./style/app.sass"
import {createTheme, MantineProvider} from "@mantine/core";
import { Toaster } from '@pheralb/toast';
import {BaseStyles, ThemeProvider} from '@primer/react';

const theme = createTheme({
    /** Put your mantine theme override here */
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider theme={theme}>
          <ThemeProvider>
              <BaseStyles>
                    <App />
              </BaseStyles>
          </ThemeProvider>
      </MantineProvider>
      <Toaster position="top-right"/>
  </StrictMode>,
)
