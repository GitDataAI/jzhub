'use client'

import {FaArrowLeft} from "react-icons/fa";
import React from "react";

export default function CreateRepoLayout(props: { children: React.ReactNode }) {
    return (
        <div>
            <div className="back" onClick={() => window.history.back()}>
                <FaArrowLeft/>
                <span>返回</span>
            </div>
            {props.children}
        </div>
    )
}