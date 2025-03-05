'use client'

import LayoutWelCome from "@/component/layout/welcome";
import useUserContext from "@/store/useUserContext";
import {useEffect, useState} from "react";
import {UserDashBored} from "@/server/types";
import {Dashbored} from "@/component/dashbored/dashbored";

export default function Home() {
    const [user, setUser] = useState<UserDashBored | undefined>(undefined)
    const context = useUserContext();
    useEffect(() => {
        setUser(context.getDashBored())
        return useUserContext.subscribe((state) => {
            setUser(state.getDashBored())
        })
    }, []);
    return (
        <>
            {
                user ? (
                    <Dashbored user={user}/>
                ) : (
                    <LayoutWelCome/>
                )
            }
        </>
    );
}
