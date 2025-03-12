'use client'

import '@mantine/core/styles.css';
import "@/style/main.css"

import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from '@mantine/core';
import React from "react";
import {Notifications} from "@mantine/notifications";
import {CookieConsent} from "react-cookie-consent";


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
        <CookieConsent
            location="bottom"
            buttonText="I already know"
            cookieName="AllowCookie"
            style={{ background: "#f54d04" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
        >
            This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
        </body>
        </html>
    );
}