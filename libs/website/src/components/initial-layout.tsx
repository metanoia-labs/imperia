"use client";

import React from "react";

import { cn } from "../utils/cn";
import { MainNavigation } from "./main-navigation";
import { MainNavigationItem } from "./navigation-items";
import { Button, buttonVariants } from "./ui/button";

interface InitialLayoutProps {
    children: React.ReactNode;
}

const navigationItems = [
    {
        title: "Invite",
        href: "https://discord.com/api/oauth2/authorize?client_id=911590809873301514&permissions=0&scope=applications.commands%20bot",
    },
    {
        title: "Support Server",
        href: "https://discord.gg/KfhgHw7pvn",
    },
];

export function InitialLayout({ children }: InitialLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container bg-background">
                <div className="flex h-20 items-center justify-between py-6 mb-2 mt-2">
                    <MainNavigation items={navigationItems} />
                    <nav className="flex flex-row space-x-8 items-center">
                        {navigationItems?.length ? (
                            <nav className="hidden gap-12 md:flex">
                                {navigationItems?.map((item, index) => (
                                    <MainNavigationItem
                                        key={index}
                                        item={item}
                                        isLast={index === navigationItems.length - 1}
                                    />
                                ))}
                            </nav>
                        ) : null}
                        <Button disabled className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4")}>
                            Dashboard
                        </Button>
                    </nav>
                </div>
            </header>
            {children}
            <footer className="py-6 md:px-8 md:py-0 border-t">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex flex-col text-center md:text-left flex-grow">
                        <p className="text-balance text-sm leading-loose text-muted-foreground">
                            © 2024 All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-row gap-4 text-center md:text-left">
                        <p className="text-balance text-sm leading-loose text-muted-foreground">
                            <a className="underline underline-offset-4 hover:text-foreground" href="/privacy-policy">
                                Privacy Policy
                            </a>
                        </p>
                        <p className="text-balance text-sm leading-loose text-muted-foreground">
                            <a className="underline underline-offset-4 hover:text-foreground" href="/terms-of-service">
                                Terms of Service
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default InitialLayout;
