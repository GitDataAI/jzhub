'use client'

import '@mantine/core/styles.css';
import "@/style/app.css"

import {AppShell, AppShellHeader, AppShellMain, AppShellNavbar} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {AppHeader} from "@/component/shell/header";
import {AppNavbar} from "@/component/shell/navbar";
import {AppNavbarProps, DashboardMenu} from "@/data/Navbar";
import React, {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";

export default function RootLayout(props: { children: React.ReactNode }) {
    const [opened, {open, close}] = useDisclosure();
    const [Menu, setMenu] = useState<AppNavbarProps | undefined>();
    useEffect(() => {
        const menus = DashboardMenu;
        if (window) {
            const lost = window.location.href.split("/");
            menus.menu = menus.menu.map((item) => {
                item.active = lost.filter((tx) => tx.toLowerCase() === item.title.toLowerCase()).length > 0;
                return item;
            });
        }
        setMenu(menus);
    }, []);
    useEffect(() => {
        fetch("/api/v1/context/current", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (!data.data) {
                            window.location.href = "/sigin";
                        }
                    })
                }else {
                    notifications
                        .show({
                            title: 'Failed',
                            message: "Failed to get current user",
                            color: 'red',
                        });
                }
            })
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
                    {
                        Menu && <AppNavbar {...Menu}/>
                    }
                </AppShellNavbar>
                <AppShellMain>
                    {props.children}
                </AppShellMain>
            </AppShell>
        </>
    );
}