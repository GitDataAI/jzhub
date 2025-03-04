'use client'
import Image from "next/image";
import {TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {UserState} from "@/store/useUserContext";
import {CiSearch} from "react-icons/ci";
import {HeaderUnstatus} from "@/component/layout/header.unstatus";
import {Usermenu} from "@/component/layout/usermenu";
import {Createmenu} from "@/component/layout/createmenu";
import {HeaderStatus} from "@/component/layout/header.status";

interface LayoutHeaderProps {
    users: UserState | undefined
}

export default function LayoutHeader({users}: LayoutHeaderProps) {
    const nav = useRouter().replace;
    return (
        <div className="layout-header">
            <div className="header-left">
                <Image src={"/gitdata-ai.png"} alt={"title"} width={150} height={45}/>
                {
                    users ? (
                        <HeaderStatus/>
                    ) : (
                        <HeaderUnstatus/>
                    )
                }
            </div>
            <div className="header-right">
                <TextInput
                    rightSectionWidth={60}
                    leftSection={
                        <CiSearch/>
                    }
                    rightSection={
                        <>
                            Ctrl + F
                        </>
                    }
                />
                {
                    (users !== undefined && users.user) ? (
                        <>
                            <Createmenu/>
                            <Usermenu user={users.user}/>
                        </>
                    ) : (
                        <>
                            <button onClick={() => nav("/login")}>Sign in</button>
                            <button style={{
                                border: "1px solid #919191",
                            }} onClick={() => nav("/sign")}>Sign up
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}