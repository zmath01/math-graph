import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchTopics, domainColors } from '../lib/topics';

/**
 * Full-text search page across all knowledge topics.
 */
export function SearchPage() {
  const [query, setQuery] = useState('');
  const results = searchTopics(query);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 mb-6"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Search Topics</h1>

        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, summary, domain, or tag..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder-slate-400"
          />
        </div>

        <div className="text-sm text-slate-500 mb-4">
          {results.length} result{results.length === 1 ? '' : 's'}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {results.map((topic) => (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className="group flex items-start gap-4 p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <span
                className="w-3 h-3 mt-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: domainColors[topic.domain] ?? '#64748b' }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {topic.title}
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">{topic.domain}</span>
                </div>
                <p className="text-slate-600 text-sm line-clamp-2">{topic.summary}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {topic.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-slate-300 group-hover:text-indigo-600 transition-colors mt-2">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
