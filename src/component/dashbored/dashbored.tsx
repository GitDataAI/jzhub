import {UserDashBored, } from "@/server/types";
import {UserButton} from "@/component/layout/userbtn";
import { Divider, Menu, MenuItem} from "@mantine/core";
import {useRouter} from "next/navigation";

interface DashboredProps {
    user: UserDashBored
}

export const Dashbored = ({user}: DashboredProps) => {
    const nav = useRouter().replace;
    const repo = user.repos;

    return (
        <div className="dashbored">
            <div className="dashbored-left">
                <div className="dashbored-left-header">
                    <UserButton image={user.user.avatar || ""} name={user.user.username.substring(0,20)} email={user.user.name.substring(0,20)} icon={
                        <span onClick={() => {
                            nav("/u/" + user.user.username )
                        }} className="edit">
                            {"> go actively"}
                        </span>
                    }/>
                </div>
                <div className="dashbored-left-item">
                    <Divider label="repository"/>
                    <Menu>
                        {
                            repo.map((item, index) => {
                                return (
                                    <MenuItem style={{
                                        color: 'black',
                                        backgroundColor: "white",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        padding: "2px 0",
                                    }} className="item" key={index} onClick={() => {
                                        nav("/r/" + user.user.name + "/" + item.name)
                                    }}>
                                        <img src={user.user.avatar || ""} alt={""} width={20} height={20} style={{
                                            borderRadius: "50%"
                                        }}/>
                                       <div>
                                           <span
                                            onClick={() => nav("/u/" + user.user.name)}
                                           >{user.user.name}</span>/<span
                                            onClick={() => nav("/r/" + user.user.name + "/" + item.name + "?tab=file")}
                                       >{item.name}</span>
                                       </div>
                                    </MenuItem>
                                )
                            })
                        }
                    </Menu>
                    <Divider label="group"/>
                    <i>No Item</i>
                    <Divider label="team"/>
                    <i>No Item</i>
                    <Divider label="project"/>
                    <i>No Item</i>
                    <Divider label="product"/>
                    <i>No Item</i>
                </div>
            </div>
            <div className="dashbored-center">

            </div>
            <div className="dashbored-right">

            </div>
        </div>
    )
}