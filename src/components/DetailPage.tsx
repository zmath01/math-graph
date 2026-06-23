import { useParams, Link } from 'react-router-dom';
import { MathJax } from 'better-react-mathjax';
import { getTopicById, domainColors, allTopics } from '../lib/topics';
import { CodeBlock } from './CodeBlock';

/**
 * Detail page for a single knowledge topic.
 * Renders summary, key points, formulas via MathJax, code snippets, and references.
 */
export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const topic = id ? getTopicById(id) : undefined;

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Topic not found</h1>
        <p className="text-slate-600 mb-6">
          We could not locate a topic with ID <code className="bg-slate-100 px-1 rounded">{id}</code>.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          &larr; Back home
        </Link>
      </div>
    );
  }

  const relatedTopics = allTopics.filter(
    (t) =>
      topic.prerequisites.includes(t.id) ||
      topic.related.includes(t.id) ||
      topic.applications.includes(t.id)
  );

  const domainColor = domainColors[topic.domain] ?? '#64748b';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-6"
        >
          &larr; Back to overview
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: domainColor }}
            >
              {topic.domain}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                topic.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-700'
                  : topic.difficulty === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {topic.difficulty}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{topic.title}</h1>
          <p className="text-lg text-slate-700 leading-relaxed">{topic.summary}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key Points</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                {topic.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>

            {topic.formulas.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Formulas</h2>
                <div className="space-y-4">
                  {topic.formulas.map((formula, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 overflow-x-auto"
                    >
                      <MathJax>
                        <div className="text-lg">{`\\[ ${formula} \\]`}</div>
                      </MathJax>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {topic.code.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Code Examples</h2>
                <div className="space-y-6">
                  {topic.code.map((block, index) => (
                    <CodeBlock
                      key={index}
                      language={block.language}
                      content={block.content}
                      caption={block.caption}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            {relatedTopics.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h2>
                <ul className="space-y-2">
                  {relatedTopics.map((t) => {
                    const relType = topic.prerequisites.includes(t.id)
                      ? 'Prerequisite'
                      : topic.applications.includes(t.id)
                      ? 'Application'
                      : 'Related';
                    return (
                      <li key={t.id}>
                        <Link
                          to={`/topic/${t.id}`}
                          className="group flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: domainColors[t.domain] ?? '#64748b' }}
                          />
                          <div>
                            <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {t.title}
                            </div>
                            <div className="text-xs text-slate-500">{relType}</div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">References</h2>
              <ul className="space-y-3">
                {topic.references.map((ref, index) => (
                  <li key={index}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-slate-700 hover:text-indigo-600 transition-colors"
                    >
                      <span className="text-xs mt-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100">
                        &#8599;
                      </span>
                      <div>
                        <div className="font-medium text-sm">{ref.title}</div>
                        <div className="text-xs text-slate-500">
                          {ref.author} &middot; {ref.source}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
