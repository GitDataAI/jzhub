import {Route, Routes} from "react-router-dom";
import AuthLayout from "./app/auth/Layout.tsx";
import Login from "./app/auth/Login.tsx";
import Apply from "./app/auth/Apply.tsx";
import RootLayout from "./app/Root.tsx";
import ProfileLayout from "./app/profile/Layout.tsx";
import NewLayout from "./app/new/NewLayout.tsx";
import RepositoryNew from "./app/new/RepositoryNew.tsx";
import RepoLayout from "./app/repo/Layout.tsx";
import FileTree from "./app/repo/FileTree.tsx";
import ExportLayout from "./app/export/ExportLayout.tsx";
import HistoryLayout from "./app/history/HistoryLayout.tsx";
import HomeLayout from "./app/home/HomeLayout.tsx";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="apply" element={<Apply />} />
        <Route path="login" element={<Login />} />
      </Route>
        <Route path="/" element={<RootLayout/>}>
            <Route path="" element={<ExportLayout/>}/>
            <Route path="/explore" element={<ExportLayout/>}/>
            <Route path="/home" element={<HomeLayout/>}/>
            <Route path="/history" element={<HistoryLayout/>}/>
        </Route>
        <Route path="/new" element={<NewLayout/>}>
            <Route path="repository" element={<RepositoryNew/>}/>
        </Route>
        <Route path="/:username" element={<ProfileLayout/>}/>
        <Route path="/:owner/:repo" element={<RepoLayout/>}>
            <Route path="" element={<FileTree/>}/>
        </Route>
    </Routes>
  )
}

export default App
