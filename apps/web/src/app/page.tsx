import { Button, MainNavigation, MainNavigationItem, buttonVariants, cn } from "@imperia/website";
import Link from "next/link";

const navigationItems = [
    {
        title: "Features",
        href: "#features",
    },
];

export default async function Index() {
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
            <main className="flex-1">
                <section className="space-y-6 pt-6 md:pt-10 lg:pt-24">
                    <div className="container flex max-w-[64rem] flex-col gap-2 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h1 className="text-4xl font-semibold md:text-6xl lg:text-6xl">Imperia</h1>
                            <p className="text-base text-muted-foreground mb-2 max-w-">
                                A software developer with a passion for building digital experiences that are accessible
                                and delightful with a focus on performance and user experience.
                            </p>
                            <div className="space-x-4">
                                <Button disabled className="px-8" variant="secondary">
                                    Invite to server
                                </Button>
                                <Button className="px-8" variant="outline">
                                    GitHub
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
