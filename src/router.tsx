import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ForceGraphView } from './components/ForceGraphView';
import { MindMapView } from './components/MindMapView';
import { DetailPage } from './components/DetailPage';
import { SearchPage } from './components/SearchPage';

/**
 * Application router. Uses HashRouter to ensure deep links work on GitHub Pages.
 */
export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/force" element={<ForceGraphView />} />
        <Route path="/mindmap" element={<MindMapView />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/topic/:id" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  );
}
