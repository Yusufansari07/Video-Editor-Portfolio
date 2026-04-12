"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
    { href: "#home", label: "Home" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    // Scroll-based header background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer for active section highlighting
    useEffect(() => {
        const sections = links.map(l => l.href.replace("#", "")).map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length > 0) {
                    // Pick the one with the largest intersection ratio
                    const best = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
                    setActiveSection(best.target.id);
                }
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500",
                scrolled
                    ? "bg-background/70 backdrop-blur-xl border-b border-border/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                    : "bg-transparent"
            )}
        >
            <Link href="/" className="text-xl font-serif font-bold tracking-tighter uppercase relative z-50 group">
                <span className="group-hover:text-accent transition-colors duration-300">Director</span>
                <span className="text-accent">.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                {links.map((link) => {
                    const isActive = `#${activeSection}` === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-all duration-300 hover:text-foreground relative py-1",
                                isActive ? "text-foreground" : "text-muted"
                            )}
                        >
                            {link.label}
                            {isActive && (
                                <motion.span
                                    layoutId="nav-underline"
                                    className="absolute left-0 -bottom-0.5 block h-[2px] w-full bg-accent rounded-full shadow-[0_0_8px_rgba(215,40,40,0.6)]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
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
                                `#${activeSection}` === link.href ? "text-accent" : "text-foreground"
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
