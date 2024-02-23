import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@imperia/website";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) return redirect("/api/auth/signin/discord");

    return <>{children}</>;
}
