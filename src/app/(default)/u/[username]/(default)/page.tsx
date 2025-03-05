'use client'

import {TabsPanel} from "@mantine/core";
import {UserRepoList} from "@/component/user/repolist";
import React, {useEffect, useState} from "react";
import {AppWrite} from "@/server/Client";
import {UserDashBored} from "@/server/types";
import {UserApi} from "@/server/UserApi";

export default function UserPage(props: { params: Promise<{ username: string}> }) {
    const api = new UserApi();
    const [userDash,setUserDash] = useState<UserDashBored | undefined>()
    const [Loading, setLoading] = useState(false);
    const Init = async () => {
        const {username} = await props.params;
        document.title = `GitDataAI | ${username}`;
        const res = await api.DashBoredData(username);
        if (res.status === 200) {
            const json: AppWrite<UserDashBored> = JSON.parse(res.data);
            if (json.code === 200 && json.data) {
                setUserDash(json.data);
                setLoading(true);
            }
        }
    }
    useEffect(() => {
        Init().then().catch();
    }, []);
    return (
        <div>
           {
               (Loading && userDash) ? (
                   <>
                       <TabsPanel value="actively">
                           actively
                       </TabsPanel>
                       <TabsPanel value="repository">
                           <UserRepoList userDash={userDash}/>
                       </TabsPanel>
                       <TabsPanel value="product">
                           product
                       </TabsPanel>
                       <TabsPanel value="team">
                           team
                       </TabsPanel>
                       <TabsPanel value="follow">
                           follow
                       </TabsPanel>
                       <TabsPanel value="star">
                           star
                       </TabsPanel>
                   </>
               ) : (
                   <div>加载中...</div>
               )
           }
        </div>
    )
}