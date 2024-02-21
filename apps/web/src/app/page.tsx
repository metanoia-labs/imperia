import { Button, InitialLayout } from "@imperia/website";

export default async function Index() {
    return (
        <InitialLayout>
            <main className="flex-1 pb-44">
                <section className="space-y-6 pt-6 md:pt-10 lg:pt-24">
                    <div className="container flex max-w-[64rem] flex-col gap-2 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h1 className="text-4xl font-semibold md:text-6xl lg:text-6xl">Imperia</h1>
                            <p className="text-base text-muted-foreground mb-2 max-w-">
                                A versatile and multipurpose Discord bot with a comprehensive array of features.
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
        </InitialLayout>
    );
}
