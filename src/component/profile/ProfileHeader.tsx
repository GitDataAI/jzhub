import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ProfileHeader = ({username}:{username: string}) => {
    const [active,setActive] = useState("dashboard");
    const nav = useNavigate();
    const HeadItem = [
        {
            label:'面板',
            tab: "dashboard"
        },
        {
            label:'仓库',
            tab: "repo"
        },
        {
            label:'计划',
            tab: "plan"
        },
        {
            label:'团队',
            tab: "team"
        },
        {
            label:'收藏',
            tab: "star"
        },
        {
            label:'订阅',
            tab: "sub"
        },
    ]
    const TabHandler = (s:string) => {
        setActive(s)
        nav(`/${username}?tab=${s}`)
    }

    return(
        <div className="profile-header">
            <ul>
                {HeadItem.map((item,index) => (
                    <li key={index} className={active === item.tab ? "active" : ""} onClick={() => TabHandler(item.tab)}>{item.label}</li>
                ))}
            </ul>
        </div>
    )
}


export default ProfileHeader