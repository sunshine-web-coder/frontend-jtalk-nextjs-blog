"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export default function NextUiProvider({ children }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}

export function AuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}
