import { MathJaxContext } from 'better-react-mathjax';
import { AppRouter } from './router';
import './index.css';

/**
 * MathJax configuration used by better-react-mathjax.
 * Loaded before the main application to ensure formulas render smoothly.
 */
const mathJaxConfig = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
  svg: {
    fontCache: 'global',
  },
};

/**
 * Root application component.
 */
function App() {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <AppRouter />
    </MathJaxContext>
  );
}

export default App

