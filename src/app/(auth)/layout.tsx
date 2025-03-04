'use client'

import '@mantine/core/styles.css';
import "@/style/main.css"

import React from "react";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";


export default function RootLayout(props: { children: React.ReactNode }) {
    const nav = useRouter().replace;
    return (
        <div className="auth">
            <div className="back" onClick={() => nav("/")}>
                <FaArrowLeft/>
                <span>返回主页</span>
            </div>
            <div className="auth-body">
                {props.children}
            </div>
        </div>
    );
}