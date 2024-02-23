import { InitialLayout } from "@imperia/website";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    return (
        <InitialLayout>
            <main className="flex-1 mb-24">
                <section className="space-y-6 pt-6 md:pt-10 lg:pt-24">
                    <div className="container flex max-w-[64rem] flex-col gap-2 text-left">
                        <div className="flex flex-col w-24 gap-4">
                            <p>{session?.user?.name}</p>
                        </div>
                    </div>
                </section>
            </main>
        </InitialLayout>
    );
}
