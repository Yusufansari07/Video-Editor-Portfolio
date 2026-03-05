"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
    { href: "#home", label: "Home" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference bg-transparent text-foreground">
            <Link href="/" className="text-xl font-serif font-bold tracking-tighter uppercase relative z-50">
                Director<span className="text-accent">.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-accent relative py-1",
                            pathname === link.href ? "text-accent" : "text-muted"
                        )}
                    >
                        {pathname === link.href && (
                            <motion.span
                                layoutId="underline"
                                className="absolute left-0 bottom-0 block h-[1px] w-full bg-accent"
                                initial={false}
                            />
                        )}
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Nav Toggle */}
            <button
                className="md:hidden relative z-50 p-2 -mr-2 text-foreground"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Nav Menu */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
            >
                {links.map((link, i) => (
                    <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: isOpen ? i * 0.1 : 0 }}
                    >
                        <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-4xl font-serif font-black tracking-tighter hover:text-accent transition-colors",
                                pathname === link.href ? "text-accent" : "text-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </header>
    );
}
