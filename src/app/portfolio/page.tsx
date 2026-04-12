import PageTransition from "@/components/PageTransition";
import VideoGallery from "@/components/VideoGallery";

export default function PortfolioPage() {
    return (
        <PageTransition>
            <div className="flex-1 w-full pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-16 md:mb-24">
                        <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tighter mb-4">
                            SELECTED WORK.
                        </h1>
                        <p className="text-xl text-muted max-w-2xl font-light">
                            A curated collection of my most recent editing projects across commercial, narrative, and music video formats.
                        </p>
                    </header>

                    <VideoGallery />
                </div>
            </div>
        </PageTransition>
    );
}
