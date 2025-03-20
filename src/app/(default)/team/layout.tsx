import React from "react";

export const metadata = {
    title: "GitDataAI | Team",
};

export default function TeamLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}