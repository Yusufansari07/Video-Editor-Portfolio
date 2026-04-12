"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashLoader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(3);
    const [phase, setPhase] = useState<"countdown" | "logo" | "done">("countdown");

    useEffect(() => {
        // Check if already shown this session
        if (typeof window !== "undefined" && sessionStorage.getItem("splash-shown")) {
            onComplete();
            return;
        }

        const countdownTimer = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
                    setPhase("logo");
                    return 0;
                }
                return prev - 1;
            });
        }, 600);

        return () => clearInterval(countdownTimer);
    }, [onComplete]);

    useEffect(() => {
        if (phase === "logo") {
            const logoTimer = setTimeout(() => {
                setPhase("done");
                sessionStorage.setItem("splash-shown", "true");
                setTimeout(onComplete, 500);
            }, 1200);
            return () => clearTimeout(logoTimer);
        }
    }, [phase, onComplete]);

    if (phase === "done") {
        return (
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[99999] bg-black pointer-events-none"
            />
        );
    }

    return (
        <motion.div
            className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
        >
            {/* Film strip borders */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-2 opacity-20">
                {[...Array(24)].map((_, i) => (
                    <div key={`top-${i}`} className="w-3 h-4 bg-white/30 rounded-[1px]" />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-2 opacity-20">
                {[...Array(24)].map((_, i) => (
                    <div key={`bot-${i}`} className="w-3 h-4 bg-white/30 rounded-[1px]" />
                ))}
            </div>

            {/* Crosshair alignment marks */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/20" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/20" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/20" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/20" />
                {/* Corner marks */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20" />
            </div>

            {/* Center content */}
            <AnimatePresence mode="wait">
                {phase === "countdown" && count > 0 && (
                    <motion.div
                        key={count}
                        initial={{ opacity: 0, scale: 1.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <span className="text-[120px] md:text-[200px] font-serif font-black text-white/90 tabular-nums leading-none select-none"
                            style={{ animation: "film-flicker 0.15s infinite" }}
                        >
                            {count}
                        </span>
                        {/* Circle around number */}
                        <svg className="absolute inset-0 w-full h-full -m-4" viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="46"
                                fill="none"
                                stroke="rgba(215,40,40,0.4)"
                                strokeWidth="0.5"
                                strokeDasharray="289"
                                strokeDashoffset="0"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="289"
                                    dur="0.6s"
                                    fill="freeze"
                                />
                            </circle>
                        </svg>
                    </motion.div>
                )}

                {phase === "logo" && (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-4"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter uppercase text-white">
                            Director<span className="text-accent">.</span>
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xs font-mono text-muted uppercase tracking-[0.3em]"
                        >
                            Cinematic Visual Stories
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Film metadata overlay */}
            <div className="absolute bottom-24 left-8 text-[10px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
                <div>REC ● 24FPS</div>
                <div>KODAK 5219 500T</div>
            </div>
            <div className="absolute bottom-24 right-8 text-[10px] font-mono text-white/20 uppercase tracking-widest text-right hidden md:block">
                <div>TC 01:00:00:00</div>
                <div>CAM A — TAKE 1</div>
            </div>
        </motion.div>
    );
}
