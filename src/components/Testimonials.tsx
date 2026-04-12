"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    company: string;
    text: string;
};

const testimonials: Testimonial[] = [
    {
        id: "t1",
        name: "Sarah Jenkins",
        role: "Creative Director",
        company: "Visionary Studios",
        text: "Alex's pacing and rhythm is unparalleled. They took our raw footage and turned it into an absolute masterpiece that drove our campaign's success."
    },
    {
        id: "t2",
        name: "Marcus Chen",
        role: "Band Manager",
        company: "Indie Records",
        text: "Working with Alex was incredibly smooth. They understood the artist's vision instantly and delivered revisions practically overnight."
    },
    {
        id: "t3",
        name: "Priya Sharma",
        role: "Executive Producer",
        company: "Neon Films",
        text: "Every cut, every transition, every sound cue was deliberate and impactful. Alex doesn't just edit — they elevate the entire narrative."
    },
    {
        id: "t4",
        name: "James Li",
        role: "Marketing VP",
        company: "Altitude Brands",
        text: "The commercial Alex cut for us outperformed every campaign we've ever run. The emotional pacing was truly next-level storytelling."
    }
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent(prev => (prev + 1) % testimonials.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [next]);

    const goTo = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const testimonial = testimonials[current];

    const variants = {
        enter: (dir: number) => ({
            opacity: 0,
            x: dir > 0 ? 60 : -60,
            scale: 0.96,
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        exit: (dir: number) => ({
            opacity: 0,
            x: dir > 0 ? -60 : 60,
            scale: 0.96,
        }),
    };

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto w-full relative">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 text-center"
            >
                <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-4">
                    Client Voices<span className="text-accent">.</span>
                </h2>
                <p className="text-muted text-lg max-w-2xl mx-auto font-light">
                    What directors, producers, and brands say about working together.
                </p>
            </motion.div>

            {/* Testimonial Card */}
            <div className="relative min-h-[280px] md:min-h-[240px] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={testimonial.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex flex-col items-center text-center px-4"
                    >
                        {/* Quote icon */}
                        <Quote size={40} className="text-accent/30 mb-6 rotate-180" />

                        {/* Quote text */}
                        <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-foreground/90 leading-relaxed max-w-3xl mb-8 italic">
                            &ldquo;{testimonial.text}&rdquo;
                        </blockquote>

                        {/* Attribution */}
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-base font-semibold text-foreground">
                                {testimonial.name}
                            </span>
                            <span className="text-sm text-muted font-mono">
                                {testimonial.role} — {testimonial.company}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-12">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`transition-all duration-300 rounded-full ${
                            i === current
                                ? "w-8 h-2 bg-accent shadow-[0_0_10px_rgba(215,40,40,0.5)]"
                                : "w-2 h-2 bg-border hover:bg-muted"
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>

            {/* Film reel decoration */}
            <div className="absolute top-8 right-8 text-[10px] font-mono text-muted/30 uppercase tracking-widest hidden lg:block">
                <div>Take {current + 1} / {testimonials.length}</div>
            </div>
        </section>
    );
}
