import { Button, MainNavigation, MainNavigationItem, Separator, buttonVariants, cn } from "@imperia/website";
import Link from "next/link";

const navigationItems = [
    {
        title: "Features",
        href: "#features",
    },
];

export default async function PrivacyPolicy() {
    return (
        <div className="flex min-h-screen flex-col mb-8">
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
            <main className="flex-1 mb-24">
                <section className="space-y-6 pt-6 md:pt-10 lg:pt-24">
                    <div className="container flex max-w-[64rem] flex-col gap-2 text-left">
                        <div className="flex flex-col items-start gap-4">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Privacy</h1>
                            <div className="mt-4">
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia collects and stores information about you when you use Imperia the bot or
                                    website. This information is used to provide you with the best experience and to
                                    improve the quality of our services. Please read the following to learn more about
                                    our Privacy Policy.
                                </p>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    By using Imperia, you agree to the terms outlined in this Privacy Policy. If you do
                                    not agree with these terms, please refrain from using the bot.
                                </p>
                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    1. Information we collect
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia collects various Discord-related identifiers, including User IDs, Server
                                    IDs, Channel IDs, Role IDs, and Message IDs for the purpose of providing its
                                    functionalities. These identifiers are used exclusively within the Discord platform
                                    and are not shared or sold to third parties.
                                </p>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia may collect and store content provided by users for interaction or
                                    configuration purposes. This content includes but is not limited to command inputs,
                                    configurations, and customizations. We do not use this information for any purpose
                                    other than delivering the intended features of the bot.
                                </p>
                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    2. How We Use Your Information
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    We use the collected information to provide and enhance the features and
                                    functionalities of Imperia. This includes maintaining and improving bot performance,
                                    troubleshooting issues, and introducing new features based on user feedback.
                                </p>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia may use collected identifiers for communication purposes, such as responding
                                    to commands, providing updates on bot features, and addressing user inquiries. Users
                                    may choose to opt-out of non-essential communications.
                                </p>
                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    3. Data Security
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    We only retain collected information for as long as necessary to provide you with
                                    your requested service. What data we do collect, we’ll protect using commercially
                                    reasonable means to prevent loss and theft, as well as unauthorised access,
                                    disclosure, copying, use or modification.
                                </p>
                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    4. Information Sharing
                                </h2>

                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia does not share user data with third-party services, except for Discord,
                                    which is integral to the bot&lsquo;s operation. Imperia may link to external sites
                                    that are not operated by us. Please be aware that we have no control over the
                                    content and practices of these sites, and cannot accept responsibility or liability
                                    for their respective privacy policies.
                                </p>
                                <p className="leading-7 [&:not(:first-child)]:mt-10 text-muted-foreground">
                                    By using Imperia, you agree to the terms outlined in this Privacy Policy. If you do
                                    not agree with these terms, please refrain from using the bot. If you have any
                                    questions about this Privacy Policy, please contact the lead developer of Imperia
                                    via the official support server.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
