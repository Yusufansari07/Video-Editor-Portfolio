"use client";

import Link from "next/link";
import { ArrowUp, Instagram, Linkedin, Youtube } from "lucide-react";

const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

const socialLinks = [
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Youtube, href: "#", label: "YouTube" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative w-full bg-background border-t border-border/30 mt-auto overflow-hidden">
            {/* Film strip top decoration */}
            <div className="w-full h-6 flex items-center justify-between px-1 bg-surface/50 border-b border-border/20 overflow-hidden">
                {[...Array(60)].map((_, i) => (
                    <div key={i} className="w-2 h-3 bg-border/30 rounded-[1px] flex-shrink-0" />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter uppercase w-max group">
                            <span className="group-hover:text-accent transition-colors">Director</span>
                            <span className="text-accent">.</span>
                        </Link>
                        <p className="text-sm text-muted font-light leading-relaxed max-w-xs">
                            Crafting visual stories with precision and emotion. Specializing in commercials, music videos, and narrative films.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-mono text-muted uppercase tracking-widest mb-6">Navigation</h4>
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-secondary hover:text-accent transition-colors duration-300 w-max"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-mono text-muted uppercase tracking-widest mb-6">Services</h4>
                        <div className="flex flex-col gap-3">
                            {["Commercial Editing", "Music Videos", "Color Grading", "Sound Design", "Documentary"].map((service) => (
                                <span key={service} className="text-sm text-secondary">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back to Top */}
                    <div className="md:col-span-2 flex md:flex-col md:items-end md:justify-between">
                        <button
                            onClick={scrollToTop}
                            className="group w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300"
                            aria-label="Back to top"
                        >
                            <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted font-mono">
                        © {new Date().getFullYear()} Director. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-muted/50 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Available for Q3/Q4 Projects
                    </div>
                </div>
            </div>
        </footer>
    );
}
