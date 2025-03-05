'use client'

import {UserSettingSidebar} from "@/component/user/usersettingsidebar";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import useUserContext from "@/store/useUserContext";

export default function UserSettingLayout(props: { children: React.ReactNode }) {
    const [Tab, setTab] = useState<string>("profile");
    const nav = useRouter().replace;
    const user = useUserContext();
    const dash = user.getDashBored();
    const setTabs = (tab: string) => {
        setTab(tab);
        nav(`/u/setting/${tab}`);
    }
    return (
        <div className="user-setting">
            {
                dash ? (
                    <>
                        <UserSettingSidebar tab={Tab} setTab={setTabs} dash={dash}/>
                        <div className="user-setting-body">
                            {props.children}
                        </div>
                    </>
                ):(
                    <>
                        Please Login
                    </>
                )
            }

        </div>
    );
}