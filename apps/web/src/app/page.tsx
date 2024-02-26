import {
    Button,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Icons,
    InitialLayout,
    buttonVariants,
    cn,
} from "@imperia/website";

export default async function Index() {
    return (
        <InitialLayout>
            <main className="flex-1 pb-44">
                <section className="space-y-6 pb-32 pt-6 md:pb-12 md:pt-10 lg:py-32">
                    <div className="container flex max-w-[64rem] flex-col gap-2 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h1 className="text-4xl font-semibold md:text-6xl lg:text-6xl">Imperia</h1>
                            <p className="text-base text-muted-foreground max-w-">
                                A versatile and multipurpose Discord bot with a comprehensive array of features.
                            </p>
                            <div className="space-x-4 flex flex-row justify-between items-center">
                                <a
                                    className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-8")}
                                    href="https://discord.com/api/oauth2/authorize?client_id=911590809873301514&permissions=0&scope=applications.commands%20bot"
                                >
                                    Invite to server
                                </a>
                                <a
                                    className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-8")}
                                    href="/github"
                                >
                                    <Icons.github className="mr-2 h-4 w-4" />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Imperia is a multifunctional bot with a wide range of features to enhance your Discord
                            server&apos;s functionality and user experience.
                        </p>
                    </div>
                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                        <Card>
                            <CardHeader className="space-y-2">
                                <Icons.moderation className="w-12 h-12 text-primary" />
                                <CardTitle className="mt-8">Moderation</CardTitle>
                                <CardDescription>
                                    Keep your server in check with a variety of moderation tools.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="space-y-2">
                                <Icons.administration className="w-12 h-12 text-primary" />
                                <CardTitle className="mt-8">Administration</CardTitle>
                                <CardDescription>
                                    Manage your server with ease using our administrative tools.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="space-y-2">
                                <Icons.economy className="w-12 h-12 text-primary" />
                                <CardTitle className="mt-8">Economy</CardTitle>
                                <CardDescription>
                                    An economy system with a variety of features to keep you engaged.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="space-y-2">
                                <Icons.entertaiment className="w-12 h-12 text-primary" />
                                <CardTitle className="mt-8">Entertainment</CardTitle>
                                <CardDescription>
                                    Various entertainment features to keep your server lively.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="space-y-2">
                                <Icons.informational className="w-12 h-12 text-primary" />
                                <CardTitle className="mt-8">Informational</CardTitle>
                                <CardDescription>
                                    A variety of informational features to satisfy your needs.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="space-y-2">
                                <Icons.socialite className="w-12 h-12 text-primary" />
                                <CardTitle className="mt-8">Socialite</CardTitle>
                                <CardDescription>
                                    Social features to keep your server engaged and active.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="mx-auto text-center md:max-w-[58rem]">
                        <p className="leading-normal text-muted-foreground text-xs sm:text-base sm:leading-7">
                            With more features being added regularly, Imperia provides a comprehensive set of tools to
                            enhance your server&apos;s functionality and user experience.
                        </p>
                    </div>
                </section>
            </main>
        </InitialLayout>
    );
}
