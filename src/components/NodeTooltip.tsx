import { Link } from 'react-router-dom';
import type { Topic } from '../types/topic';
import { domainColors } from '../lib/topics';

interface NodeTooltipProps {
  topic: Topic;
  onClose?: () => void;
}

/**
 * Floating tooltip card shown when hovering a graph node.
 */
export function NodeTooltip({ topic, onClose }: NodeTooltipProps) {
  const domainColor = domainColors[topic.domain] ?? '#64748b';

  return (
    <div className="absolute z-50 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 animate-in fade-in zoom-in duration-150">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: domainColor }}
        >
          {topic.domain}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
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

      <h3 className="font-bold text-slate-900 mb-1">{topic.title}</h3>
      <p className="text-sm text-slate-600 line-clamp-3 mb-3">{topic.summary}</p>

      <div className="space-y-2 mb-4">
        {topic.prerequisites.length > 0 && (
          <div className="text-xs text-slate-500">
            <span className="font-semibold">Prerequisites:</span>{' '}
            {topic.prerequisites.length}
          </div>
        )}
        {topic.applications.length > 0 && (
          <div className="text-xs text-slate-500">
            <span className="font-semibold">Applications:</span>{' '}
            {topic.applications.length}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={`/topic/${topic.id}`}
          onClick={onClose}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          View details &rarr;
        </Link>
      </div>
    </div>
  );
}
