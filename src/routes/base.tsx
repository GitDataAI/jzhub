import {RouteObject} from "react-router-dom";
import {Layout} from "../app/Layout.tsx";
import ProfileLayout from "@/app/Profile.tsx";
import RepoNew from "@/app/new/Repo.tsx";

export const BaseRouter = ():RouteObject[] => {
    return [
        {
            path: "/",
            element: <Layout/>
        },
        {
            path: "/new",
            children: [
                {
                    path: "repo",
                    element: <RepoNew/>
                }
            ]
        },
        {
            path: "/:username",
            element: <ProfileLayout/>
        }
    ]
}