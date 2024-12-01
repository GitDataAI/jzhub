import {useInfo} from "@/store/useInfo.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useNavigate} from "react-router-dom";

export const LayoutHeader = () => {
    const info = useInfo();
    const nav = useNavigate();
    return(
        <div className="layout-header">
            <div className="layout-header-logo">
                <img src="/gitdata.ai-redpanda.png" onClick={() => nav('/')} alt="GitDataAI"/>
                <button className="layout-header-btn">
                    <a onClick={() => nav(info.href.url)} target="_blank">{info.href.label}</a>
                </button>
            </div>
            <div className="layout-header-right">
                <div className="layout-header-right-search">
                    <p>Ctrl+F</p>
                </div>
                <div className="layout-header-right-create">
                    <button onClick={(e)=>{
                        info.setModelShowId(1);
                        e.stopPropagation();
                    }}>
                    </button>
                </div>
                <div className="layout-header-right-notifications">
                    <IoIosNotificationsOutline />
                </div>
                <div className="layout-header-right-avatar">
                    <img src="/gitdata.ai-redpanda.png"/>
                </div>
            </div>
        </div>
    )
}