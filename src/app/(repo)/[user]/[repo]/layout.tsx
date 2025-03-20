'use client'

import React, {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {AppNavbarProps, RepoMenu} from "@/data/Navbar";
import {AppShell, AppShellHeader, AppShellMain, AppShellNavbar} from "@mantine/core";
import {AppHeader} from "@/component/shell/header";
import {AppNavbar} from "@/component/shell/navbar";
import {useParams} from "next/navigation";
import {notifications} from "@mantine/notifications";
import {IoSettingsOutline} from "react-icons/io5";

export default function RepositoryLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const [opened, {open, close}] = useDisclosure();
    const [Menu, setMenu] = useState<AppNavbarProps | undefined>();
    const Param: { user: string, repo: string } = useParams();
    const [Notfound, setNotFound] = useState(false);
    const Init = async () => {
        const menus = RepoMenu({
            owner: Param.user,
            repo: Param.repo
        });

        const res = await fetch(`/api/v1/repo/${Param.user}/${Param.repo}/can_setting`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status !== 200) {
            notifications.show({
                title: "Failed",
                message: "Failed to fetch access",
                color: "red",
            });
            return;
        }
        const data:{ code: number, msg: string | boolean } = await res.json();
        if (data.code === 0) {
            menus.menu.push({
                title: "Setting",
                icon: <IoSettingsOutline/>,
                active: false,
                id: "repo-setting",
            })
        } else {
            if (data.msg === "not found"){
                setNotFound(true)
            }
        }
        if (window) {
            const lost = window.location.href.split("/");
            menus.menu = menus.menu.map((item) => {
                item.active = lost.filter((tx) => tx.toLowerCase() === item.title.toLowerCase()).length > 0;
                return item;
            });
        }
        setMenu(menus);
    }
    useEffect(() => {
        Init().then().catch().finally()
    }, []);
    return (
        <>
            <AppShell
                header={{
                    height: 60
                }}
                navbar={{
                    width: 200,
                    breakpoint: 'sm',
                    collapsed: {
                        mobile: opened,
                        desktop: opened,
                    },
                }}
                transitionDuration={500}
                transitionTimingFunction="ease"
            >
                <AppShellHeader>
                    <AppHeader opened={opened} close={close} open={open}/>
                </AppShellHeader>
                <AppShellNavbar>
                    {Menu && <AppNavbar {...Menu}/>}
                </AppShellNavbar>
                <AppShellMain className="repo">
                    {
                        !Notfound ? children : <div className="not-found">
                            <h1>404</h1>
                            <p>Not Found</p>
                        </div>
                    }
                </AppShellMain>
            </AppShell>
        </>
    )
}