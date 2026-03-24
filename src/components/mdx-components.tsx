import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="mt-8 text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-10 text-3xl font-semibold leading-tight tracking-tight"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-8 text-2xl font-semibold leading-tight tracking-tight"
    />
  ),
  p: (props) => <p {...props} className="text-lg leading-9 text-black/80" />,
  ul: (props) => (
    <ul
      {...props}
      className="list-disc space-y-3 pl-6 text-lg leading-9 text-black/80"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="list-decimal space-y-3 pl-6 text-lg leading-9 text-black/80"
    />
  ),
  li: (props) => <li {...props} className="pl-1" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-ember/60 pl-5 italic text-black/75"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded bg-sand px-1.5 py-0.5 font-mono text-[0.95em] text-pine"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-[1.25rem] bg-ink p-5 text-sm leading-7 text-sand"
    />
  ),
  hr: (props) => <hr {...props} className="border-black/10" />
};
