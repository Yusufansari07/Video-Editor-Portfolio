"use client";

import { motion } from "framer-motion";
import { Film, Clapperboard, Scissors } from "lucide-react";

const experiences = [
    {
        role: "Lead Commercial Editor",
        company: "Studio Frame",
        period: "2022 - Present",
        description: "Spearheaded post-production for over 50+ high-end commercials for global brands. Managed a team of 3 assistant editors and established a standardized Premiere Pro to Resolve workflow.",
        skills: ["Premiere Pro", "DaVinci Resolve", "Client Management"],
        icon: Film,
    },
    {
        role: "Freelance Cinematic Editor",
        company: "Self-Employed",
        period: "2019 - 2022",
        description: "Edited award-winning short films and music videos. Specialized in rhythmic pacing, sound design integration, and developing unique visual styles for independent directors.",
        skills: ["Creative Editing", "Sound Design", "After Effects"],
        icon: Clapperboard,
    },
    {
        role: "Assistant Editor",
        company: "Oceanside Media",
        period: "2017 - 2019",
        description: "Handled project ingest, proxy workflows, string-outs, and delivery specifications for feature documentary projects.",
        skills: ["Media Management", "Avid Media Composer", "Workflow Optimization"],
        icon: Scissors,
    },
];

export default function WorkExperience() {
    return (
        <section id="experience" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative w-full">
            {/* Vertical timeline line */}
            <div className="absolute top-0 left-12 w-[1px] h-full bg-gradient-to-b from-transparent via-border/40 to-transparent hidden md:block" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 md:pl-16 relative"
            >
                <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-4">
                    Experience<span className="text-accent">.</span>
                </h2>
                <p className="text-muted text-lg max-w-2xl font-light">
                    A track record of delivering high-impact visual stories on time and above expectations.
                </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24 md:pl-16 relative w-full">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className="relative group"
                    >
                        {/* Timeline node */}
                        <div className="hidden md:flex absolute -left-[4.25rem] top-2 w-4 h-4 rounded-full bg-background border-2 border-accent items-center justify-center group-hover:scale-150 transition-all duration-500 shadow-[0_0_10px_rgba(215,40,40,0.3)] group-hover:shadow-[0_0_20px_rgba(215,40,40,0.6)]">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Connector line glow on hover */}
                        <div className="hidden md:block absolute -left-[3.35rem] top-6 w-[1px] h-[calc(100%-16px)] bg-border/20 group-hover:bg-accent/30 transition-colors duration-500" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 p-6 rounded-2xl border border-transparent group-hover:border-border/30 group-hover:bg-surface/30 transition-all duration-500">
                            <div className="md:col-span-1 border-l-2 border-accent/30 md:border-none pl-4 md:pl-0 pt-1 md:pt-0">
                                <span className="text-sm font-mono text-muted uppercase tracking-widest">{exp.period}</span>
                                <div className="mt-4 w-14 h-14 rounded-xl overflow-hidden border border-border/30 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:border-accent/30">
                                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center group-hover:from-accent/30 transition-colors duration-500">
                                        <exp.icon className="w-7 h-7 text-accent/70 group-hover:text-accent transition-colors duration-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-1 flex flex-col sm:flex-row sm:items-baseline gap-2">
                                    {exp.role}
                                    <span className="text-muted font-light text-lg">@ {exp.company}</span>
                                </h3>
                                <p className="text-secondary font-light leading-relaxed mb-6 mt-4">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1.5 bg-surface border border-border/50 rounded-full text-xs text-muted font-mono hover:border-accent/30 hover:text-secondary transition-all duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
