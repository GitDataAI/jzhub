import React from "react";

export const metadata = {
    title: "GitDataAI | Product",
};

export default function WorkSpaceLayout({
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