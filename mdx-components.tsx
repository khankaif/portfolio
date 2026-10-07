import type { MDXComponents } from "mdx/types";

// Case-study prose styles — same type scale as the rest of the site.
const components: MDXComponents = {
    h2: (props) => (
        <h2 className="mt-12 first:mt-0 pb-3 mb-4 border-b border-border/50 text-heading font-medium text-foreground" {...props} />
    ),
    h3: (props) => <h3 className="mt-8 mb-2 text-body font-medium text-foreground" {...props} />,
    table: (props) => (
        <div className="my-6 overflow-x-auto rounded-sm border border-border/60">
            <table className="w-full text-small" {...props} />
        </div>
    ),
    th: (props) => <th className="px-4 py-2.5 text-left font-mono text-micro uppercase text-muted-foreground bg-muted/40" {...props} />,
    td: (props) => <td className="px-4 py-2.5 border-t border-border/60 text-muted-foreground first:text-foreground align-top" {...props} />,
    p: (props) => <p className="my-4 text-body text-muted-foreground max-w-prose" {...props} />,
    ul: (props) => <ul className="my-4 flex flex-col gap-2 max-w-prose list-disc pl-5 marker:text-border" {...props} />,
    li: (props) => <li className="text-body text-muted-foreground pl-1" {...props} />,
    a: (props) => <a className="text-foreground underline underline-offset-4 hover:text-muted-foreground" {...props} />,
    pre: (props) => <pre className="my-6 overflow-x-auto rounded-sm border border-border/60 bg-muted/30 p-4 text-small leading-relaxed [&>code]:bg-transparent [&>code]:p-0" {...props} />,
    code: (props) => <code className="font-mono text-small text-foreground bg-muted px-1 py-0.5 rounded-sm" {...props} />,
    strong: (props) => <strong className="font-medium text-foreground" {...props} />,
};

export function useMDXComponents(): MDXComponents {
    return components;
}
