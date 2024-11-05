'use client';

import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    if (usePathname().startsWith(`/display`)) {
        return (<html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>PitDisplay</title>
            </head>
            <body className="m-0 bg-black text-white">
            <div className="w-full h-full">{children}</div>
            </body>
            </html>
        )
    }
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Pit Maestro</title>
        </head>
        <body>
        <nav className="bg-white border-gray-200">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
                Pit Maestro
            </span>
                </Link>
            </div>
        </nav>
        <nav className="bg-gray-50">
            <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                <div className="flex items-center">
                    <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                        <li>
                            <Link href="/" className="text-gray-900 hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link href="/lists/" className="text-gray-900 hover:underline">Past Lists</Link>
                        </li>
                        <li>
                            <Link href="/display/1/" className="text-gray-900 hover:underline">Display/1</Link>
                        </li>
                        <li>
                            <Link href="/display/2/" className="text-gray-900 hover:underline">Display/2</Link>
                        </li>
                        <li>
                            <Link href="/conf" className="text-gray-900 hover:underline">Config</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 mt-4">
            <div className="p-6 w-full">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
