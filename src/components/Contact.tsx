"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message || "Failed to submit inquiry.");
        }
    };

    return (
        <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-border/30 mt-24 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-background to-background opacity-50 z-0 pointer-events-none blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter mb-6 leading-none">
                            READY TO<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 italic">SEQUENCE?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-secondary max-w-md font-light mb-12">
                            Whether it's a 30-second spot or a feature-length narrative, I'm currently taking on select projects for Q3/Q4.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:hello@example.com" className="flex items-center gap-4 text-muted hover:text-foreground transition-colors group w-max">
                                <div className="w-12 h-12 rounded-full bg-surface border border-border/50 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/40 transition-colors">
                                    <Mail size={20} className="group-hover:text-accent transition-colors" />
                                </div>
                                <span className="font-mono text-lg tracking-wide">hello@example.com</span>
                            </a>

                            <div className="flex gap-4 pt-6">
                                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted hover:text-foreground hover:border-foreground transition-all">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-surface/50 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-border/50 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-8">Send a message</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {status === "success" && (
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-mono text-muted uppercase tracking-widest">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                                        placeholder="John Doe"
                                        disabled={status === "submitting"}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-mono text-muted uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                                        placeholder="john@example.com"
                                        disabled={status === "submitting"}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-mono text-muted uppercase tracking-widest">Project Details</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none disabled:opacity-50"
                                    placeholder="Tell me about your timeline, format, and goals..."
                                    disabled={status === "submitting"}
                                    required
                                    minLength={10}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full group relative px-8 py-4 bg-foreground text-background font-bold rounded-lg overflow-hidden flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                <span className="relative z-10 flex items-center gap-2 group-hover:text-foreground transition-colors duration-300">
                                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
