import "./global.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@imperia/website";

// const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "Imperia",
    description: "A versatile and multipurpose Discord bot with a comprehensive array of features.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(`${GeistSans.className} dark`)}>{children}</body>
        </html>
    );
}
