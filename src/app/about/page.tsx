"use client";

import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Send, Loader2 } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <PageTransition>
            <div className="flex-1 w-full pt-32 pb-24 px-6 flex items-center justify-center">
                <div className="max-w-xl w-full">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter mb-4">
                            LET&apos;S COLLABORATE.
                        </h1>
                        <p className="text-muted font-light">
                            Reach out to discuss your next cinematic project.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium tracking-wide text-muted">
                                NAME
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-transparent border-b border-border py-2 px-1 text-foreground focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                                disabled={status === "loading"}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium tracking-wide text-muted">
                                EMAIL
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-transparent border-b border-border py-2 px-1 text-foreground focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                                disabled={status === "loading"}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium tracking-wide text-muted">
                                MESSAGE
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-transparent border-b border-border py-2 px-1 text-foreground focus:outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                                disabled={status === "loading"}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent hover:text-foreground transition-colors disabled:opacity-70"
                        >
                            {status === "loading" ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Send Message
                                    <Send size={18} />
                                </>
                            )}
                        </button>

                        {status === "success" && (
                            <p className="text-center text-sm text-green-500 mt-4">
                                Your message has been sent successfully.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="text-center text-sm text-red-500 mt-4">
                                An error occurred. Please try again later.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </PageTransition>
    );
}
