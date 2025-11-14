"use client";
import Profile from "./profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const pathname = usePathname();
    const nav = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/profile", label: "Profile" },
    ];

    return (
        <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-xl font-bold">
                Logo
            </Link>
            <nav className="flex items-center gap-4 md:gap-6">
                {nav.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "text-sm text-muted-foreground hover:text-foreground transition-colors",
                            pathname === item.href && "text-foreground font-medium"
                        )}
                        aria-current={pathname === item.href ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <Profile />
        </div>
    );
}