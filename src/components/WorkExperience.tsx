"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Lead Commercial Editor",
        company: "Studio Frame",
        period: "2022 - Present",
        description: "Spearheaded post-production for over 50+ high-end commercials for global brands. Managed a team of 3 assistant editors and established a standardized Premiere Pro to Resolve workflow.",
        skills: ["Premiere Pro", "DaVinci Resolve", "Client Management"],
    },
    {
        role: "Freelance Cinematic Editor",
        company: "Self-Employed",
        period: "2019 - 2022",
        description: "Edited award-winning short films and music videos. Specialized in rhythmic pacing, sound design integration, and developing unique visual styles for independent directors.",
        skills: ["Creative Editing", "Sound Design", "After Effects"],
    },
    {
        role: "Assistant Editor",
        company: "Oceanside Media",
        period: "2017 - 2019",
        description: "Handled project ingest, proxy workflows, string-outs, and delivery specifications for feature documentary projects.",
        skills: ["Media Management", "Avid Media Composer", "Workflow Optimization"],
    },
];

export default function WorkExperience() {
    return (
        <section id="experience" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative w-full">
            <div className="absolute top-0 left-12 w-[1px] h-full bg-border/40 hidden md:block" />

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
                        <div className="hidden md:flex absolute -left-[4.25rem] top-2 w-4 h-4 rounded-full bg-background border-2 border-accent items-center justify-center group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(229,62,62,0.5)]">
                            <div className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="md:col-span-1 border-l-2 border-accent/30 md:border-none pl-4 md:pl-0 pt-1 md:pt-0">
                                <span className="text-sm font-mono text-muted uppercase tracking-widest">{exp.period}</span>
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
                                        <span key={skill} className="px-3 py-1 bg-surface border border-border/50 rounded-full text-xs text-muted font-mono">
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
