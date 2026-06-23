import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  content: string;
  caption?: string;
}

/**
 * A code block with syntax highlighting and line numbers.
 * Uses react-syntax-highlighter with a light theme to match the IDE.
 */
export function CodeBlock({ language, content, caption }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 my-4 shadow-sm bg-white">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {language}
        </span>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          showLineNumbers
          lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#94a3b8' }}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: '#ffffff',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
      {caption && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-sm text-slate-600 italic">
          {caption}
        </div>
      )}
    </div>
  );
}
