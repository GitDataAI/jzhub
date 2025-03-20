import React from "react";

export const metadata = {
    title: "GitDataAI | Group",
};

export default function GroupLayout({
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