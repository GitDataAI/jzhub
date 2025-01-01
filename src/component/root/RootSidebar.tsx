import useUser from "../../store/useUser.tsx";
import {useEffect, useState} from "react";
import {SessionModel} from "../../lib/model/UserModel.tsx";
import {GrHomeRounded} from "react-icons/gr";
import {TbTableExport} from "react-icons/tb";
import {FaHistory, FaLock, FaLockOpen} from "react-icons/fa";
import {useNavigate} from "react-router";

export interface RootSidebarProps {
    setPin(b:boolean):void
    Pin: boolean
    exp: boolean
}


const RootSidebar = (props: RootSidebarProps) => {
    const [UserModel, setUserModel] = useState<SessionModel | null>(null);
    const nav = useNavigate();
    useEffect(()=>{
        return useUser.subscribe((state)=>{
            setUserModel(state.user)
        })
    },[])
    return (
        <>
            <div className="root-sidebar-header">
                {
                    props.exp ?
                        <div onClick={() => props.setPin(!props.Pin)} className="root-sidebar-header-pin">
                            {
                                props.Pin ?
                                    <FaLock />
                                    :
                                    <FaLockOpen />
                            }

                        </div>
                        :null
                }
                {
                    UserModel ? (
                        <div className="root-sidebar-header-avatar">
                            <img src={UserModel.avatar_url} alt={UserModel.username}/>
                            {
                                props.exp ?
                                    <a>
                                        {UserModel.username}
                                    </a>
                                    :null
                            }
                        </div>
                    ) : null
                }
                <ul>
                    <li onClick={()=>{nav("/explore")}} style={{
                        background: location.toString().includes("/explore") ? "gainsboro" : "none",
                        borderRadius: 5,
                    }}>
                        <i><TbTableExport /></i>
                        {
                            props.exp ?
                                <a>
                                    探索
                                </a>
                                :null
                        }
                    </li>
                    <li onClick={()=>{nav("/home")}} style={{
                        background: location.toString().includes("/home") ? "gainsboro" : "none",
                        borderRadius: 5,
                    }}>
                        <i><GrHomeRounded /></i>
                        {
                            props.exp ?
                                <a>
                                    主页
                                </a>
                                :null
                        }
                    </li>
                    <li onClick={()=>{nav("/history")}} style={{
                        background: location.toString().includes("/history") ? "gainsboro" : "none",
                        borderRadius: 5,
                    }}>
                        <i><FaHistory /></i>
                        {
                            props.exp ?
                                <a>
                                    历史
                                </a>
                                :null
                        }
                    </li>
                    <hr/>
                </ul>
            </div>
            <div className="root-sidebar-body">

            </div>
        </>
    )
}

export default RootSidebar