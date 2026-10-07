import { cn } from "@/lib/utils";

const WIDTHS = {
    /** 1040px — case studies, wide grids */
    page: "max-w-page",
    /** 760px — index pages (projects, lab) */
    content: "max-w-content",
    /** 560px — reading columns (about, contact) */
    narrow: "max-w-narrow",
} as const;

/**
 * The only page wrapper. Pages must not set their own max-width,
 * top padding, or horizontal padding — this component owns page rhythm.
 */
export default function PageShell({
    width = "content",
    className,
    children,
}: {
    width?: keyof typeof WIDTHS;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <main
            className={cn(
                "mx-auto w-full min-h-screen px-6 pt-page-top pb-32 flex flex-col gap-section",
                WIDTHS[width],
                className,
            )}
        >
            {children}
        </main>
    );
}
