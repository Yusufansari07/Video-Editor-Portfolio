"use client";

import { motion } from "framer-motion";

type VideoProps = {
    id: string;
    title: string;
    category: string;
};

const videos: VideoProps[] = [
    { id: "76979871", title: "Commercial Reel", category: "Commercial" },
    { id: "1084537", title: "Narrative Short", category: "Film" },
    { id: "43408213", title: "Music Video", category: "Music" },
    { id: "253989945", title: "Brand Anthem", category: "Commercial" },
];

export default function VideoGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
            {videos.map((video, index) => (
                <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="group relative flex flex-col gap-4"
                >
                    {/* Video Placeholder - Maintain 16:9 Aspect Ratio */}
                    <div className="relative w-full overflow-hidden rounded-xl bg-muted/10 aspect-[16/9] flex items-center justify-center border border-white/5">
                        <div className="flex flex-col items-center justify-center text-muted/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                            <span className="text-sm font-medium tracking-wide">Video Placeholder</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-xl font-serif font-semibold tracking-tight group-hover:text-accent transition-colors">
                            {video.title}
                        </h3>
                        <span className="text-sm text-muted uppercase tracking-widest mt-1">
                            {video.category}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
