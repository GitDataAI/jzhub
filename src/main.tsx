import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/app.less'
import { Toaster } from '@pheralb/toast';
import {Modal} from "@/context/Modal.tsx";
createRoot(document.getElementById('root')!).render(
  <React.Fragment>
              <Modal>
                  <App />
              </Modal>
              <Toaster position="top-right"/>
  </React.Fragment>,
)
