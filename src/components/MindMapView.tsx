import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import type { TreeNode } from '../types/topic';
import { buildTreeData, domainColors, topicMap } from '../lib/topics';
import { NodeTooltip } from './NodeTooltip';
import { Link } from 'react-router-dom';

/**
 * D3 hierarchy nodes store previous coordinates for animated transitions.
 * The standard HierarchyNode type does not include x0/y0, so we extend it here.
 */
type MindMapNode = d3.HierarchyNode<TreeNode> & {
  x0?: number;
  y0?: number;
  x?: number;
  y?: number;
  children?: MindMapNode[];
  _children?: MindMapNode[];
};

/**
 * Mindmap view inspired by the collapsible tree at wuli.wiki/apps/tree2.
 * Nodes can be expanded/collapsed; clicking a leaf navigates to its detail page.
 */
export function MindMapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const updateRef = useRef<((source: MindMapNode) => void) | null>(null);
  const rootRef = useRef<MindMapNode | null>(null);

  const navigate = useNavigate();

  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const margin = { top: 40, right: 140, bottom: 40, left: 140 };

    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('cursor', 'grab');

    svgRef.current = svg.node();

    const g = svg.append('g');
    gRef.current = g.node();

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom as any);

    const treeLayout = d3.tree<TreeNode>().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy<TreeNode>(buildTreeData()) as MindMapNode;
    rootRef.current = root;
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse all domain roots except the first
    root.children?.forEach((child, index) => {
      if (index !== 0) collapse(child);
    });

    update(root);

    // Center initially
    setTimeout(() => {
      svg.transition().duration(750).call(zoom.transform as any, d3.zoomIdentity.translate(120, height / 2 - root.x0!).scale(0.85));
    }, 50);

    function update(source: MindMapNode) {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants() as MindMapNode[];
      const links = treeData.links() as d3.HierarchyPointLink<TreeNode>[];

      nodes.forEach((d) => {
        d.y = d.depth * 180;
      });

      const node = g
        .selectAll<SVGGElement, MindMapNode>('g.mindmap-node')
        .data(nodes, (d: MindMapNode) => d.data.id || d.data.name);

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'mindmap-node')
        .attr('transform', () => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          event.stopPropagation();
          const hasChildren = d.children || d._children;
          if (hasChildren) {
            if (d.children) {
              d._children = d.children;
              d.children = undefined;
            } else {
              d.children = d._children;
              d._children = undefined;
            }
            update(d);
          } else if (d.data.id !== 'root') {
            navigate(`/topic/${d.data.id}`);
          }
        })
        .on('mouseenter', (event, d) => {
          if (d.data.id !== 'root') {
            setHoveredTopicId(d.data.id);
            setTooltipPos({ x: event.clientX + 12, y: event.clientY + 12 });
          }
        })
        .on('mousemove', (event) => {
          setTooltipPos({ x: event.clientX + 12, y: event.clientY + 12 });
        })
        .on('mouseleave', () => {
          setHoveredTopicId(null);
        });

      nodeEnter
        .append('circle')
        .attr('r', 0)
        .style('fill', (d) => (d.children || d._children ? domainColors[d.data.domain] ?? '#94a3b8' : '#ffffff'))
        .style('stroke', (d) => domainColors[d.data.domain] ?? '#94a3b8')
        .style('stroke-width', 2)
        .style('cursor', 'pointer');

      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', (d) => (d.children || d._children ? -12 : 12))
        .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
        .text((d) => d.data.name)
        .attr('class', 'mindmap-node-text')
        .style('fill', '#1f2937');

      const nodeUpdate = nodeEnter.merge(node as any);

      nodeUpdate
        .transition()
        .duration(500)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select('circle')
        .attr('r', (d) => (d.data.id === 'root' ? 10 : 6))
        .style('fill', (d) => (d.children || d._children ? domainColors[d.data.domain] ?? '#94a3b8' : '#ffffff'));

      nodeUpdate
        .select('text')
        .style('fill-opacity', 1)
        .attr('x', (d) => (d.children || d._children ? -12 : 12))
        .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'));

      const nodeExit = node
        .exit()
        .transition()
        .duration(500)
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select('circle').attr('r', 0);
      nodeExit.select('text').style('fill-opacity', 0);

      const link = g
        .selectAll<SVGPathElement, d3.HierarchyPointLink<TreeNode>>('path.mindmap-link')
        .data(links, (d: any) => d.target.data.id || d.target.data.name);

      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'mindmap-link')
        .attr('d', () => {
          const o = { x: source.x0!, y: source.y0! };
          return diagonal(o, o);
        });

      const linkUpdate = linkEnter.merge(link as any);

      linkUpdate
        .transition()
        .duration(500)
        .attr('d', (d) => diagonal(d.source, d.target));

      link
        .exit()
        .transition()
        .duration(500)
        .attr('d', () => {
          const o = { x: source.x!, y: source.y! };
          return diagonal(o, o);
        })
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function diagonal(s: { x: number; y: number }, t: { x: number; y: number }) {
      return `M ${s.y} ${s.x} C ${(s.y + t.y) / 2} ${s.x}, ${(s.y + t.y) / 2} ${t.x}, ${t.y} ${t.x}`;
    }

    updateRef.current = update;

    const handleResize = () => {
      if (!containerRef.current || !svgRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      d3.select(svgRef.current).attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
      treeLayout.size([h - margin.top - margin.bottom, w - margin.left - margin.right]);
      update(root);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      svg.remove();
    };
  }, [navigate]);

  const handleZoomIn = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy as any, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy as any, 0.75);
    }
  };

  const handleReset = () => {
    if (svgRef.current && zoomRef.current && containerRef.current) {
      const h = containerRef.current.clientHeight;
      d3.select(svgRef.current)
        .transition()
        .duration(750)
        .call(zoomRef.current.transform as any, d3.zoomIdentity.translate(120, h / 2).scale(0.85));
    }
  };

  const expandAll = () => {
    if (!rootRef.current || !updateRef.current) return;
    expand(rootRef.current);
    updateRef.current(rootRef.current);
  };

  const collapseAll = () => {
    if (!rootRef.current || !updateRef.current) return;
    rootRef.current.children?.forEach((child) => collapse(child));
    updateRef.current(rootRef.current);
  };

  function expand(d: MindMapNode) {
    if (d._children) {
      d.children = d._children;
      d._children = undefined;
    }
    if (d.children) {
      d.children.forEach(expand);
    }
  }

  function collapse(d: MindMapNode) {
    if (d.children) {
      d._children = d.children;
      d.children.forEach(collapse);
      d.children = undefined;
    }
  }

  const hoveredTopic = hoveredTopicId ? topicMap.get(hoveredTopicId) : undefined;

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
          <h1 className="text-lg font-bold text-slate-900">Mindmap</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
            aria-label="Expand all"
          >
            Expand
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
            aria-label="Collapse all"
          >
            Collapse
          </button>
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
        <div ref={containerRef} className="absolute inset-0" />

        {hoveredTopic && (
          <div
            className="pointer-events-none absolute z-50"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              pointerEvents: 'auto',
            }}
          >
            <NodeTooltip topic={hoveredTopic} onClose={() => setHoveredTopicId(null)} />
          </div>
        )}

        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-xl border border-slate-200 p-4 shadow-lg max-w-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-2">How to use</h3>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>Click a colored node to expand/collapse its children.</li>
            <li>Click a white leaf node to open its detail page.</li>
            <li>Drag the canvas to pan, scroll to zoom.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
