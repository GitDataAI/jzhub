'use client'

import '@mantine/core/styles.css';
import "@/style/main.css"

import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from '@mantine/core';
import React from "react";
import {Notifications} from "@mantine/notifications";


export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
            <title>GitDataAI | Cloud</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"/>
            <meta name="description" content="GitDataAI | Cloud"/>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <body>
        <MantineProvider>
            <Notifications position="top-center" withinPortal style={{
                zIndex: 9999,
                width: 400,
                position: "fixed",
                top: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
            }}/>
            {props.children}
        </MantineProvider>
        </body>
        </html>
    );
}