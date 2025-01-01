import {RouteObject, RouterProvider, createBrowserRouter} from "react-router-dom";
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

const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '', element: <ExportLayout /> },
            { path: '/explore', element: <ExportLayout /> },
            { path: '/home', element: <HomeLayout /> },
            { path: '/history', element: <HistoryLayout /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'apply', element: <Apply /> },
            { path: 'login', element: <Login /> },
        ],
    },
    {
        path: '/new',
        element: <NewLayout />,
        children: [
            { path: 'repository', element: <RepositoryNew /> },
        ],
    },
    {
        path: '/:username',
        element: <ProfileLayout />,
    },
    {
        path: '/:owner/:repo',
        element: <RepoLayout />,
        children: [
            { path: '', element: <FileTree /> },
        ],
    },
];
function App() {
  return (
   <RouterProvider router={createBrowserRouter(routes)}/>
  )
}

export default App
