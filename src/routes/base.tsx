import {RouteObject} from "react-router-dom";
import {Layout} from "../app/Layout.tsx";

export const BaseRouter = ():RouteObject[] => {
    return [
        {
            path: "/",
            element: <Layout/>
        }
    ]
}