import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "GitDataAI | Auth",
};


export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth">
            <div className="auth-body">
                {children}
            </div>
        </div>
    );
}