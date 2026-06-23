# MATHgraph

An interactive multi-disciplinary knowledge tree covering linear algebra, probability & statistics, differential equations, mathematical physics methods (PDEs and complex analysis), scientific computing, machine learning, deep learning, Transformers, optimization, algorithm optimization, and HPC.

## Live Demo

The site is automatically deployed to GitHub Pages via GitHub Actions.

- Force-directed graph view: `/force`
- Mindmap view: `/mindmap`
- Search: `/search`
- Topic detail: `/topic/:id`

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- `force-graph` for the force-directed layout
- D3 for the collapsible mindmap
- `better-react-mathjax` for TeX / MathJax formula rendering
- `react-syntax-highlighter` for code blocks with line numbers and syntax highlighting

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Deployment

Push to the `main` branch. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the production bundle and deploys the `dist/` folder to GitHub Pages.

### Repository Settings

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. On the first push, approve the workflow run if required.

## Project Structure

```
.
├── .github/workflows/deploy.yml   # CI/CD for GitHub Pages
├── public/                        # Static assets
├── src/
│   ├── components/                # React components
│   │   ├── HomePage.tsx
│   │   ├── ForceGraphView.tsx
│   │   ├── MindMapView.tsx
│   │   ├── DetailPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── NodeTooltip.tsx
│   │   └── CodeBlock.tsx
│   ├── data/topics.ts             # Curated knowledge topics
│   ├── lib/topics.ts              # Graph/tree helpers and search
│   ├── types/topic.ts             # TypeScript interfaces
│   ├── App.tsx
│   ├── router.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Data Model

Each topic includes:

- `id`, `title`, `domain`, `difficulty`
- `summary` and `keyPoints`
- `formulas` (LaTeX / MathJax strings)
- `code` (language, content, optional caption)
- `prerequisites`, `related`, `applications` (relationship edges)
- `references` and `tags`

## License

MIT
