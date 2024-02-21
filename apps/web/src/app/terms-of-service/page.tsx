import { InitialLayout } from "@imperia/website";

export default async function TermsOfService() {
    return (
        <InitialLayout>
            <main className="flex-1 mb-24">
                <section className="space-y-6 pt-6 md:pt-10 lg:pt-24">
                    <div className="container flex max-w-[64rem] flex-col gap-2 text-left">
                        <div className="flex flex-col items-start gap-4">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Terms of Service
                            </h1>
                            <div className="mt-4">
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia provides its services to you subject to the following Terms of Service. By
                                    accessing or using Imperia, you agree to be bound by these terms. Please read them
                                    carefully. If you do not agree with these terms, please refrain from using Imperia.
                                </p>

                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    1. Non-Commercial Use
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia is a non-commercial, open-source project developed for entertainment and
                                    educational purposes. You are strictly prohibited from using Imperia for any
                                    commercial purposes, including but not limited to advertising, promotion, or any
                                    form of revenue generation. The bot is provided free of charge to Discord users for
                                    non-commercial use only.
                                </p>

                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    2. Use at Your Own Risk
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia is provided &quot;as-is&quot; without any warranties, express or implied.
                                    You use Imperia at your own risk. The developers of Imperia do not guarantee the
                                    accuracy, reliability, or suitability of the bot for any particular purpose. We are
                                    not responsible for any direct, indirect, incidental, or consequential damages
                                    arising from the use or inability to use Imperia.
                                </p>

                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    3. Experimental Project
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    Imperia is an experimental project, and its features may change, be modified, or
                                    discontinued at any time without notice. The developers reserve the right to make
                                    changes to the bot&apos;s functionality, features, or terms of use at their
                                    discretion. Your continued use of Imperia after any changes constitutes your
                                    acceptance of the revised terms.
                                </p>

                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    4. Compliance with Laws
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    You agree to use Imperia in compliance with all applicable laws, regulations, and
                                    third-party rights. You are solely responsible for ensuring that your use of Imperia
                                    does not violate any laws or rights, including but not limited to copyright,
                                    trademark, privacy, or data protection laws.
                                </p>

                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    5. User Conduct
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    While using Imperia, you agree not to engage in any conduct that may be considered
                                    harmful, offensive, or disruptive. This includes, but is not limited to, spamming,
                                    harassing other users, or attempting to exploit any vulnerabilities in Imperia or
                                    Discord&apos;s platform.
                                </p>

                                <h2 className="[&:not(:first-child)]:mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    5. Termination
                                </h2>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                                    The developers reserve the right to terminate or suspend your access to Imperia at
                                    any time, with or without cause. In case of a violation of these terms, your access
                                    may be terminated immediately, and any user data related to your usage may be
                                    deleted.
                                </p>
                                <p className="leading-7 [&:not(:first-child)]:mt-10 text-muted-foreground">
                                    By accessing or using Imperia, you agree to be bound by these terms. Please read
                                    them carefully. If you do not agree with these terms, please refrain from using
                                    Imperia. If you have any questions about these terms, please contact the lead
                                    developer of Imperia via the official support server.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </InitialLayout>
    );
}
