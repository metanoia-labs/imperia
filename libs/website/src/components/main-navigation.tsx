"use client";

import Link from "next/link";
import React from "react";
import { Icons } from "./icons";
import { MobileNavigation } from "./mobile-navigation";
import { MainNavigationItem } from "./navigation-items";
import Image from "next/image";

interface MainNavigationProps {
    items?: { title: string; href: string; disabled?: boolean }[];
    children?: React.ReactNode;
}

export function MainNavigation({ items, children }: MainNavigationProps) {
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

    return (
        <div className="flex gap-6 md:gap-10 justify-start">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
                <Image className="rounded-md" src="/apple-touch-icon.png" alt="Imperia" width={25} height={25} />
                <span className="font-bold sm:inline-block flex items-center">Imperia</span>
            </Link>
            <button className="flex items-left space-x-2 md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <Icons.close /> : <Icons.menu />}
                <span className="font-bold">Menu</span>
            </button>
            {showMobileMenu && items && <MobileNavigation items={items}>{children}</MobileNavigation>}
        </div>
    );
}
