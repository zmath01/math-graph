import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForceGraph2DModule from 'force-graph';
import type ForceGraphType from 'force-graph';
import type { Topic } from '../types/topic';
import { buildGraphNodes, buildGraphLinks, domainColors, allTopics } from '../lib/topics';
import { NodeTooltip } from './NodeTooltip';
import { Link } from 'react-router-dom';

/**
 * ForceGraph2D is exported as a factory function at runtime, but its TypeScript
 * declarations describe a class constructor. We cast it to a callable factory so
 * we can use the standard `ForceGraph2D(element)` API.
 */
type ForceGraphFactory = (element: HTMLElement) => ForceGraphType;
const ForceGraph2D = ForceGraph2DModule as unknown as ForceGraphFactory;

/**
 * Force-directed graph view inspired by the physics-based layout at wuli.wiki/tree.
 * Supports pan, zoom, hover tooltips, and click-through to detail pages.
 */
export function ForceGraphView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<ForceGraphType | null>(null);
  const navigate = useNavigate();

  const [hoveredTopic, setHoveredTopic] = useState<Topic | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const graphData = { nodes: buildGraphNodes(), links: buildGraphLinks() };
    // eslint-disable-next-line no-console
    console.log('[MATHgraph] force graph data:', graphData.nodes.length, 'nodes,', graphData.links.length, 'links');

    const graph = ForceGraph2D(container)
      .width(container.clientWidth || 1)
      .height(container.clientHeight || 1)
      .graphData(graphData)
      .nodeId('id')
      .nodeLabel('title')
      .nodeVal('val')
      .nodeColor('color')
      .nodeRelSize(6)
      .linkDirectionalArrowLength(6)
      .linkDirectionalArrowRelPos(1)
      .linkColor('color')
      .linkWidth(1.5)
      .backgroundColor('#f8fafc')
      .onNodeHover((node) => {
        if (node) {
          const topic = allTopics.find((t) => t.id === String(node.id));
          setHoveredTopic(topic ?? null);
        } else {
          setHoveredTopic(null);
        }
      })
      .onNodeClick((node) => {
        navigate(`/topic/${String(node.id)}`);
      })
      .onLinkHover((link) => {
        container.style.cursor = link ? 'pointer' : 'default';
      })
      .onNodeDrag((node) => {
        node.fx = node.x;
        node.fy = node.y;
      })
      .onNodeDragEnd((node) => {
        node.fx = undefined;
        node.fy = undefined;
      });

    graphRef.current = graph;

    const chargeForce = graph.d3Force('charge');
    if (chargeForce) {
      (chargeForce as any).strength(-400);
    }
    const linkForce = graph.d3Force('link');
    if (linkForce) {
      (linkForce as any).distance(120);
    }

    const applySize = () => {
      if (!containerRef.current || !graphRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      // eslint-disable-next-line no-console
      console.log('[MATHgraph] force graph container size:', w, 'x', h);
      if (w > 0 && h > 0) {
        graphRef.current.width(w).height(h);
      }
    };

    applySize();

    const resizeObserver = new ResizeObserver(() => applySize());
    resizeObserver.observe(container);

    window.setTimeout(() => {
      applySize();
      graph.zoomToFit(400, 40);
    }, 200);

    return () => {
      resizeObserver.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [navigate]);

  const handleZoomIn = () => graphRef.current?.zoom(1.5, 300);
  const handleZoomOut = () => graphRef.current?.zoom(0.75, 300);
  const handleReset = () => graphRef.current?.zoomToFit(400, 40);

  const uniqueDomains = Array.from(new Set(allTopics.map((t) => t.domain)));

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            &larr; Home
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Force-Directed Graph</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
            aria-label="Zoom out"
          >
            &minus;
          </button>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
            aria-label="Reset view"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="relative flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        />

        {hoveredTopic && (
          <div
            className="pointer-events-none absolute z-50"
            style={{
              left: tooltipPos.x + 16,
              top: tooltipPos.y + 16,
              pointerEvents: 'auto',
            }}
          >
            <NodeTooltip topic={hoveredTopic} onClose={() => setHoveredTopic(null)} />
          </div>
        )}

        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-xl border border-slate-200 p-4 shadow-lg max-w-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Domains</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueDomains.map((domain) => (
              <div key={domain} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: domainColors[domain] ?? '#94a3b8' }}
                />
                <span className="text-xs text-slate-600">{domain}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-slate-400" />
              <span>Prerequisite</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-green-500" />
              <span>Related</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-500" />
              <span>Application</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
