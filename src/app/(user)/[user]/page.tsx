'use client'

import "@/style/app.css"

import {AppShell, AppShellHeader, AppShellMain, AppShellNavbar} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {AppHeader} from "@/component/shell/header";
import {AppNavbar} from "@/component/shell/navbar";
import {AppNavbarItem, AppNavbarProps, ProfileMenu} from "@/data/Navbar";
import React, {useEffect, useState} from "react";
import {IoSettingsOutline} from "react-icons/io5";
import {useParams, useSearchParams} from "next/navigation";
import {GiTeamIdea} from "react-icons/gi";
import {CgInsights} from "react-icons/cg";
import {ImUsers} from "react-icons/im";
import {Overview} from "@/app/(user)/[user]/tabs/overview";
import {Repository} from "@/app/(user)/[user]/tabs/repository";
import {Product} from "@/app/(user)/[user]/tabs/product";
import {Project} from "@/app/(user)/[user]/tabs/project";
import {Star} from "@/app/(user)/[user]/tabs/star";
import {Follow} from "@/app/(user)/[user]/tabs/follow";
import {Following} from "@/app/(user)/[user]/tabs/following";
import {MemberPage} from "@/app/(user)/[user]/org/member";

export default function UsersLayout() {
    const [opened, {open, close}] = useDisclosure();
    const [Menu, setMenu] = useState<AppNavbarProps | undefined>();
    const Param:{user: string} = useParams();
    const [Tab, setTab] = useState<string>()
    const search = useSearchParams();
    const [Gr, setGr] = useState(false);
    const Init = async () => {
        const menus = ProfileMenu;
        if (window) {
            const lost = new URLSearchParams(window.location.search);
            menus.menu = menus.menu.map((item) => {
                if (lost) {
                    item.active = lost.get("tab") === item.title.toLowerCase();
                }
                return item;
            });
            if (menus.menu.map((x) => x.active).filter((x) => x).length === 0) {
                menus.menu[0].active = true;
            }
        }
        const res = await fetch(`/api/v1/orgs/${Param.user}/can_setting`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.status === 200){
            const json = await res.json()
            if (json.code === 0 || json.code === 401){
                if (json.msg === true || json.msg === "Unauthorized"){
                    let m:AppNavbarItem[] = [];
                    for (const item of menus.menu) {
                        if (item.title.toLowerCase() !== "star"){
                            m.push(item)
                        }
                    }
                    if (!m.find((x)=>x.title === "Settings")){
                        m.push({
                            title: "Team",
                            icon: <GiTeamIdea/>,
                            active: false,
                            id: "profile-team",
                        })
                        m.push({
                            title: "Member",
                            icon: <ImUsers/>,
                            active: false,
                            id: "profile-team",
                        })
                        m.push({
                            title: "Insights",
                            icon: <CgInsights/>,
                            active: false,
                            id: "profile-insights",
                        })
                        if (json.msg === true) {
                            m.push({
                                title: "Settings",
                                icon: <IoSettingsOutline/>,
                                active: false,
                                id: "profile-settings",
                            })
                        }
                    }
                    menus.menu = m;
                    setGr(true)
                }
            }
        }
        setMenu(menus);
    }
    useEffect(() => {
        Init().then().catch().finally()
    }, []);
    useEffect(() => {
        const tab = search.get("tab");
        if (tab) {
            setTab(tab);
        }
    }, [search]);
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
                <AppShellMain>
                     <main className="owner">
                        {
                            (Tab === "Overview" || Tab === undefined || Tab === "") && <Overview gr={Gr}/>
                        }
                        {
                            Tab === "Repository" && <Repository/>
                        }
                        {
                            Tab === "Product" && <Product/>
                        }
                        {
                            Tab === "Project" && <Project/>
                        }
                        {
                            Tab === "Star" && <Star/>
                        }
                        {
                            Tab === "Follow" && <Follow/>
                        }
                        {
                            Tab === "Following" && <Following/>
                        }
                        {
                            Tab === "Member" && <MemberPage org={Param.user}/>
                        }
                     </main>
                </AppShellMain>
            </AppShell>
        </>
    );
}