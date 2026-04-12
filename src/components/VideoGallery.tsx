"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

type VideoProps = {
    videoId: string;
    thumbnail: string;
    title: string;
    category: string;
    platform: "youtube" | "vimeo";
};

const videos: VideoProps[] = [
    {
        videoId: "LXb3EKWsInQ",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
        title: "Cinematic Commercial Reel",
        category: "Commercial",
        platform: "youtube"
    },
    {
        videoId: "SzJ5qI0vPwQ",
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop",
        title: "Mountain Adventure Short",
        category: "Film",
        platform: "youtube"
    },
    {
        videoId: "tO01J-M3g0U",
        thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2000&auto=format&fit=crop",
        title: "Electronic Music Video",
        category: "Music",
        platform: "youtube"
    },
    {
        videoId: "9bZkp7q19f0",
        thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop",
        title: "Nike Brand Anthem",
        category: "Commercial",
        platform: "youtube"
    },
    {
        videoId: "9M5U2LKLHjE",
        thumbnail: "https://images.unsplash.com/photo-1518135714426-c18f5964eb17?q=80&w=2000&auto=format&fit=crop",
        title: "Urban Fashion Film",
        category: "Fashion",
        platform: "youtube"
    },
    {
        videoId: "hY7H3wJQw7Q",
        thumbnail: "https://images.unsplash.com/photo-1505373887895-260910b55885?q=80&w=2000&auto=format&fit=crop",
        title: "Travel Documentary",
        category: "Documentary",
        platform: "youtube"
    },
];

const categories = ["All", ...Array.from(new Set(videos.map(v => v.category)))];

function VideoCard({ video, index }: { video: VideoProps; index: number }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="group relative flex flex-col gap-4"
        >
            <div className="relative w-full overflow-hidden rounded-xl bg-surface aspect-video border border-white/10 shadow-2xl cursor-pointer"
                onClick={() => !isPlaying && setIsPlaying(true)}
            >
                {isPlaying ? (
                    <>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                            title={video.title}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
                            className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/70 hover:bg-accent rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                            aria-label="Close video"
                        >
                            <X size={14} />
                        </button>
                    </>
                ) : (
                    <>
                        {/* Thumbnail */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${video.thumbnail})` }}
                        />

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-accent/80 group-hover:border-accent/60 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <Play size={28} className="text-white ml-1 group-hover:scale-110 transition-transform" fill="white" />
                            </div>
                        </div>

                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] font-mono text-white/80">
                            03:42
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-mono text-white/80 uppercase tracking-widest border border-white/10">
                            {video.category}
                        </div>
                    </>
                )}
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
    );
}

export default function VideoGallery() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All"
        ? videos
        : videos.filter(v => v.category === activeCategory);

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border transition-all duration-300 ${
                            activeCategory === cat
                                ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(215,40,40,0.3)]"
                                : "bg-transparent text-muted border-border/50 hover:border-foreground/30 hover:text-foreground"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Video Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filtered.map((video, index) => (
                        <VideoCard key={video.videoId} video={video} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
