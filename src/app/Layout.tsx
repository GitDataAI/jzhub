import {LayoutHeader} from "../component/layout/Header.tsx";
import {LayoutSidebar} from "@/component/layout/Sidebar.tsx";
import {useInfo} from "@/store/useInfo.tsx";
import {useUser} from "@/store/useUser.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const Layout = () => {
    const nav = useNavigate();
    const info = useInfo();
    const user = useUser();
    const [Show,setShow] = useState(false);
    useEffect(()=>{
        info.InitWorkspace().then().catch();
        if (!user.isLogin){
            nav("/auth/login")
        }else {
            user.initial().then(res=>{
                if (!res){
                    nav("/auth/login")
                }else {
                    setShow(true)
                }
            }).catch();
        }
    },[])
    if (Show){
        return(
            <div onClick={()=>{
                info.setModelShowId(0)
            }}>
                <LayoutHeader/>
                <div className="layout-content">
                    <LayoutSidebar/>
                    <div className="layout-body">
                        <Outlet/>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <>
            </>
        )
    }
}