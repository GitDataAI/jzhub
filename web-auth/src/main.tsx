import { createRoot } from 'react-dom/client'
import Layouts from './layout.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css"
import Login from "./page/Login.tsx";
import {Toaster} from "@pheralb/toast";
import Apply from "./page/Apply.tsx";
import Reset from "./page/Reset.tsx";

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path={"/auth"} element={<Layouts/>}>
          <Route path={"login"} element={<Login/>}/>
          <Route path={"apply"} element={<Apply/>}/>
          <Route path={"reset"} element={<Reset/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster position="top-right" />
  </>
)
