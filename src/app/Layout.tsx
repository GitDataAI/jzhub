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
        user.initial().then(res=>{
            if (!res){
                nav("/auth/login")
            }else{
                console.log("Welcome")
            }
        });
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