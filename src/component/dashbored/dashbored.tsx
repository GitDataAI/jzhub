import {UserDashBored, } from "@/server/types";
import {UserButton} from "@/component/layout/userbtn";
import {Button, Divider, Menu, MenuItem} from "@mantine/core";
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
                        <Button onClick={() => {
                            nav("/u/" + user.user.username )
                        }} className="edit">
                            {"> go actively"}
                        </Button>
                    }/>
                </div>
                <div className="dashbored-left-item">
                    <Divider label="repository"/>
                    <Menu>
                        {
                            repo.map((item, index) => {
                                return (
                                    <MenuItem key={index} onClick={() => {
                                        nav("/r/" + item.owner_id + "/" + item.name)
                                    }}>
                                         {item.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Menu>
                </div>
            </div>
            <div className="dashbored-center">

            </div>
            <div className="dashbored-right">

            </div>
        </div>
    )
}