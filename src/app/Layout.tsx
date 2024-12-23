import {LayoutHeader} from "../component/layout/Header.tsx";
import {LayoutSidebar} from "@/component/layout/Sidebar.tsx";
import {useInfo} from "@/store/useInfo.tsx";
import {useUser} from "@/store/useUser.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Layout = () => {
    const nav = useNavigate();
    const info = useInfo();
    const user = useUser();
    useEffect(()=>{
        info.InitWorkspace().then().catch();
        if (!user.isLogin){
            nav("/auth/login")
        }else {
            user.initial().then().catch();
        }
    },[])
    return(
        <div onClick={()=>{
            info.setModelShowId(0)
        }}>
            <LayoutHeader/>
            <div className="layout-content">
                <LayoutSidebar/>
            </div>
        </div>
    )
}