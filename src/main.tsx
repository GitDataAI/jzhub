import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/app.less'
import { Toaster } from '@pheralb/toast';
import {Modal} from "@/context/Modal.tsx";
import {BaseStyles, ThemeProvider} from "@primer/react";
createRoot(document.getElementById('root')!).render(
  <React.Fragment>
                  <ThemeProvider>
                      <BaseStyles>
                          <Modal>
                              <App />
                          </Modal>
                        </BaseStyles>
                  </ThemeProvider>
      <Toaster position="top-right"/>\
  </React.Fragment>
)
