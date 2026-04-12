"use client";

import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import VideoGallery from "@/components/VideoGallery";
import WorkExperience from "@/components/WorkExperience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import SplashLoader from "@/components/SplashLoader";
import { ArrowRight, Coffee } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero text fades out early
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Timeline UI appears
  const timelineOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const timelineScale = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1]);

  // Playhead moves across
  const playheadX = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "100%"]);

  // Track clips reveal depending on scroll
  const track1Width = useTransform(scrollYProgress, [0.3, 0.5], ["0%", "85%"]);
  const track2Width = useTransform(scrollYProgress, [0.4, 0.65], ["0%", "65%"]);
  const track3Width = useTransform(scrollYProgress, [0.5, 0.8], ["0%", "95%"]);

  // Final CTA reveals at the very end when timeline is fully revealed
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.95], [20, 0]);

  return (
    <>
      {showSplash && <SplashLoader onComplete={handleSplashComplete} />}

      <PageTransition>
        {/* 1. Introduction / Hero & 2. Animation Section */}
        <section id="home" className="relative group/hero">
          {/* Container needs to be tall enough to scroll */}
          <div ref={containerRef} className="relative h-[300vh] bg-background">
            {/* Sticky section that holds the animation */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-4 md:px-12 w-full max-w-[100vw]">
              {/* Cinematic background with video montage effect */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-background opacity-60" />
              </div>

              {/* Intro Hero Section */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center w-full text-center max-w-6xl mx-auto z-10 px-4"
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-border/80 text-secondary mb-8 text-xs font-mono backdrop-blur-md uppercase tracking-widest shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(229,62,62,0.8)]" />
                  Sequence 01 // Edit Ready
                </div>

                <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-black tracking-tighter mb-4 leading-none select-none">
                  CRAFTING
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-500 to-orange-500 italic pr-4">
                    VISUAL
                  </span>{" "}
                  STORIES
                  <span className="text-accent">.</span>
                </h1>

                <p className="text-lg md:text-2xl text-secondary max-w-2xl font-light mt-8 tracking-wide">
                  I am a cinematic video editor specializing in commercials, music videos, and narrative films.
                  <br /><br />
                  <span className="text-sm font-mono text-muted uppercase tracking-widest underline decoration-wavy decoration-accent/50 underline-offset-8">Scroll slowly to scrub the timeline</span>
                </p>
              </motion.div>

              {/* Timeline Editing Interface Animation */}
              <motion.div
                className="absolute inset-x-0 top-[55%] -translate-y-1/2 flex flex-col gap-3 px-6 md:px-24 z-20 w-full max-w-7xl mx-auto"
                style={{ opacity: timelineOpacity, scale: timelineScale }}
              >
                {/* Timecodes */}
                <div className="w-full h-8 border-b border-border/60 flex items-end pb-2 px-4 text-[10px] sm:text-xs font-mono text-muted relative select-none">
                  <span className="absolute left-0">00:00:00:00</span>
                  <span className="absolute left-[25%] hidden sm:block">00:00:15:00</span>
                  <span className="absolute left-[50%]">00:00:30:00</span>
                  <span className="absolute left-[75%] hidden sm:block">00:00:45:00</span>
                  <span className="absolute right-0">00:01:00:00</span>

                  {/* Tick marks */}
                  <div className="absolute bottom-0 left-0 w-full h-1 flex justify-between px-1 opacity-20">
                    {[...Array(50)].map((_, i) => (
                      <div key={i} className={`w-[1px] ${i % 10 === 0 ? 'h-2 bg-accent' : 'h-1 bg-white'}`} />
                    ))}
                  </div>
                </div>

                <div className="relative w-full py-4 space-y-3">
                  {/* Playhead */}
                  <motion.div
                    className="absolute top-[-20px] bottom-[-20px] w-[2px] bg-accent z-40 flex flex-col items-center shadow-[0_0_12px_rgba(229,62,62,1)]"
                    style={{ left: playheadX }}
                  >
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-accent absolute top-0 -mt-[8px]" />
                    <div className="w-3 h-4 bg-accent rounded-[1px] shadow-md absolute top-[-24px] flex items-center justify-center">
                      <div className="w-[1px] h-2 bg-black/30" />
                    </div>
                  </motion.div>

                  {/* Track 1: Main Video (A-Roll) */}
                  <div className="w-full h-20 sm:h-28 bg-surface/50 backdrop-blur-sm rounded border border-border/40 relative overflow-hidden flex items-center">
                    <div className="w-8 h-full bg-black/40 border-r border-border/40 flex items-center justify-center flex-shrink-0 z-30">
                      <span className="text-[10px] font-mono text-muted font-bold tracking-widest -rotate-90 select-none">V1</span>
                    </div>
                    <motion.div
                      className="absolute left-[10%] h-[80%] top-[10%] bg-gradient-to-r from-stone-900 to-stone-800 rounded border border-border/80 border-l-4 border-l-blue-500 overflow-hidden shadow-lg group"
                      style={{ width: track1Width }}
                    >
                      <div className="w-full h-full flex">
                        <div className="h-full flex-1 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700 border-r border-white/5" />
                        <div className="h-full flex-1 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700 border-r border-white/5" />
                        <div className="h-full flex-1 bg-[url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700 border-r border-white/5" />
                        <div className="h-full flex-1 bg-[url('https://images.unsplash.com/photo-1518135714426-c18f5964eb17?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="absolute inset-0 border-y border-white/5 opacity-20" />
                    </motion.div>
                  </div>

                  {/* Track 2: B-Roll Video */}
                  <div className="w-full h-16 sm:h-20 bg-surface/50 backdrop-blur-sm rounded border border-border/40 relative overflow-hidden flex items-center">
                    <div className="w-8 h-full bg-black/40 border-r border-border/40 flex items-center justify-center flex-shrink-0 z-30">
                      <span className="text-[10px] font-mono text-muted font-bold tracking-widest -rotate-90 select-none">V2</span>
                    </div>
                    <motion.div
                      className="absolute left-[30%] h-[70%] top-[15%] bg-gradient-to-r from-zinc-900 to-zinc-800 rounded border border-border/80 border-l-4 border-l-accent overflow-hidden flex items-center justify-center shadow-lg group border-r border-r-white/10"
                      style={{ width: track2Width }}
                    >
                      <div className="text-[10px] sm:text-xs font-mono text-accent/50 tracking-widest group-hover:text-accent transition-colors duration-300 w-full truncate px-4 text-center select-none">
                        [ B-ROLL_FINAL_CUT.mp4 ]
                      </div>
                      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#fff_2px,#fff_4px)] pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Track 3: Audio (SFX/Music) */}
                  <div className="w-full h-16 sm:h-24 bg-surface/50 backdrop-blur-sm rounded border border-border/40 relative overflow-hidden flex items-center">
                    <div className="w-8 h-full bg-black/40 border-r border-border/40 flex items-center justify-center flex-shrink-0 z-30">
                      <span className="text-[10px] font-mono text-muted font-bold tracking-widest -rotate-90 select-none">A1</span>
                    </div>
                    <motion.div
                      className="absolute left-[5%] h-[70%] top-[15%] bg-emerald-950/40 rounded border border-emerald-900/50 border-l-4 border-l-emerald-500 overflow-hidden flex items-center p-2 shadow-lg"
                      style={{ width: track3Width }}
                    >
                      {/* Fake audio waveform */}
                      <div className="w-full h-full flex items-center justify-between gap-[1px] opacity-60">
                        {[...Array(80)].map((_, i) => {
                          const height = 20 + Math.abs(Math.sin(i * 0.2)) * 60 + Math.abs(Math.cos(i * 0.5)) * 20;
                          return (
                            <div key={i} className="flex-1 max-w-[4px] bg-emerald-500/80 rounded-full" style={{ height: `${Math.round(Math.min(height, 100))}%` }} />
                          )
                        })}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* CTA revealed at bottom of scroll */}
                <motion.div
                  className="absolute -bottom-28 md:-bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-8 mt-12 bg-surface/90 backdrop-blur-xl px-6 md:px-10 py-4 md:py-5 rounded-full border border-border/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-50 w-max"
                  style={{ opacity: ctaOpacity, y: ctaY }}
                >
                  <Link
                    href="#work"
                    className="group relative px-6 md:px-8 py-3 bg-foreground text-background font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-all text-sm md:text-base cursor-pointer"
                  >
                    <span>View Projects</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#contact"
                    className="flex items-center gap-2 md:gap-3 text-muted hover:text-foreground transition-colors group px-4 md:px-6 py-3 cursor-pointer"
                  >
                    <Coffee size={22} className="text-secondary group-hover:text-amber-500 group-hover:-rotate-12 transition-all" />
                    <span className="font-semibold text-sm md:text-base tracking-wide uppercase font-mono">Let&apos;s chat</span>
                  </Link>
                </motion.div>

              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. Selected Projects (Portfolio Gallery) */}
        <section id="work" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20 bg-background">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-4">
              Selected Work<span className="text-accent">.</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl font-light">
              A curated collection of commercial and narrative edits.
            </p>
          </div>
          <VideoGallery />
        </section>

        {/* 4. Work Experience & Skills */}
        <WorkExperience />

        {/* 5. Client Testimonials */}
        <Testimonials />

        {/* 6. About Me */}
        <About />

        {/* 7. Contact Me */}
        <Contact />

      </PageTransition>
    </>
  );
}
