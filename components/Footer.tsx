const LINKS = [
    { label: "Email", href: "mailto:kaifkhan9619@gmail.com" },
    { label: "GitHub", href: "https://github.com/khankaif" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khankaif/" },
];

export default function Footer() {
    return (
        <footer className="w-full border-t border-border/30 py-6 mt-12 sm:mt-16 flex justify-center">
            <div className="w-full max-w-content px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-micro font-mono text-muted-foreground/70">
                <p>
                    © {new Date().getFullYear()} Kaif Khan · Mumbai
                </p>

                <div className="flex items-center gap-4">
                    {LINKS.map(({ label, href }, i) => (
                        <span key={label} className="contents">
                            {i > 0 && <span className="text-border">/</span>}
                            <a
                                href={href}
                                {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                                className="hover:text-foreground transition-colors"
                            >
                                {label}
                            </a>
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
}
