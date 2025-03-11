'use client'


import React from "react";
import {IoMdClose} from "react-icons/io";

export default function PostRepoLayout(props: { children: React.ReactNode }) {
    return (
        <div>
            <div className="back" onClick={() => window.history.back()}>
                <IoMdClose/>
                <span>返回</span>
            </div>
            {props.children}
        </div>
    )
}