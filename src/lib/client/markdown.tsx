import { ReactNode } from "react";

type MarkdownComponentProps = {
  children?: ReactNode;
};

export const markdownComponents = {
  h1: ({ children }: MarkdownComponentProps) => (
    <h1 className="text-xl font-semibold mt-6 mb-3">{children}</h1>
  ),

  h2: ({ children }: MarkdownComponentProps) => (
    <h2 className="text-lg font-semibold mt-5 mb-2">{children}</h2>
  ),

  h3: ({ children }: MarkdownComponentProps) => (
    <h3 className="text-base font-semibold mt-4 mb-2 text-primary">
      {children}
    </h3>
  ),

  p: ({ children }: MarkdownComponentProps) => (
    <p className="text-sm leading-relaxed mb-2 text-foreground/90">
      {children}
    </p>
  ),

  ul: ({ children }: MarkdownComponentProps) => (
    <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
  ),

  ol: ({ children }: MarkdownComponentProps) => (
    <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
  ),

  li: ({ children }: MarkdownComponentProps) => (
    <li className="text-sm leading-relaxed">{children}</li>
  ),

  strong: ({ children }: MarkdownComponentProps) => (
    <strong className="font-semibold">{children}</strong>
  ),

  blockquote: ({ children }: MarkdownComponentProps) => (
    <blockquote className="border-l-2 border-primary/40 pl-3 italic text-sm text-muted-foreground my-3">
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-4 border-muted-foreground/30" />,

  table: ({ children }: MarkdownComponentProps) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-muted-foreground/20">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }: MarkdownComponentProps) => (
    <thead className="bg-muted">{children}</thead>
  ),

  tbody: ({ children }: MarkdownComponentProps) => (
    <tbody className="divide-y divide-muted-foreground/20">{children}</tbody>
  ),

  tr: ({ children }: MarkdownComponentProps) => (
    <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
  ),

  th: ({ children }: MarkdownComponentProps) => (
    <th className="border border-muted-foreground/20 px-4 py-2 text-left text-sm font-semibold">
      {children}
    </th>
  ),

  td: ({ children }: MarkdownComponentProps) => (
    <td className="border border-muted-foreground/20 px-4 py-2 text-sm">
      {children}
    </td>
  ),

  code: ({ children }: MarkdownComponentProps) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),

  pre: ({ children }: MarkdownComponentProps) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-3 border border-muted-foreground/20">
      <code className="text-sm font-mono">{children}</code>
    </pre>
  ),
};
