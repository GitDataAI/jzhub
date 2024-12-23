import {useInfo} from "@/store/useInfo.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useUser} from "@/store/useUser.tsx";
import {useEffect, useState} from "react";
import {GoOrganization, GoProject, GoRepo, GoRepoPush} from "react-icons/go";

export const LayoutHeader = () => {
    const info = useInfo();
    const user = useUser();
    const [Avatar, setAvatar] = useState('');
    const [ShowCreate, setShowCreate] = useState(false);
    useInfo.subscribe((data)=>{
        if (data.ModelShowId != 1){
            setShowCreate(false);
        }
    })
    useEffect(()=>{
        setAvatar(user.user?.profile?.avatar || "")
    },[])
    const nav = useNavigate();
    const CreateItem = [
        {
            icon: <GoRepo/>,
            name: 'New Repository',
            onClick: () => {
                nav('/new/repo');
            }
        },
        {
            icon: <GoRepoPush/>,
            name: 'Import Repository',
            onClick: () => {
                nav('/new/repo/import');
            }
        },
        {
            icon: <GoProject/>,
            name: 'New Project',
            onClick: () => {
                nav('/new/project');
            }
        },
        {
            icon: <GoOrganization/>,
            name: 'New Organization',
            onClick: () => {
                nav('/new/group');
            }
        }
    ]
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
                    <button onClick={(e) => {
                        info.setModelShowId(1);
                        setShowCreate(true);
                        e.stopPropagation();
                    }}> +
                        {
                            ShowCreate ? (
                                <div className="layout-header-right-create-card">
                                    <ul>
                                        {CreateItem.map((item, index) => (
                                            <li key={index} onClick={item.onClick}>
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null
                        }
                    </button>
                </div>
                <div className="layout-header-right-notifications">
                    <IoIosNotificationsOutline/>
                </div>
                <div className="layout-header-right-avatar">
                    <img src={Avatar} alt="GitDataAi" onClick={(e) => {
                        info.setModelShowId(3);
                        nav(`/${user.model?.username}`)
                        e.stopPropagation();
                    }}/>
                </div>
            </div>
        </div>
    )
}