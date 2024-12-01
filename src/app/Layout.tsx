import {LayoutHeader} from "../component/layout/Header.tsx";
import {LayoutSidebar} from "@/component/layout/Sidebar.tsx";
import {useInfo} from "@/store/useInfo.tsx";

export const Layout = () => {
    const info = useInfo();
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