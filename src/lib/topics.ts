import type { Topic, GraphNode, GraphLink, TreeNode } from '../types/topic';
import { topics } from '../data/topics';

/**
 * Domain color palette used consistently across visualizations.
 */
export const domainColors: Record<string, string> = {
  'Linear Algebra': '#3b82f6',
  'Probability & Statistics': '#10b981',
  'Differential Equations': '#f59e0b',
  'Mathematical Physics': '#8b5cf6',
  'Scientific Computing': '#06b6d4',
  'Machine Learning': '#ec4899',
  'Deep Learning': '#ef4444',
  'Transformers': '#f97316',
  'Optimization': '#6366f1',
  'Algorithm Optimization': '#14b8a6',
  'HPC': '#64748b',
};

/**
 * Difficulty drives node size in the force graph.
 */
const difficultyValue: Record<string, number> = {
  beginner: 6,
  intermediate: 9,
  advanced: 12,
};

/**
 * All topics loaded from the curated data module.
 */
export const allTopics = topics;

/**
 * Index topics by ID for fast lookup.
 */
export const topicMap: Map<string, Topic> = new Map(
  allTopics.map((topic) => [topic.id, topic])
);

/**
 * Build force-graph nodes from the topic list.
 */
export function buildGraphNodes(): GraphNode[] {
  return allTopics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    domain: topic.domain,
    difficulty: topic.difficulty,
    val: difficultyValue[topic.difficulty],
    color: domainColors[topic.domain] ?? '#94a3b8',
    description: topic.summary,
  }));
}

/**
 * Build force-graph links from prerequisites, related, and applications.
 */
export function buildGraphLinks(): GraphLink[] {
  const links: GraphLink[] = [];
  const validIds = new Set(allTopics.map((t) => t.id));

  for (const topic of allTopics) {
    for (const targetId of topic.prerequisites) {
      if (validIds.has(targetId)) {
        links.push({
          source: targetId,
          target: topic.id,
          type: 'prerequisite',
          color: '#64748b',
        });
      }
    }
    for (const targetId of topic.related) {
      if (validIds.has(targetId)) {
        links.push({
          source: topic.id,
          target: targetId,
          type: 'related',
          color: '#22c55e',
        });
      }
    }
    for (const targetId of topic.applications) {
      if (validIds.has(targetId)) {
        links.push({
          source: topic.id,
          target: targetId,
          type: 'application',
          color: '#f59e0b',
        });
      }
    }
  }

  return links;
}

/**
 * Build a hierarchical tree from the flat topic list.
 * Root nodes are domain roots. Children are derived from the
 * application relationship when it points to a deeper topic.
 */
export function buildTreeData(): TreeNode {
  const rootNode: TreeNode = {
    id: 'root',
    name: 'MATHgraph',
    domain: 'Root',
    difficulty: 'beginner',
    collapsed: false,
    children: [],
  };

  // Find domain root topics (no prerequisites) and group by domain
  const domainRoots: Record<string, TreeNode> = {};

  for (const topic of allTopics) {
    if (topic.prerequisites.length === 0) {
      domainRoots[topic.domain] = {
        id: topic.id,
        name: topic.title,
        domain: topic.domain,
        difficulty: topic.difficulty,
        collapsed: true,
        children: [],
      };
    }
  }

  // Map topic IDs to their tree node representation
  const nodeById = new Map<string, TreeNode>();
  for (const topic of allTopics) {
    nodeById.set(topic.id, {
      id: topic.id,
      name: topic.title,
      domain: topic.domain,
      difficulty: topic.difficulty,
      collapsed: true,
    });
  }

  // Attach nodes to their domain root if they are not themselves a domain root
  for (const topic of allTopics) {
    if (domainRoots[topic.id]) continue;

    const domainRoot = domainRoots[topic.domain];
    if (!domainRoot) continue;

    const node = nodeById.get(topic.id);
    if (!node) continue;

    if (!domainRoot.children) domainRoot.children = [];
    domainRoot.children.push(node);
  }

  rootNode.children = Object.values(domainRoots);
  return rootNode;
}

/**
 * Lookup a topic by its ID.
 */
export function getTopicById(id: string): Topic | undefined {
  return topicMap.get(id);
}

/**
 * Search topics by title, summary, tags, or domain.
 */
export function searchTopics(query: string): Topic[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return allTopics;

  return allTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(lower) ||
      topic.summary.toLowerCase().includes(lower) ||
      topic.domain.toLowerCase().includes(lower) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(lower))
  );
}

/**
 * Return the English display label for a relationship type.
 */
export function linkTypeLabel(type: GraphLink['type']): string {
  switch (type) {
    case 'prerequisite':
      return 'Prerequisite';
    case 'related':
      return 'Related';
    case 'application':
      return 'Application';
    default:
      return 'Link';
  }
}
