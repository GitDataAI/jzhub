'use client'

import '@mantine/core/styles.css';
import "@/style/main.css"

import React from "react";
import {useRouter} from "next/navigation";
import {IoMdClose} from "react-icons/io";


export default function RootLayout(props: { children: React.ReactNode }) {
    const nav = useRouter().replace;
    return (
        <div className="auth">
            <div className="back" onClick={() => nav("/")}>
                <IoMdClose/>
                <span>返回主页</span>
            </div>
            <div className="auth-body">
                {props.children}
            </div>
        </div>
    );
}