import {useInfo} from "@/store/useInfo.tsx";
import {MdOutlineDashboard, MdOutlineExplore, MdOutlineHistory, MdOutlineStarBorder} from "react-icons/md";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export const LayoutSidebar = () => {
    const info = useInfo();
    const nav = useNavigate();
    const [workspace, setWorkspace] = useState<{
        avatar: string,
        name: string,
    }>(info.workspace);
    useInfo.subscribe((data)=>{
        setWorkspace(data.workspace);
    })
    const [active,setActive] = useState(info.href.label);
    const ItemMenu = [
        {
            key: "explore",
            name: "探索",
            icon: <MdOutlineExplore />,
        },
        {
            key: "workspace",
            name: "概览",
            icon: <MdOutlineDashboard />,
        },
        {
            key: "starred",
            name: "收藏",
            icon: <MdOutlineStarBorder />,
        },
        {
            key: "history",
            name: "最近",
            icon: <MdOutlineHistory />,
        },
    ]
    const MenuHandler = (e: string) => {
        setActive(e)
        nav(`/${e}`)
        switch (e) {
            case "explore":
                info.setHref({label: "Explore", url: "/explore"})
                break;
            case "workspace":
                info.setHref({label: "Workspace", url: "/workspace"})
                break;
            case "starred":
                info.setHref({label: "Starred", url: "/starred"})
                break;
            case "history":
                info.setHref({label: "History", url: "/history"})
                break;
            default:
                break;
        }
    }
    return(
        <div className="layout-sidebar">
            <div className="layout-sidebar-handsome">
                <img src={workspace.avatar} alt=""/>
                <button onClick={(e)=>{
                    info.setModelShowId(2);
                    e.stopPropagation();
                }}>{workspace.name}</button>
            </div>
            <div className="layout-sidebar-export">
                <ul>
                    {ItemMenu.map((item, index) => (
                        <li key={index} className={item.key === active ? 'active' : ''} id={item.key} onClick={(e)=>{
                            MenuHandler(item.key);
                            e.preventDefault();
                        }}>

                            <span>{item.icon}{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}