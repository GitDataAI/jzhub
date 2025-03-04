'use client'

import LayoutWelCome from "@/component/layout/welcome";
import useUserContext from "@/store/useUserContext";
import {useEffect, useState} from "react";
import {UserModel} from "@/server/types";

export default function Home() {
    const [user, setUser] = useState<UserModel | undefined>(undefined)
    useEffect(() => {
        return useUserContext.subscribe((state) => {
            setUser(state.getUser())
        })
    }, []);
    return (
        <>
            {
                user ? (
                    <>

                    </>
                ) : (
                    <LayoutWelCome/>
                )
            }
        </>
    );
}
