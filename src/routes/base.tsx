import {RouteObject} from "react-router-dom";
import {Layout} from "../app/Layout.tsx";
import ProfileLayout from "@/app/Profile.tsx";
import RepoNew from "@/app/new/Repo.tsx";
import NewGroup from "@/app/new/Group.tsx";
import ExploreLayout from "@/app/ExploreLayout.tsx";
import WorkSpaceLayout from "@/app/WorkSpaceLayout.tsx";
import StarredLayout from "@/app/StarredLayout.tsx";
import HistoryLayout from "@/app/HistoryLayout.tsx";
import RepoLayout from "@/app/repository/RepoLaypot.tsx";
import RepoActivePage from "@/app/repository/RepoActivePage.tsx";

export const BaseRouter = ():RouteObject[] => {
    return [
        {
            path: "/",
            element: <Layout/>,
            children:[
                {
                    path: "",
                    element: <ExploreLayout/>
                },
                {
                    path: 'explore',
                    element: <ExploreLayout/>
                },
                {
                    path:'workspace',
                    element: <WorkSpaceLayout/>
                },
                {
                    path:'starred',
                    element: <StarredLayout/>
                },
                {
                    path:'history',
                    element: <HistoryLayout/>
                },
            ]
        },
        {
            path: "/new",
            children: [
                {
                    path: "repo",
                    element: <RepoNew/>
                },
                {
                    path: "group",
                    element: <NewGroup/>
                }
            ]
        },
        {
            path: "/:username",
            element: <ProfileLayout/>
        },
        {
            path: "/:owner/:repo",
            element: <RepoLayout/>,
        },
        {
            path: "/:owner/:repo/active",
            element: <RepoActivePage/>
        },
    ]
}