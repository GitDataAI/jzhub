import {Route, Routes} from "react-router-dom";
import AuthLayout from "./app/auth/Layout.tsx";
import Login from "./app/auth/Login.tsx";
import Apply from "./app/auth/Apply.tsx";
import RootLayout from "./app/Root.tsx";
import ProfileLayout from "./app/profile/Layout.tsx";
import NewLayout from "./app/new/NewLayout.tsx";
import RepositoryNew from "./app/new/RepositoryNew.tsx";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="apply" element={<Apply />} />
        <Route path="login" element={<Login />} />
      </Route>
        <Route path="/" element={<RootLayout/>}>
        </Route>
        <Route path="/new" element={<NewLayout/>}>
            <Route path="repository" element={<RepositoryNew/>}/>
        </Route>
        <Route path="/:username" element={<ProfileLayout/>}/>

    </Routes>
  )
}

export default App
