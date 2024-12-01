import {RouteObject} from "react-router-dom";
import {AuthLayout} from "../app/auth/Layout.tsx";
import {Login} from "../app/auth/Login.tsx";
import {Apply} from "../app/auth/Apply.tsx";
import {Reset} from "@/app/auth/Reset.tsx";

export const AuthRouter = ():RouteObject[] => {
    return [
        {
            path: "/auth",
            element: <AuthLayout/>,
            children:[
                {
                    path: "login",
                    element: <Login/>
                },
                {
                    path: "apply",
                    element: <Apply/>
                },
                {
                    path: "reset",
                    element: <Reset/>
                },
            ]
        }
    ]
}