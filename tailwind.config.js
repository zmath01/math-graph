/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linalg: '#3b82f6',
        probstat: '#10b981',
        diffeq: '#f59e0b',
        mathphys: '#8b5cf6',
        scicomp: '#06b6d4',
        ml: '#ec4899',
        dl: '#ef4444',
        transformers: '#f97316',
        optimization: '#6366f1',
        algoopt: '#14b8a6',
        hpc: '#64748b',
      },
    },
  },
  plugins: [],
}
