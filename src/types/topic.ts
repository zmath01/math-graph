/**
 * Topic data model for the Math Graph knowledge tree.
 * All fields use English text to support the international UI.
 */
export interface Topic {
  /** Unique identifier used in URLs and edge references. */
  id: string;
  /** Human-readable title. */
  title: string;
  /** Domain / subject area (used for color grouping). */
  domain: string;
  /** Estimated difficulty level. */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Short summary shown in tooltips and detail page headers. */
  summary: string;
  /** Bullet list of key takeaways. */
  keyPoints: string[];
  /** LaTeX / MathJax formula strings. */
  formulas: string[];
  /** Code snippets with language identifier. */
  code: Array<{
    language: string;
    content: string;
    caption?: string;
  }>;
  /** IDs of prerequisite topics. */
  prerequisites: string[];
  /** IDs of strongly related topics. */
  related: string[];
  /** IDs of topics where this concept is applied. */
  applications: string[];
  /** Academic / reference sources. */
  references: Array<{
    title: string;
    author: string;
    source: string;
    url: string;
  }>;
  /** Search tags. */
  tags: string[];
}

/** Graph node used by the force-graph visualization. */
export interface GraphNode {
  id: string;
  title: string;
  domain: string;
  difficulty: Topic['difficulty'];
  val: number;
  color: string;
  description: string;
}

/** Graph link used by the force-graph visualization. */
export interface GraphLink {
  source: string;
  target: string;
  type: 'prerequisite' | 'related' | 'application';
  color: string;
}

/** Tree node used by the mindmap visualization. */
export interface TreeNode {
  id: string;
  name: string;
  domain: string;
  difficulty: Topic['difficulty'];
  collapsed?: boolean;
  children?: TreeNode[];
  _children?: TreeNode[];
}
