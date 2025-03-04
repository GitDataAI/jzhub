'use client'

import '@mantine/core/styles.css';
import "@/style/main.css"

import {AppShell, AppShellHeader, AppShellMain} from '@mantine/core';
import React, {useEffect, useState} from "react";
import LayoutHeader from "@/component/layout/header";
import useUserContext, {UserState} from "@/store/useUserContext";

export default function RootLayout(props: { children: React.ReactNode }) {
    const [users, setUsers] = useState<UserState | undefined>(undefined);
    const [Load, setLoad] = useState(false);
    useEffect(() => {
        useUserContext.subscribe((state) => {
            setUsers(state);
        })
    }, []);
    useEffect(() => {
        if (window.location.pathname === "/" && users) {
            if (users.isLogin){
                window.location.href = "/explore";
            }
        }
    }, [users]);
    const hook = useUserContext();

    useEffect(() => {
        if (hook.user) {
            setLoad(true);
            setUsers(hook)
        }
        hook.syncData();
        setLoad(true);
    }, []);

    return (
        <>
            {
                Load && (
                    <AppShell
                        header={{height: 60}}
                    >
                        <AppShellHeader>
                            <LayoutHeader users={users}/>
                        </AppShellHeader>
                        <AppShellMain>
                            {props.children}
                        </AppShellMain>
                    </AppShell>
                )
            }
        </>
    );
}