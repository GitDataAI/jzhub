'use client'


import React from "react";

import "@/style/app.css"
import '@mantine/core/styles.css';

import {CookieConsent} from "react-cookie-consent";
import {ColorSchemeScript, MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <ColorSchemeScript/>
            <title>GitDataAI | Cloud</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"/>
            <meta name="description" content="GitDataAI | Cloud"/>
        </head>
        <body suppressHydrationWarning>
        <MantineProvider>
            <Notifications position="top-center" withinPortal style={{
                zIndex: 9999,
                width: 400,
                position: "fixed",
                top: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
            }}/>
            {children}
        </MantineProvider>
        <CookieConsent
            location="bottom"
            buttonText="I already know"
            cookieName="AllowCookie"
            style={{background: "#f54d04"}}
            buttonStyle={{color: "#4e503b", fontSize: "13px"}}
            expires={150}
        >
            This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
      </body>
    </html>
  );
}
