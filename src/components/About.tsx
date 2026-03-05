"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface group"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700" />

                    {/* Decorative elements */}
                    <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase shadow-sm">REC</span>
                    </div>
                    <div className="absolute top-0 right-8 w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-20" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/50 text-muted mb-6 text-xs font-mono tracking-widest uppercase">
                        Behind the cut
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-8">
                        The edit is where the film is <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-500 italic">truly made.</span>
                    </h2>

                    <div className="space-y-6 text-secondary text-lg font-light leading-relaxed">
                        <p>
                            I discovered my obsession with pacing and visual rhythm over a decade ago. Since then, I've dedicated my life to the invisible art of editing—where milliseconds of a cut can drastically alter the emotion of a scene.
                        </p>
                        <p>
                            My philosophy is simple: serve the story. Whether I'm cutting a fast-paced streetwear commercial or a slow-burning evocative short film, the goal is always to manipulate time and emotion to keep the audience completely immersed.
                        </p>
                        <p>
                            When I'm not in a dark room staring at timelines, you can find me analyzing classic cinema, shooting street photography, or exploring electronic music production to better understand sound design matrices.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border/30">
                        <div>
                            <div className="text-3xl font-bold font-serif mb-1 text-foreground">10+</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold font-serif mb-1 text-foreground">150</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-wider">Projects Delivered</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold font-serif mb-1 text-accent">5</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-wider">Awards Won</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold font-serif mb-1 text-foreground">4K</div>
                            <div className="text-xs text-muted font-mono uppercase tracking-wider">Cups of Coffee</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
