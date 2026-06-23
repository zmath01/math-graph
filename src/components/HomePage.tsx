import { Link } from 'react-router-dom';

/**
 * Landing page offering the two main visualization modes.
 */
export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
          <span className="text-base">📚</span>
          <span>Interactive Knowledge Tree</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Math Graph
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Explore a multi-disciplinary knowledge tree spanning linear algebra, probability,
          differential equations, mathematical physics, scientific computing, machine learning,
          deep learning, Transformers, optimization, algorithms, and HPC.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <Link
            to="/force"
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 text-2xl font-bold">
                N
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Force-Directed Graph</h2>
              <p className="text-slate-600">
                Physics-based layout similar to the force-graph reference. Pan, zoom, and hover
                over nodes to discover relationships and jump to details.
              </p>
            </div>
          </Link>

          <Link
            to="/mindmap"
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 text-2xl font-bold">
                T
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Mindmap</h2>
              <p className="text-slate-600">
                Hierarchical tree view with collapsible branches. Click nodes to expand or
                collapse sub-topics, and navigate to detailed explanations.
              </p>
            </div>
          </Link>
        </div>

        <div className="pt-8">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            <span>🔍</span>
            Search all topics
          </Link>
        </div>
      </div>
    </div>
  );
}
