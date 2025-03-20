import React from "react";

export const metadata = {
    title: "GitDataAI | Project",
};

export default function ProjectLayout({
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