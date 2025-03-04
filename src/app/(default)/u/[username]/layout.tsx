'use client'

import React, {useEffect, useState} from "react";
import {UserBody} from "@/component/user/userbody";
import {FloatingIndicator, Tabs, TabsList, TabsTab} from "@mantine/core";
import {useRouter} from "next/navigation";
import {UserDashBored} from "@/server/types";
import {UserApi} from "@/server/UserApi";
import {AppWrite} from "@/server/Client";
import Link from "next/link";





export default function UserLayout(props: { children: React.ReactNode, params: Promise<{ username: string}> }) {
    const api = new UserApi();
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('actively');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const route = useRouter();
    const [userName, setUserName] = useState('');
    const [userDash,setUserDash] = useState<UserDashBored | undefined>()
    const [NotFound, setNotFound] = useState(false);
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };

    const Init = async () => {
        const {username} = await props.params;
        document.title = `GitDataAI | ${username}`;
        setUserName(username);
        window.location.href.split('?')
            .filter((x) => x.startsWith('tab='))
            .map((x) => x.split('=')[1])
            .forEach((x) => {
                if (x) {
                    setValue(x);
                }
            });
        const res = await api.DashBoredData(username);
        if (res.status === 200) {
            const json:AppWrite<UserDashBored> = JSON.parse(res.data);
            if (json.code === 200 && json.data) {
                setUserDash(json.data);
            }else {
                setNotFound(true);
            }
        } else {
            setNotFound(true);
        }
    }
    useEffect(() => {
        Init().then().catch();
    }, []);
    return (
        <div className="user">
            {NotFound && (
                <div className="not-found">
                    <div className="not-found-body">
                        <div className="not-found-title">
                            <h1>404</h1>
                            <span>Not Found</span>
                        </div>
                        <div className="not-found-intro">
                            <p>Sorry, the page you visited does not exist.</p>
                        </div>
                        <div className="not-found-start">
                            <Link href="/">Go Home</Link>
                        </div>
                    </div>
                </div>
            )}
            {
                userDash && (
                    <>
                        <UserBody body={userDash}/>
                        <div>
                            <Tabs value={value} onChange={(x)=>{
                                setValue(x);
                                if (x && userName) {
                                    route.replace(`/u/${userName}?tab=${x}`)
                                }
                            }} className={"user-body-list"}>
                                <TabsList ref={setRootRef}>
                                    <TabsTab ref={setControlRef('actively')} value="actively" className="user-body-tab">Actively</TabsTab>
                                    <TabsTab ref={setControlRef('repository')} value="repository" className="user-body-tab">Repository</TabsTab>
                                    <TabsTab ref={setControlRef('product')} value="product" className="user-body-tab">Product</TabsTab>
                                    <TabsTab ref={setControlRef('team')} value="team" className="user-body-tab">Team</TabsTab>
                                    <TabsTab ref={setControlRef('star')} value="star" className="user-body-tab">Star</TabsTab>
                                    <TabsTab ref={setControlRef('follow')} value="follow" className="user-body-tab">Follow</TabsTab>
                                    <FloatingIndicator
                                        target={value ? controlsRefs[value] : null}
                                        parent={rootRef}
                                        className={"user-body-indicator"}
                                    />
                                </TabsList>
                                {props.children}
                            </Tabs>
                        </div>
                    </>
                )
            }
        </div>
    );
}