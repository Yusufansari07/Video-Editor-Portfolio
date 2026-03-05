export default function Footer() {
    return (
        <footer className="w-full py-8 text-center text-sm text-muted bg-background border-t border-border mt-auto">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-6 md:flex-row md:justify-between">
                <p>© {new Date().getFullYear()} Director. All Rights Reserved.</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                    <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
