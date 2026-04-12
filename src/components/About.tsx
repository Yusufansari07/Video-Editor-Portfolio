"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isInView, target, duration]);

    return (
        <div ref={ref} className="text-3xl md:text-4xl font-bold font-serif mb-1 text-foreground tabular-nums">
            {count}{suffix}
        </div>
    );
}

const stats = [
    { target: 10, suffix: "+", label: "Years Experience" },
    { target: 150, suffix: "", label: "Projects Delivered" },
    { target: 5, suffix: "", label: "Awards Won", highlight: true },
    { target: 4000, suffix: "", label: "Cups of Coffee", display: "4K" },
];

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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700" />

                    {/* REC indicator */}
                    <div className="absolute bottom-6 left-6 z-20 flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase shadow-sm">REC</span>
                    </div>

                    {/* Decorative lines */}
                    <div className="absolute top-0 right-8 w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-20" />

                    {/* Stats on image */}
                    <div className="absolute bottom-0 right-0 p-6 z-20">
                        <div className="text-6xl font-serif font-bold text-white/20">10+</div>
                        <div className="text-xs font-mono text-white/60 uppercase tracking-widest">Years Editing</div>
                    </div>

                    {/* Film frame corners */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/20 z-20" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/20 z-20" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/20 z-20" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/20 z-20" />
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
                            I discovered my obsession with pacing and visual rhythm over a decade ago. Since then, I&apos;ve dedicated my life to the invisible art of editing—where milliseconds of a cut can drastically alter the emotion of a scene.
                        </p>
                        <p>
                            My philosophy is simple: serve the story. Whether I&apos;m cutting a fast-paced streetwear commercial or a slow-burning evocative short film, the goal is always to manipulate time and emotion to keep the audience completely immersed.
                        </p>
                        <p>
                            When I&apos;m not in a dark room staring at timelines, you can find me analyzing classic cinema, shooting street photography, or exploring electronic music production to better understand sound design matrices.
                        </p>
                    </div>

                    {/* Animated Stats */}
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border/30">
                        {stats.map((stat) => (
                            <div key={stat.label} className="group">
                                {stat.display ? (
                                    <div className={`text-3xl md:text-4xl font-bold font-serif mb-1 ${stat.highlight ? "text-accent" : "text-foreground"}`}>
                                        {stat.display}
                                    </div>
                                ) : (
                                    <div className={stat.highlight ? "text-accent" : ""}>
                                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                                    </div>
                                )}
                                <div className="text-xs text-muted font-mono uppercase tracking-wider group-hover:text-secondary transition-colors">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
