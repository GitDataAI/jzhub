import {BaseRouter} from "./routes/base.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthRouter} from "./routes/auth.tsx";

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
        ...BaseRouter(),
        ...AuthRouter(),
    ])}></RouterProvider>
  )
}

export default App
