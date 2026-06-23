import type { Topic } from '../types/topic';

export const topics: Topic[] = [
  {
    id: 'linalg',
    title: 'Linear Algebra',
    domain: 'Linear Algebra',
    difficulty: 'beginner',
    summary: 'The study of vectors, matrices, and linear transformations, forming the language of modern applied mathematics.',
    keyPoints: [
      'Provides the vocabulary for high-dimensional spaces.',
      'Underpins machine learning, PDEs, signal processing, and HPC.',
      'Key objects: vectors, matrices, tensors, eigenvalues, and decompositions.'
    ],
    formulas: [
      '\\mathbf{A} \\mathbf{x} = \\mathbf{b}',
      '\\text{span}(\\{ \\mathbf{v}_1, \\dots, \\mathbf{v}_n \\}) = \\left\\{ \\sum_{i=1}^n c_i \\mathbf{v}_i \\;\\big|\\; c_i \\in \\mathbb{R} \\right\\\}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nx = np.array([1, -1])\nprint(A @ x)`,
        caption: 'Matrix-vector multiplication in NumPy.'
      }
    ],
    prerequisites: [],
    related: ['optimization', 'scicomp', 'ml'],
    applications: ['linalg-pca', 'dl-mlp', 'transformers-attention'],
    references: [
      { title: 'Linear Algebra and Its Applications', author: 'Gilbert Strang', source: 'Academic Press', url: 'https://math.mit.edu/~gs/linearalgebra/' }
    ],
    tags: ['linear', 'algebra', 'vectors', 'matrices']
  },
  {
    id: 'linalg-vectors',
    title: 'Vectors & Vector Spaces',
    domain: 'Linear Algebra',
    difficulty: 'beginner',
    summary: 'Abstract spaces where vectors can be added and scaled, governed by eight axioms.',
    keyPoints: [
      'A vector space is closed under addition and scalar multiplication.',
      'Linear independence determines the dimension of a space.',
      'Bases allow coordinate representations.'
    ],
    formulas: [
      '\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}',
      '\\alpha(\\beta \\mathbf{v}) = (\\alpha\\beta)\\mathbf{v}',
      '\\dim(\\mathbb{R}^n) = n'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\nM = np.column_stack([u, v])\nprint(np.linalg.matrix_rank(M))`,
        caption: 'Checking the rank of a matrix formed by vectors.'
      }
    ],
    prerequisites: ['linalg'],
    related: ['linalg-matrices', 'linalg-norms'],
    applications: ['linalg-pca'],
    references: [
      { title: 'Introduction to Linear Algebra', author: 'Gilbert Strang', source: 'Wellesley-Cambridge Press', url: 'https://math.mit.edu/~gs/linearalgebra/' }
    ],
    tags: ['vector', 'space', 'basis', 'dimension']
  },
  {
    id: 'linalg-matrices',
    title: 'Matrices',
    domain: 'Linear Algebra',
    difficulty: 'beginner',
    summary: 'Rectangular arrays representing linear maps, systems of equations, and data tables.',
    keyPoints: [
      'Matrix multiplication composes linear transformations.',
      'The rank reveals the number of independent rows or columns.',
      'Invertibility is equivalent to a non-zero determinant.'
    ],
    formulas: [
      '(\\mathbf{A}\\mathbf{B})_{ij} = \\sum_{k} A_{ik} B_{kj}',
      '\\det(\\mathbf{A}) \\neq 0 \\iff \\mathbf{A} \\text{ is invertible}',
      '\\text{rank}(\\mathbf{A}) = \\text{rank}(\\mathbf{A}^\\top)'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.random.randn(3, 3)\nprint(f"Rank: {np.linalg.matrix_rank(A)}")\nprint(f"Determinant: {np.linalg.det(A):.4f}")\nprint(f"Inverse:\\n{np.linalg.inv(A)}")`,
        caption: 'Basic matrix properties in NumPy.'
      }
    ],
    prerequisites: ['linalg-vectors'],
    related: ['linalg-decomp', 'linalg-eigen'],
    applications: ['dl-mlp', 'scicomp-linear'],
    references: [
      { title: 'Matrix Analysis', author: 'Roger Horn and Charles Johnson', source: 'Cambridge University Press', url: 'https://www.cambridge.org/core/books/matrix-analysis/' }
    ],
    tags: ['matrix', 'rank', 'determinant', 'inverse']
  },
  {
    id: 'linalg-eigen',
    title: 'Eigenvalues & Eigenvectors',
    domain: 'Linear Algebra',
    difficulty: 'intermediate',
    summary: 'Special directions and scaling factors that diagonalize linear transformations.',
    keyPoints: [
      'Eigenvectors are directions preserved by the matrix.',
      'Eigenvalues quantify the scaling along those directions.',
      'Spectral decomposition is central to PCA, stability, and quantum mechanics.'
    ],
    formulas: [
      '\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}',
      '\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0',
      '\\mathbf{A} = \\mathbf{Q} \\mathbf{\\Lambda} \\mathbf{Q}^{-1}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.array([[4, 2], [1, 3]])\neigenvalues, eigenvectors = np.linalg.eig(A)\nprint("Eigenvalues:", eigenvalues)\nprint("Eigenvectors:\\n", eigenvectors)`,
        caption: 'Eigen-decomposition with NumPy.'
      }
    ],
    prerequisites: ['linalg-matrices'],
    related: ['linalg-decomp', 'mathphys-pde'],
    applications: ['linalg-pca', 'diffeq-stability', 'dl-mlp'],
    references: [
      { title: 'Numerical Linear Algebra', author: 'Lloyd Trefethen and David Bau', source: 'SIAM', url: 'https://users.cs.duke.edu/~cbk/teaching/numerical-linear-algebra/' }
    ],
    tags: ['eigenvalue', 'eigenvector', 'spectrum', 'diagonalization']
  },
  {
    id: 'linalg-decomp',
    title: 'Matrix Decompositions',
    domain: 'Linear Algebra',
    difficulty: 'advanced',
    summary: 'Factorizations such as LU, QR, Cholesky, and SVD that expose structure and speed computations.',
    keyPoints: [
      'LU decomposition reduces solving linear systems to triangular systems.',
      'QR decomposition orthogonalizes columns and supports least squares.',
      'SVD provides the best low-rank approximation.'
    ],
    formulas: [
      '\\mathbf{A} = \\mathbf{L}\\mathbf{U}',
      '\\mathbf{A} = \\mathbf{Q}\\mathbf{R}',
      '\\mathbf{A} = \\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^\\top'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.array([[1, 2], [3, 4], [5, 6]])\nU, s, Vt = np.linalg.svd(A, full_matrices=False)\nprint("Singular values:", s)`,
        caption: 'Thin SVD of a rectangular matrix.'
      }
    ],
    prerequisites: ['linalg-matrices', 'linalg-eigen'],
    related: ['linalg-gram', 'scicomp-linear'],
    applications: ['linalg-pca', 'ml-regression', 'hpc-parallel'],
    references: [
      { title: 'Matrix Computations', author: 'Gene Golub and Charles Van Loan', source: 'Johns Hopkins University Press', url: 'https://www.cs.cornell.edu/cv/GVL4/golubandvanloan.htm' }
    ],
    tags: ['svd', 'qr', 'lu', 'cholesky', 'decomposition']
  },
  {
    id: 'linalg-norms',
    title: 'Vector & Matrix Norms',
    domain: 'Linear Algebra',
    difficulty: 'intermediate',
    summary: 'Measures of size that enable error analysis, regularization, and convergence proofs.',
    keyPoints: [
      'The p-norm generalizes Euclidean length.',
      'Matrix norms induced by vector norms capture operator size.',
      'Frobenius and spectral norms are common in optimization and ML.'
    ],
    formulas: [
      '\\|\\mathbf{x}\\|_p = \\left( \\sum_{i} |x_i|^p \\right)^{1/p}',
      '\\|\\mathbf{A}\\|_2 = \\sigma_{\\max}(\\mathbf{A})',
      '\\|\\mathbf{A}\\|_F = \\sqrt{\\sum_{i,j} A_{ij}^2}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nprint(f"L2 norm: {np.linalg.norm(A, 2):.4f}")\nprint(f"Frobenius norm: {np.linalg.norm(A, 'fro'):.4f}")\nprint(f"Nuclear norm: {np.linalg.norm(A, 'nuc'):.4f}")`,
        caption: 'Computing common matrix norms.'
      }
    ],
    prerequisites: ['linalg-vectors', 'linalg-matrices'],
    related: ['optimization-convex', 'dl-regularization'],
    applications: ['dl-regularization', 'optimization-grad'],
    references: [
      { title: 'Matrix Analysis', author: 'Roger Horn and Charles Johnson', source: 'Cambridge University Press', url: 'https://www.cambridge.org/core/books/matrix-analysis/' }
    ],
    tags: ['norm', 'p-norm', 'frobenius', 'spectral']
  },
  {
    id: 'linalg-gram',
    title: 'Gram-Schmidt & Orthogonalization',
    domain: 'Linear Algebra',
    difficulty: 'intermediate',
    summary: 'Algorithms that construct orthonormal bases, forming the foundation of QR decomposition and least squares.',
    keyPoints: [
      'Orthogonal bases simplify projections and coordinate computations.',
      'Gram-Schmidt is intuitive but numerically unstable; modified versions and Householder reflections are preferred.',
      'QR decomposition is the practical outcome of orthogonalization.'
    ],
    formulas: [
      '\\mathbf{u}_k = \\mathbf{v}_k - \\sum_{j=1}^{k-1} \\text{proj}_{\\mathbf{u}_j}(\\mathbf{v}_k)',
      '\\mathbf{e}_k = \\frac{\\mathbf{u}_k}{\\|\\mathbf{u}_k\\|}',
      '\\mathbf{A} = \\mathbf{Q}\\mathbf{R}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.array([[1, 1], [0, 1], [1, 0]], dtype=float)\nQ, R = np.linalg.qr(A)\nprint("Q:\\n", Q)\nprint("R:\\n", R)\nprint("Q^T Q:\\n", Q.T @ Q)`,
        caption: 'QR decomposition via NumPy.'
      }
    ],
    prerequisites: ['linalg-vectors'],
    related: ['linalg-decomp', 'linalg-matrices'],
    applications: ['scicomp-linear', 'ml-regression'],
    references: [
      { title: 'Numerical Linear Algebra', author: 'Lloyd Trefethen and David Bau', source: 'SIAM', url: 'https://users.cs.duke.edu/~cbk/teaching/numerical-linear-algebra/' }
    ],
    tags: ['orthogonal', 'qr', 'gram-schmidt', 'orthonormal']
  },
  {
    id: 'linalg-pca',
    title: 'Principal Component Analysis',
    domain: 'Linear Algebra',
    difficulty: 'intermediate',
    summary: 'A linear dimensionality-reduction technique that projects data onto its directions of maximum variance.',
    keyPoints: [
      'PCA finds the orthonormal directions that capture the most variance.',
      'It is equivalent to computing the SVD of the centered data matrix.',
      'Used for visualization, denoising, and feature extraction.'
    ],
    formulas: [
      '\\mathbf{\\Sigma} = \\frac{1}{n-1} \\mathbf{X}^\\top \\mathbf{X}',
      '\\mathbf{\\Sigma} \\mathbf{w}_i = \\lambda_i \\mathbf{w}_i',
      '\\mathbf{Z} = \\mathbf{X} \\mathbf{W}_k'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nX = np.random.randn(100, 5)\nX_centered = X - X.mean(axis=0)\nU, s, Vt = np.linalg.svd(X_centered, full_matrices=False)\nZ = X_centered @ Vt[:2].T`,
        caption: 'PCA via SVD without scikit-learn.'
      }
    ],
    prerequisites: ['linalg-eigen', 'linalg-decomp', 'probstat-expectation'],
    related: ['ml-clustering', 'ml-regression'],
    applications: ['ml-evaluation', 'scicomp-fft'],
    references: [
      { title: 'The Elements of Statistical Learning', author: 'Hastie, Tibshirani, Friedman', source: 'Springer', url: 'https://hastie.su.domains/ElemStatLearn/' }
    ],
    tags: ['pca', 'svd', 'dimensionality-reduction', 'variance']
  },
  {
    id: 'probstat',
    title: 'Probability & Statistics',
    domain: 'Probability & Statistics',
    difficulty: 'beginner',
    summary: 'The mathematical framework for reasoning under uncertainty and drawing conclusions from data.',
    keyPoints: [
      'Probability assigns measures to events in a sample space.',
      'Statistics infers population properties from samples.',
      'Both are foundational for machine learning, scientific computing, and finance.'
    ],
    formulas: [
      'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
      '\\mathbb{E}[X] = \\sum_{x} x \\cdot P(X=x)',
      '\\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2]'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nX = np.random.randn(1000)\nprint(f"Mean: {X.mean():.4f}")\nprint(f"Std: {X.std():.4f}")`,
        caption: 'Estimating mean and variance from a sample.'
      }
    ],
    prerequisites: [],
    related: ['linalg', 'optimization', 'ml'],
    applications: ['ml-regression', 'probstat-montecarlo', 'probstat-bayes'],
    references: [
      { title: 'Probability and Statistics for Computer Scientists', author: 'Michael Mitzenmacher and Eli Upfal', source: 'Cambridge University Press', url: 'https://www.cambridge.org/highereducation/books/probability-and-computing/6D5F023E3CCF6D4DDAF24B2A002A604E' }
    ],
    tags: ['probability', 'statistics', 'inference', 'uncertainty']
  },
  {
    id: 'probstat-random-variables',
    title: 'Random Variables',
    domain: 'Probability & Statistics',
    difficulty: 'beginner',
    summary: 'Functions that map outcomes from a sample space to numerical values, enabling probabilistic analysis.',
    keyPoints: [
      'Discrete random variables take countable values; continuous ones have densities.',
      'CDFs and PDFs completely characterize distributions.',
      'Moments capture shape, location, and spread.'
    ],
    formulas: [
      'F_X(x) = P(X \\leq x)',
      'f_X(x) = \\frac{d}{dx} F_X(x)',
      '\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x f_X(x) \\, dx'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy import stats\n\nrv = stats.norm(loc=0, scale=1)\nprint(f"P(X <= 1.96) = {rv.cdf(1.96):.4f}")\nprint(f"P(-1 <= X <= 1) = {rv.cdf(1) - rv.cdf(-1):.4f}")`,
        caption: 'Evaluating a normal CDF.'
      }
    ],
    prerequisites: ['probstat'],
    related: ['probstat-distributions', 'probstat-expectation'],
    applications: ['probstat-mle', 'probstat-bayes'],
    references: [
      { title: 'Introduction to Probability', author: 'Joseph Blitzstein and Jessica Hwang', source: 'CRC Press', url: 'https://www.stat110.net/' }
    ],
    tags: ['random-variable', 'cdf', 'pdf', 'moments']
  },
  {
    id: 'probstat-distributions',
    title: 'Probability Distributions',
    domain: 'Probability & Statistics',
    difficulty: 'beginner',
    summary: 'Families of random variables that model common phenomena, from coin flips to measurement errors.',
    keyPoints: [
      'Bernoulli, Binomial, Poisson, Normal, and Exponential distributions appear everywhere.',
      'The Central Limit Theorem explains the ubiquity of the normal distribution.',
      'Multivariate distributions extend these ideas to vector-valued variables.'
    ],
    formulas: [
      'P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}',
      'f(x; \\mu, \\sigma^2) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)',
      '\\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1)'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nnp.random.seed(42)\nsamples = np.random.binomial(n=10, p=0.3, size=10000)\nprint(f"Empirical mean: {samples.mean():.4f} (theoretical: {10*0.3})")`,
        caption: 'Sampling from a binomial distribution.'
      }
    ],
    prerequisites: ['probstat-random-variables'],
    related: ['probstat-mle', 'probstat-bayes'],
    applications: ['ml-regression', 'probstat-montecarlo'],
    references: [
      { title: 'All of Statistics', author: 'Larry Wasserman', source: 'Springer', url: 'https://www.stat.cmu.edu/~larry/all-of-statistics/' }
    ],
    tags: ['distribution', 'binomial', 'normal', 'poisson']
  },
  {
    id: 'probstat-bayes',
    title: 'Bayesian Inference',
    domain: 'Probability & Statistics',
    difficulty: 'intermediate',
    summary: 'Updating beliefs about parameters as new evidence arrives, using the language of conditional probability.',
    keyPoints: [
      'Bayes theorem inverts likelihoods to obtain posterior probabilities.',
      'Priors encode assumptions before seeing data.',
      'Posterior predictive distributions support decision-making under uncertainty.'
    ],
    formulas: [
      'P(\\theta | \\mathcal{D}) = \\frac{P(\\mathcal{D} | \\theta) P(\\theta)}{P(\\mathcal{D})}',
      '\\propto \\text{likelihood} \\times \\text{prior}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\n# Beta-Bernoulli: observe 7 heads / 3 tails\nalpha, beta = 1 + 7, 1 + 3\nposterior_mean = alpha / (alpha + beta)\nprint(f"Posterior mean of heads probability: {posterior_mean:.4f}")`,
        caption: 'Beta-Bernoulli conjugate updating.'
      }
    ],
    prerequisites: ['probstat-distributions', 'probstat-random-variables'],
    related: ['ml-optimization', 'optimization-grad'],
    applications: ['ml-trees', 'probstat-mle'],
    references: [
      { title: 'Bayesian Data Analysis', author: 'Gelman et al.', source: 'CRC Press', url: 'http://www.stat.columbia.edu/~gelman/book/' }
    ],
    tags: ['bayesian', 'posterior', 'prior', 'likelihood']
  },
  {
    id: 'probstat-expectation',
    title: 'Expectation & Variance',
    domain: 'Probability & Statistics',
    difficulty: 'beginner',
    summary: 'Core summaries that describe the center and spread of a random variable or estimator.',
    keyPoints: [
      'Expectation is a linear operator.',
      'Variance measures dispersion around the mean.',
      'Covariance captures linear relationships between random variables.'
    ],
    formulas: [
      '\\mathbb{E}[aX + bY] = a\\mathbb{E}[X] + b\\mathbb{E}[Y]',
      '\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2',
      '\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)]'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nX = np.random.randn(1000)\nY = 2 * X + np.random.randn(1000)\nprint(f"Cov(X, Y): {np.cov(X, Y)[0, 1]:.4f}")`,
        caption: 'Empirical covariance between two variables.'
      }
    ],
    prerequisites: ['probstat-random-variables'],
    related: ['linalg-pca', 'probstat-distributions'],
    applications: ['linalg-pca', 'ml-evaluation'],
    references: [
      { title: 'Introduction to Probability', author: 'Joseph Blitzstein and Jessica Hwang', source: 'CRC Press', url: 'https://www.stat110.net/' }
    ],
    tags: ['expectation', 'variance', 'covariance', 'moments']
  },
  {
    id: 'probstat-mle',
    title: 'Maximum Likelihood Estimation',
    domain: 'Probability & Statistics',
    difficulty: 'intermediate',
    summary: 'A frequentist method that chooses parameters maximizing the probability of observed data.',
    keyPoints: [
      'The likelihood function is the joint probability viewed as a function of parameters.',
      'Log-likelihood simplifies products into sums.',
      'MLE is asymptotically normal and efficient under regularity conditions.'
    ],
    formulas: [
      '\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\prod_{i=1}^n p(x_i; \\theta)',
      '\\ell(\\theta) = \\sum_{i=1}^n \\log p(x_i; \\theta)',
      '\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\ell(\\theta)'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\nfrom scipy.optimize import minimize\n\ndata = np.random.randn(100) * 2 + 5\n\ndef neg_log_likelihood(params):\n    mu, sigma = params\n    n = len(data)\n    return 0.5 * n * np.log(2 * np.pi * sigma**2) + 0.5 * np.sum((data - mu)**2) / sigma**2\n\nres = minimize(neg_log_likelihood, x0=[0, 1], bounds=[(None, None), (1e-6, None)])\nprint(res.x)`,
        caption: 'MLE for Gaussian parameters via scipy.'
      }
    ],
    prerequisites: ['probstat-distributions', 'optimization-grad'],
    related: ['probstat-bayes', 'ml-regression'],
    applications: ['ml-regression', 'probstat-hypothesis'],
    references: [
      { title: 'All of Statistics', author: 'Larry Wasserman', source: 'Springer', url: 'https://www.stat.cmu.edu/~larry/all-of-statistics/' }
    ],
    tags: ['mle', 'likelihood', 'estimation', 'inference']
  },
  {
    id: 'probstat-hypothesis',
    title: 'Hypothesis Testing',
    domain: 'Probability & Statistics',
    difficulty: 'intermediate',
    summary: 'Formal procedures for deciding whether observed data contradicts a proposed model.',
    keyPoints: [
      'A test partitions the sample space into rejection and acceptance regions.',
      'Type I and Type II errors trade off according to the significance level.',
      'p-values quantify the probability of observing data at least as extreme under the null.'
    ],
    formulas: [
      'H_0: \\theta = \\theta_0 \\quad \\text{vs} \\quad H_1: \\theta \\neq \\theta_0',
      'p = P(T \\geq t_{\\text{obs}} | H_0)',
      '\\text{Power} = P(\\text{reject } H_0 | H_1 \\text{ is true})'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy import stats\n\ndata = [2.3, 3.1, 2.9, 3.5, 2.8]\nt_stat, p_value = stats.ttest_1samp(data, popmean=3.0)\nprint(f"t = {t_stat:.4f}, p = {p_value:.4f}")`,
        caption: 'One-sample t-test with SciPy.'
      }
    ],
    prerequisites: ['probstat-distributions', 'probstat-mle'],
    related: ['probstat-bayes', 'ml-evaluation'],
    applications: ['ml-evaluation', 'probstat-montecarlo'],
    references: [
      { title: 'Statistical Inference', author: 'George Casella and Roger Berger', source: 'Cengage Learning', url: 'https://www.casella.stat.ufl.edu/StatInference/' }
    ],
    tags: ['hypothesis-test', 'p-value', 't-test', 'power']
  },
  {
    id: 'probstat-montecarlo',
    title: 'Monte Carlo Methods',
    domain: 'Probability & Statistics',
    difficulty: 'intermediate',
    summary: 'Using random sampling to estimate integrals, expectations, and probabilities in high-dimensional spaces.',
    keyPoints: [
      'The law of large numbers justifies sample averages.',
      'Variance reduction accelerates convergence.',
      'Markov Chain Monte Carlo (MCMC) samples complex posteriors.'
    ],
    formulas: [
      '\\mathbb{E}_p[f(X)] \\approx \\frac{1}{N} \\sum_{i=1}^N f(x_i)',
      '\\hat{\\pi} = \\frac{\\text{samples inside circle}}{\\text{total samples}} \\times 4'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nN = 1_000_000\nx = np.random.uniform(-1, 1, N)\ny = np.random.uniform(-1, 1, N)\ninside = (x**2 + y**2) <= 1\npi_est = 4 * inside.mean()\nprint(f"Estimated pi: {pi_est:.6f}")`,
        caption: 'Monte Carlo estimation of pi.'
      }
    ],
    prerequisites: ['probstat-distributions', 'probstat-expectation'],
    related: ['scicomp-quadrature', 'probstat-bayes'],
    applications: ['scicomp-quadrature', 'probstat-bayes', 'ml-evaluation'],
    references: [
      { title: 'Monte Carlo Statistical Methods', author: 'Christian Robert and George Casella', source: 'Springer', url: 'https://www.springer.com/gp/book/9781441915757' }
    ],
    tags: ['monte-carlo', 'sampling', 'mcmc', 'integration']
  },
  {
    id: 'diffeq',
    title: 'Differential Equations',
    domain: 'Differential Equations',
    difficulty: 'intermediate',
    summary: 'Equations that relate a function to its derivatives, modeling change, growth, oscillation, and diffusion.',
    keyPoints: [
      'Ordinary differential equations (ODEs) involve a single independent variable.',
      'Partial differential equations (PDEs) involve multiple independent variables.',
      'Analytical, series, and numerical methods each have their domain of efficiency.'
    ],
    formulas: [
      '\\frac{dy}{dt} = f(t, y)',
      'y(t_0) = y_0',
      '\\mathcal{L}[y] = g(t)'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import solve_ivp\n\ndef f(t, y):\n    return -0.5 * y\n\nsol = solve_ivp(f, [0, 10], [2.0], t_eval=np.linspace(0, 10, 100))`,
        caption: 'Solving an ODE with SciPy.'
      }
    ],
    prerequisites: ['linalg', 'probstat'],
    related: ['mathphys', 'scicomp'],
    applications: ['diffeq-stability', 'mathphys-pde', 'dl-recurrent'],
    references: [
      { title: 'Elementary Differential Equations and Boundary Value Problems', author: 'Boyce and DiPrima', source: 'Wiley', url: 'https://www.wiley.com/en-us/Elementary+Differential+Equations+and+Boundary+Value+Problems%2C+11th+Edition-p-9781119382871' }
    ],
    tags: ['ode', 'pde', 'differential-equation', 'ivp']
  },
  {
    id: 'diffeq-ode1',
    title: 'First-Order ODEs',
    domain: 'Differential Equations',
    difficulty: 'beginner',
    summary: 'Initial-value problems involving the first derivative, often solvable by separation, integrating factors, or numerically.',
    keyPoints: [
      'Separable equations can be integrated directly.',
      'Linear first-order equations use integrating factors.',
      'Existence and uniqueness are guaranteed for Lipschitz right-hand sides.'
    ],
    formulas: [
      '\\frac{dy}{dt} + p(t)y = q(t)',
      '\\mu(t) = e^{\\int p(t) \\mathrm{d}t}',
      'y(t) = \\frac{1}{\\mu(t)} \\left( \\int \\mu(t) q(t) \\mathrm{d}t + C \\right)'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import solve_ivp\n\ndef logistic(t, y, r, K):\n    return r * y * (1 - y / K)\n\nsol = solve_ivp(logistic, [0, 20], [0.1], args=(0.5, 10), t_eval=np.linspace(0, 20, 200))`,
        caption: 'Logistic equation numerical solution.'
      }
    ],
    prerequisites: ['diffeq'],
    related: ['diffeq-ode2', 'diffeq-laplace'],
    applications: ['diffeq-stability', 'mathphys-pde'],
    references: [
      { title: 'Elementary Differential Equations', author: 'Boyce and DiPrima', source: 'Wiley', url: 'https://www.wiley.com/en-us/Elementary+Differential+Equations+and+Boundary+Value+Problems%2C+11th+Edition-p-9781119382871' }
    ],
    tags: ['first-order', 'ode', 'integrating-factor', 'logistic']
  },
  {
    id: 'diffeq-ode2',
    title: 'Higher-Order ODEs',
    domain: 'Differential Equations',
    difficulty: 'intermediate',
    summary: 'Equations with second or higher derivatives, often arising from Newtonian mechanics and circuit theory.',
    keyPoints: [
      'Higher-order ODEs reduce to first-order systems.',
      'Constant-coefficient linear equations have characteristic polynomials.',
      'Method of undetermined coefficients handles simple forcing terms.'
    ],
    formulas: [
      'ay^{\\prime\\prime} + by^\\prime + cy = g(t)',
      'ar^2 + br + c = 0',
      'y_c(t) = C_1 e^{r_1 t} + C_2 e^{r_2 t}'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import solve_ivp\n\ndef harmonic(t, y, omega):\n    return [y[1], -omega**2 * y[0]]\n\nsol = solve_ivp(harmonic, [0, 20], [1, 0], args=(2,), t_eval=np.linspace(0, 20, 200))`,
        caption: 'Harmonic oscillator as a first-order system.'
      }
    ],
    prerequisites: ['diffeq-ode1'],
    related: ['diffeq-systems', 'diffeq-laplace'],
    applications: ['mathphys-pde', 'diffeq-stability'],
    references: [
      { title: 'Elementary Differential Equations', author: 'Boyce and DiPrima', source: 'Wiley', url: 'https://www.wiley.com/en-us/Elementary+Differential+Equations+and+Boundary+Value+Problems%2C+11th+Edition-p-9781119382871' }
    ],
    tags: ['second-order', 'ode', 'harmonic', 'characteristic']
  },
  {
    id: 'diffeq-laplace',
    title: 'Laplace Transform',
    domain: 'Differential Equations',
    difficulty: 'intermediate',
    summary: 'An integral transform that converts differential equations into algebraic equations.',
    keyPoints: [
      'Turns convolution into multiplication.',
      'Handles discontinuous and impulsive forcing terms.',
      'The inverse transform is usually computed via partial fractions or tables.'
    ],
    formulas: [
      '\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^\\infty e^{-st} f(t) \\mathrm{d}t',
      '\\mathcal{L}\\{f^\\prime(t)\\} = sF(s) - f(0)',
      '\\mathcal{L}\\{e^{at}\\} = \\frac{1}{s-a}'
    ],
    code: [
      {
        language: 'python',
        content: `from sympy import symbols, Function, laplace_transform, exp\n\nt, s = symbols('t s', positive=True)\nf = exp(-2*t)\nF = laplace_transform(f, t, s)[0]\nprint(F)`,
        caption: 'Symbolic Laplace transform with SymPy.'
      }
    ],
    prerequisites: ['diffeq-ode1'],
    related: ['diffeq-ode2', 'mathphys-fourier'],
    applications: ['diffeq-systems', 'mathphys-pde'],
    references: [
      { title: 'Advanced Engineering Mathematics', author: 'Erwin Kreyszig', source: 'Wiley', url: 'https://www.wiley.com/en-us/Advanced+Engineering+Mathematics%2C+10th+Edition-p-9780470458365' }
    ],
    tags: ['laplace', 'transform', 'integral', 'algebraic']
  },
  {
    id: 'diffeq-systems',
    title: 'Systems of ODEs',
    domain: 'Differential Equations',
    difficulty: 'intermediate',
    summary: 'Coupled differential equations that describe interacting components, written compactly in matrix form.',
    keyPoints: [
      'Linear systems are solved by eigen-decomposition of the coefficient matrix.',
      'Phase portraits visualize trajectories and fixed points.',
      'Nonlinear systems are linearized near equilibria.'
    ],
    formulas: [
      '\\frac{d\\mathbf{x}}{dt} = \\mathbf{A}\\mathbf{x} + \\mathbf{f}(t)',
      '\\mathbf{x}(t) = e^{\\mathbf{A}t} \\mathbf{x}_0',
      '\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import solve_ivp\nimport numpy as np\n\ndef linear_system(t, x, A):\n    return A @ x\n\nA = np.array([[-1, 1], [-2, -3]])\nsol = solve_ivp(linear_system, [0, 10], [1, 0], args=(A,), t_eval=np.linspace(0, 10, 200))`,
        caption: 'Solving a linear system of ODEs.'
      }
    ],
    prerequisites: ['diffeq-ode2', 'linalg-matrices'],
    related: ['diffeq-stability', 'linalg-eigen'],
    applications: ['mathphys-pde', 'diffeq-stability'],
    references: [
      { title: 'Differential Equations and Dynamical Systems', author: 'Lawrence Perko', source: 'Springer', url: 'https://link.springer.com/book/10.1007/978-1-4613-0003-8' }
    ],
    tags: ['system', 'coupled', 'matrix-exponential', 'phase-portrait']
  },
  {
    id: 'diffeq-stability',
    title: 'Stability Analysis',
    domain: 'Differential Equations',
    difficulty: 'advanced',
    summary: 'Determining whether small perturbations grow or decay, essential for predictions and control.',
    keyPoints: [
      'Eigenvalues of the Jacobian determine local stability.',
      'Lyapunov functions prove global stability without explicit solutions.',
      'Bifurcations occur when stability changes as parameters vary.'
    ],
    formulas: [
      '\\frac{d\\mathbf{x}}{dt} = \\mathbf{f}(\\mathbf{x})',
      '\\mathbf{J} = \\frac{\\partial \\mathbf{f}}{\\partial \\mathbf{x}}',
      '\\text{Re}(\\lambda) < 0 \\; \\forall \\lambda \\implies \\text{asymptotic stability}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\ndef jacobian(f, x, eps=1e-6):\n    n = len(x)\n    J = np.zeros((n, n))\n    fx = f(x)\n    for i in range(n):\n        x_plus = x.copy(); x_plus[i] += eps\n        J[:, i] = (f(x_plus) - fx) / eps\n    return J\n\nf = lambda x: np.array([10*(x[1]-x[0]), x[0]*(28-x[2])-x[1], x[0]*x[1]-(8/3)*x[2]])\nJ = jacobian(f, np.array([0.0, 0.0, 0.0]))\nprint("Eigenvalues:", np.linalg.eigvals(J))`,
        caption: 'Jacobian eigenvalues at an equilibrium.'
      }
    ],
    prerequisites: ['diffeq-systems', 'linalg-eigen'],
    related: ['mathphys-pde', 'optimization-convex'],
    applications: ['mathphys-pde', 'scicomp-fdm'],
    references: [
      { title: 'Nonlinear Dynamics and Chaos', author: 'Steven Strogatz', source: 'Westview Press', url: 'https://sites.fas.harvard.edu/~strogatz/books/nonlinear-dynamics-and-chaos/' }
    ],
    tags: ['stability', 'jacobian', 'lyapunov', 'bifurcation']
  },
  {
    id: 'diffeq-numerical',
    title: 'Numerical ODE Solvers',
    domain: 'Differential Equations',
    difficulty: 'intermediate',
    summary: 'Algorithms that approximate solutions when analytical methods are impractical.',
    keyPoints: [
      'Euler method is first-order but simple.',
      'Runge-Kutta methods offer higher accuracy and adaptive step sizes.',
      'Stiff systems require implicit solvers for stability.'
    ],
    formulas: [
      'y_{n+1} = y_n + h f(t_n, y_n)',
      'k_1 = h f(t_n, y_n)',
      'k_2 = h f(t_n + h/2, y_n + k_1/2)',
      'y_{n+1} = y_n + k_2'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import solve_ivp\n\ndef rhs(t, y):\n    return [y[1], -y[0]]\n\nsol = solve_ivp(rhs, [0, 2*np.pi], [1, 0], method='RK45', dense_output=True)\nprint(f"Steps taken: {sol.t.size}")`,
        caption: 'Adaptive RK45 integration with SciPy.'
      }
    ],
    prerequisites: ['diffeq-ode1', 'scicomp-quadrature'],
    related: ['scicomp-fdm', 'mathphys-pde'],
    applications: ['diffeq-systems', 'mathphys-pde'],
    references: [
      { title: 'Solving Ordinary Differential Equations I', author: 'Hairer, Nørsett, Wanner', source: 'Springer', url: 'https://link.springer.com/book/10.1007/978-3-540-78862-1' }
    ],
    tags: ['numerical', 'ode', 'runge-kutta', 'euler']
  },
  {
    id: 'mathphys',
    title: 'Mathematical Physics Methods',
    domain: 'Mathematical Physics',
    difficulty: 'intermediate',
    summary: 'Analytical and numerical tools for physics-inspired problems, including PDEs and complex analysis.',
    keyPoints: [
      'Bridges abstract mathematics and physical models.',
      'Covers PDEs, complex functions, Fourier methods, and special functions.',
      'Provides the machinery for wave, heat, and potential equations.'
    ],
    formulas: [
      '\\nabla^2 u = \\frac{\\partial u}{\\partial t}',
      '\\oint_C f(z) \\mathrm{d}z = 0 \\quad (\\text{Cauchy})'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nn = 50\nL = np.diag(-2*np.ones(n)) + np.diag(np.ones(n-1), 1) + np.diag(np.ones(n-1), -1)\nprint(L)`,
        caption: 'Finite-difference Laplacian matrix.'
      }
    ],
    prerequisites: ['diffeq', 'linalg'],
    related: ['scicomp', 'mathphys-pde', 'mathphys-complex'],
    applications: ['mathphys-pde', 'mathphys-fourier', 'scicomp-fem'],
    references: [
      { title: 'Mathematical Methods for Physicists', author: 'Arfken, Weber, Harris', source: 'Academic Press', url: 'https://www.elsevier.com/books/mathematical-methods-for-physicists/arfken/978-0-12-384654-9' }
    ],
    tags: ['mathematical-physics', 'pde', 'complex-analysis', 'fourier']
  },
  {
    id: 'mathphys-pde',
    title: 'Partial Differential Equations',
    domain: 'Mathematical Physics',
    difficulty: 'advanced',
    summary: 'Equations involving partial derivatives that model heat, wave, electrostatic, and fluid phenomena.',
    keyPoints: [
      'Classification: elliptic, parabolic, hyperbolic.',
      'Boundary and initial conditions are required for well-posedness.',
      'Separation of variables and Fourier series give analytical solutions on simple domains.'
    ],
    formulas: [
      '\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u \\quad (\\text{heat})',
      '\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u \\quad (\\text{wave})',
      '\\nabla^2 u = 0 \\quad (\\text{Laplace})'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nN, T = 50, 1000\nu = np.sin(np.linspace(0, np.pi, N))\nalpha = 0.25\nfor _ in range(T):\n    u[1:-1] += alpha * (u[:-2] - 2*u[1:-1] + u[2:])\nprint(u)`,
        caption: 'Explicit scheme for the 1D heat equation.'
      }
    ],
    prerequisites: ['diffeq', 'mathphys', 'linalg-matrices'],
    related: ['mathphys-bvp', 'mathphys-green', 'scicomp-fdm'],
    applications: ['scicomp-fdm', 'scicomp-fem', 'mathphys-fourier'],
    references: [
      { title: 'Partial Differential Equations', author: 'Lawrence Evans', source: 'AMS', url: 'https://bookstore.ams.org/gsm-19-r' }
    ],
    tags: ['pde', 'heat-equation', 'wave-equation', 'laplace']
  },
  {
    id: 'mathphys-complex',
    title: 'Complex Analysis',
    domain: 'Mathematical Physics',
    difficulty: 'advanced',
    summary: 'The study of functions of a complex variable, with powerful tools for integration and series expansion.',
    keyPoints: [
      'Analytic functions satisfy the Cauchy-Riemann equations.',
      'Contour integration and residue theory simplify real integrals.',
      'Conformal mappings preserve angles and solve Laplace equations.'
    ],
    formulas: [
      'f(z) = u(x,y) + i v(x,y)',
      '\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\quad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}',
      '\\text{Res}(f, z_0) = \\frac{1}{2\\pi i} \\oint_C f(z) \\mathrm{d}z'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nN = 1000\nt = np.linspace(0, 2*np.pi, N, endpoint=False)\nz = np.exp(1j * t)\ndz = 1j * z * (2*np.pi / N)\nintegral = np.sum(dz / z)\nprint(integral)`,
        caption: 'Numerical contour integral around the unit circle.'
      }
    ],
    prerequisites: ['mathphys'],
    related: ['mathphys-fourier', 'mathphys-green'],
    applications: ['scicomp-quadrature', 'mathphys-pde'],
    references: [
      { title: 'Complex Analysis', author: 'Lars Ahlfors', source: 'McGraw-Hill', url: 'https://www.mheducation.com/highered/product/M9780070006577.html' }
    ],
    tags: ['complex-analysis', 'analytic', 'residue', 'cauchy']
  },
  {
    id: 'mathphys-fourier',
    title: 'Fourier Analysis',
    domain: 'Mathematical Physics',
    difficulty: 'intermediate',
    summary: 'Decomposing functions into sinusoidal components, central to PDEs, signal processing, and data analysis.',
    keyPoints: [
      'Fourier series represent periodic functions as sums of sines and cosines.',
      'The Fourier transform extends this to non-periodic functions.',
      'FFT computes the discrete transform in O(n log n) time.'
    ],
    formulas: [
      '\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} \\mathrm{d}x',
      'f(x) = \\sum_{n=-\\infty}^{\\infty} c_n e^{i n \\pi x / L}',
      'c_n = \\frac{1}{2L} \\int_{-L}^{L} f(x) e^{-i n \\pi x / L} \\mathrm{d}x'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nx = np.linspace(0, 2*np.pi, 64, endpoint=False)\nsignal = np.sin(3*x) + 0.5*np.cos(5*x)\nspectrum = np.fft.fft(signal)\nprint("Dominant frequencies:", np.argsort(np.abs(spectrum))[-4:])`,
        caption: 'Fast Fourier Transform of a multi-tone signal.'
      }
    ],
    prerequisites: ['mathphys'],
    related: ['mathphys-pde', 'scicomp-fft', 'mathphys-complex'],
    applications: ['scicomp-fft', 'mathphys-pde', 'scicomp-fdm'],
    references: [
      { title: 'Fourier Analysis', author: 'Javier Duoandikoetxea', source: 'AMS', url: 'https://bookstore.ams.org/gsm-29' }
    ],
    tags: ['fourier', 'fft', 'series', 'transform']
  },
  {
    id: 'mathphys-green',
    title: "Green's Functions",
    domain: 'Mathematical Physics',
    difficulty: 'advanced',
    summary: 'Kernels that solve linear differential equations with source terms, generalizing the impulse response.',
    keyPoints: [
      'The Green function represents the response to a point source.',
      'Convolution with the Green function yields the full solution.',
      'Boundary conditions are encoded in the choice of Green function.'
    ],
    formulas: [
      '\\mathcal{L} G(x, x^\\prime) = \\delta(x - x^\\prime)',
      'u(x) = \\int G(x, x^\\prime) f(x^\\prime) \\mathrm{d}x^\\prime',
      'G(x, x^\\prime) = \\sum_n \\frac{\\phi_n(x) \\phi_n(x^\\prime)}{\\lambda_n}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\ndef G(x, xp):\n    return np.where(x < xp, x * (1 - xp), xp * (1 - x))\n\nx = np.linspace(0, 1, 100)\nK = G(x[:, None], x[None, :])\nu = np.trapz(K * 1.0, x, axis=1)\nprint(u[:5])`,
        caption: "Green's function integration for a BVP."
      }
    ],
    prerequisites: ['mathphys-pde', 'mathphys-bvp', 'mathphys-complex'],
    related: ['mathphys-pde', 'mathphys-bvp'],
    applications: ['scicomp-fem', 'mathphys-pde'],
    references: [
      { title: "Green's Functions and Boundary Value Problems", author: 'Ivar Stakgold and Michael Holst', source: 'Wiley', url: 'https://www.wiley.com/en-us/Green%27s+Functions+and+Boundary+Value+Problems%2C+3rd+Edition-p-9780470609705' }
    ],
    tags: ['green-function', 'impulse-response', 'pde', 'kernel']
  },
  {
    id: 'mathphys-bvp',
    title: 'Boundary Value Problems',
    domain: 'Mathematical Physics',
    difficulty: 'advanced',
    summary: 'Differential equations with conditions at multiple points, often solved by shooting, finite differences, or spectral methods.',
    keyPoints: [
      'BVPs may have zero, one, or many solutions.',
      'Finite differences convert BVPs into linear systems.',
      'Spectral methods achieve high accuracy for smooth problems.'
    ],
    formulas: [
      'y^{\\prime\\prime} = f(x, y, y^\\prime), \\quad y(a) = \\alpha, \\; y(b) = \\beta',
      '\\frac{y_{i-1} - 2y_i + y_{i+1}}{h^2} = f(x_i, y_i, \\frac{y_{i+1} - y_{i-1}}{2h})'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import solve_bvp\n\ndef fun(x, y):\n    return [y[1], -2*y[0]]\n\ndef bc(ya, yb):\n    return [ya[0], yb[0] - 1]\n\nx = np.linspace(0, 1, 5)\ny_guess = np.zeros((2, x.size))\nsol = solve_bvp(fun, bc, x, y_guess)`,
        caption: 'Solving a two-point BVP with SciPy.'
      }
    ],
    prerequisites: ['diffeq-ode2', 'mathphys-pde'],
    related: ['mathphys-green', 'scicomp-fdm'],
    applications: ['scicomp-fem', 'mathphys-pde'],
    references: [
      { title: 'Numerical Solution of Boundary Value Problems for ODEs', author: 'Ascher, Mattheij, Russell', source: 'SIAM', url: 'https://epubs.siam.org/doi/book/10.1137/1.9781611971231' }
    ],
    tags: ['bvp', 'boundary-conditions', 'shooting', 'finite-difference']
  },
  {
    id: 'mathphys-special',
    title: 'Special Functions',
    domain: 'Mathematical Physics',
    difficulty: 'advanced',
    summary: 'Named functions arising from separation of variables and boundary value problems, such as Bessel and Legendre functions.',
    keyPoints: [
      'Special functions solve naturally occurring ODEs with non-constant coefficients.',
      'Orthogonality relations support spectral expansions.',
      'Modern libraries provide accurate evaluation and asymptotics.'
    ],
    formulas: [
      'x^2 y^{\\prime\\prime} + x y^\\prime + (x^2 - n^2)y = 0',
      '(1 - x^2) y^{\\prime\\prime} - 2x y^\\prime + n(n+1)y = 0',
      'P_n(x) = \\frac{1}{2^n n!} \\frac{d^n}{dx^n}(x^2 - 1)^n'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.special import jv, eval_legendre\n\nimport numpy as np\nx = np.linspace(0, 10, 200)\nprint(jv(0, x[:5]))\nprint(eval_legendre(5, 0.5))`,
        caption: 'Evaluating Bessel and Legendre functions.'
      }
    ],
    prerequisites: ['mathphys', 'diffeq-ode2'],
    related: ['mathphys-pde', 'mathphys-bvp'],
    applications: ['scicomp-fem', 'mathphys-pde'],
    references: [
      { title: 'Handbook of Mathematical Functions', author: 'Abramowitz and Stegun', source: 'NIST', url: 'https://dlmf.nist.gov/' }
    ],
    tags: ['special-functions', 'bessel', 'legendre', 'orthogonal']
  },
  {
    id: 'scicomp',
    title: 'Scientific Computing',
    domain: 'Scientific Computing',
    difficulty: 'intermediate',
    summary: 'The design and analysis of algorithms for continuous mathematics, simulation, and numerical experimentation.',
    keyPoints: [
      'Balances accuracy, stability, and computational cost.',
      'Core tasks include linear systems, integration, interpolation, and ODE/PDE solvers.',
      'Software ecosystems include NumPy, SciPy, PETSc, and FEniCS.'
    ],
    formulas: [
      '\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\| \\|\\mathbf{A}^{-1}\\|',
      '\\|x - \\hat{x}\\| \\leq \\kappa(A) \\frac{\\|b - A\\hat{x}\\|}{\\|b\\|}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nprint(f"Condition number: {np.linalg.cond(A):.4f}")`,
        caption: 'Condition number as a stability indicator.'
      }
    ],
    prerequisites: ['linalg', 'diffeq'],
    related: ['mathphys', 'hpc'],
    applications: ['scicomp-linear', 'scicomp-fdm', 'scicomp-fem'],
    references: [
      { title: 'Scientific Computing: An Introductory Survey', author: 'Michael Heath', source: 'SIAM', url: 'https://heath.cs.illinois.edu/scicomp/' }
    ],
    tags: ['scientific-computing', 'numerical', 'stability', 'accuracy']
  },
  {
    id: 'scicomp-fdm',
    title: 'Finite Difference Method',
    domain: 'Scientific Computing',
    difficulty: 'intermediate',
    summary: 'Discretizing derivatives on grids to turn differential equations into algebraic systems.',
    keyPoints: [
      'Taylor series motivate difference stencils.',
      'Explicit schemes are simple but may require small time steps.',
      'Implicit schemes are unconditionally stable for parabolic problems.'
    ],
    formulas: [
      'f^\\prime(x) \\approx \\frac{f(x+h) - f(x-h)}{2h}',
      'f^{\\prime\\prime}(x) \\approx \\frac{f(x-h) - 2f(x) + f(x+h)}{h^2}',
      '\\frac{u^{n+1}_i - u^n_i}{\\Delta t} = \\alpha \\frac{u^n_{i-1} - 2u^n_i + u^n_{i+1}}{h^2}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\ndef laplacian(u, dx):\n    return (\n        np.roll(u, 1, axis=0) + np.roll(u, -1, axis=0) +\n        np.roll(u, 1, axis=1) + np.roll(u, -1, axis=1) - 4*u\n    ) / dx**2`,
        caption: 'Five-point Laplacian stencil in 2D.'
      }
    ],
    prerequisites: ['scicomp', 'mathphys-pde', 'diffeq-numerical'],
    related: ['scicomp-fem', 'scicomp-linear'],
    applications: ['mathphys-pde', 'diffeq-stability'],
    references: [
      { title: 'Finite Difference Methods for ODEs and PDEs', author: 'Randall LeVeque', source: 'SIAM', url: 'https://faculty.washington.edu/rjl/fdmbook/' }
    ],
    tags: ['finite-difference', 'discretization', 'stencil', 'pde']
  },
  {
    id: 'scicomp-fem',
    title: 'Finite Element Method',
    domain: 'Scientific Computing',
    difficulty: 'advanced',
    summary: 'A variational approach to PDEs using piecewise basis functions on unstructured meshes.',
    keyPoints: [
      'Weak formulations lower the regularity requirements on solutions.',
      'Triangular and tetrahedral meshes handle complex geometries.',
      'Galerkin projection leads to sparse linear systems.'
    ],
    formulas: [
      '\\int_\\Omega \\nabla u \\cdot \\nabla v \\mathrm{d}x = \\int_\\Omega f v \\mathrm{d}x',
      '\\mathbf{K} \\mathbf{u} = \\mathbf{f}',
      'K_{ij} = \\int_\\Omega \\nabla \\phi_i \\cdot \\nabla \\phi_j \\mathrm{d}x'
    ],
    code: [
      {
        language: 'python',
        content: `# Pseudo-code for FEM assembly\nfor element in mesh.elements:\n    Ke = local_stiffness(element)\n    for i, gi in enumerate(element.dofs):\n        for j, gj in enumerate(element.dofs):\n            K[gi, gj] += Ke[i, j]\n# Then solve K u = f`,
        caption: 'Conceptual FEM stiffness assembly.'
      }
    ],
    prerequisites: ['scicomp', 'mathphys-pde', 'mathphys-bvp'],
    related: ['scicomp-fdm', 'scicomp-linear'],
    applications: ['mathphys-pde', 'hpc-parallel'],
    references: [
      { title: 'The Finite Element Method: Theory, Implementation, and Applications', author: 'Larson and Bengzon', source: 'Springer', url: 'https://link.springer.com/book/10.1007/978-3-642-33287-6' }
    ],
    tags: ['finite-element', 'fem', 'variational', 'mesh']
  },
  {
    id: 'scicomp-interpolation',
    title: 'Interpolation & Approximation',
    domain: 'Scientific Computing',
    difficulty: 'intermediate',
    summary: 'Constructing functions from discrete data, with applications in quadrature, graphics, and machine learning.',
    keyPoints: [
      'Polynomial interpolation can suffer from Runge phenomenon on equally spaced points.',
      'Splines offer smooth piecewise approximations.',
      'Approximation theory guides basis selection and error control.'
    ],
    formulas: [
      'p(x) = \\sum_{i=0}^{n} y_i \\ell_i(x), \\quad \\ell_i(x) = \\prod_{j\\neq i} \\frac{x - x_j}{x_i - x_j}',
      '\\|f - p_n\\|_\\infty \\leq \\frac{\\|f^{(n+1)}\\|_\\infty}{(n+1)!} \\|\\omega\\|_\\infty'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.interpolate import CubicSpline\n\nx = np.linspace(0, 2*np.pi, 10)\ny = np.sin(x)\ncs = CubicSpline(x, y)\nprint(cs(np.pi/4))`,
        caption: 'Cubic spline interpolation.'
      }
    ],
    prerequisites: ['scicomp'],
    related: ['scicomp-quadrature', 'scicomp-fft'],
    applications: ['ml-regression', 'scicomp-fem'],
    references: [
      { title: 'Approximation Theory and Approximation Practice', author: 'Lloyd Trefethen', source: 'SIAM', url: 'https://www.chebfun.org/ATAP/' }
    ],
    tags: ['interpolation', 'spline', 'lagrange', 'approximation']
  },
  {
    id: 'scicomp-quadrature',
    title: 'Numerical Integration',
    domain: 'Scientific Computing',
    difficulty: 'intermediate',
    summary: 'Quadrature rules approximate definite integrals, essential for probability, physics, and machine learning.',
    keyPoints: [
      'Newton-Cotes rules use equally spaced points.',
      'Gaussian quadrature achieves high accuracy with fewer evaluations.',
      'Adaptive quadrature controls error locally.'
    ],
    formulas: [
      '\\int_a^b f(x) \\mathrm{d}x \\approx \\sum_{i=1}^{n} w_i f(x_i)',
      '\\int_{-1}^{1} f(x) \\mathrm{d}x \\approx \\sum_{i=1}^{n} w_i f(x_i)',
      '\\text{Simpson: } \\int_a^b f(x) \\mathrm{d}x \\approx \\frac{b-a}{6}\\left(f(a) + 4f(\\tfrac{a+b}{2}) + f(b)\\right)'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.integrate import quad\n\nresult, error = quad(lambda x: np.exp(-x**2), -np.inf, np.inf)\nprint(f"Integral: {result:.10f}, error estimate: {error:.2e}")`,
        caption: 'Adaptive Gaussian quadrature over the real line.'
      }
    ],
    prerequisites: ['scicomp', 'probstat-expectation'],
    related: ['probstat-montecarlo', 'scicomp-interpolation'],
    applications: ['probstat-mle', 'mathphys-green'],
    references: [
      { title: 'Numerical Recipes', author: 'Press, Teukolsky, Vetterling, Flannery', source: 'Cambridge University Press', url: 'https://numerical.recipes/' }
    ],
    tags: ['quadrature', 'integration', 'gaussian', 'simpson']
  },
  {
    id: 'scicomp-fft',
    title: 'Fast Fourier Transform',
    domain: 'Scientific Computing',
    difficulty: 'intermediate',
    summary: 'An O(n log n) algorithm for computing the discrete Fourier transform and its inverse.',
    keyPoints: [
      'Exploits symmetry and periodicity to reduce complexity.',
      'Enables fast convolution, spectral methods, and signal processing.',
      'Numerical libraries optimize for power-of-two and mixed-radix sizes.'
    ],
    formulas: [
      'X_k = \\sum_{n=0}^{N-1} x_n e^{-2\\pi i k n / N}',
      'x_n = \\frac{1}{N} \\sum_{k=0}^{N-1} X_k e^{2\\pi i k n / N}',
      '\\mathcal{O}(N \\log N)'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\na = np.random.randn(1024)\nb = np.random.randn(1024)\nconv = np.fft.ifft(np.fft.fft(a) * np.fft.fft(b)).real`,
        caption: 'Fast convolution using the FFT.'
      }
    ],
    prerequisites: ['scicomp', 'mathphys-fourier'],
    related: ['mathphys-pde', 'scicomp-fdm'],
    applications: ['mathphys-pde', 'scicomp-fdm', 'scicomp-fem'],
    references: [
      { title: 'Fast Fourier Transform and Its Applications', author: 'E. Oran Brigham', source: 'Prentice Hall', url: 'https://www.pearson.com/en-us/subject-catalog/p/fast-fourier-transform-and-its-applications/P200000005664' }
    ],
    tags: ['fft', 'fourier', 'convolution', 'spectral']
  },
  {
    id: 'scicomp-linear',
    title: 'Direct & Iterative Linear Solvers',
    domain: 'Scientific Computing',
    difficulty: 'advanced',
    summary: 'Algorithms for solving linear systems, ranging from dense factorizations to sparse iterative methods.',
    keyPoints: [
      'Direct solvers (LU, Cholesky) are robust for moderate systems.',
      'Iterative solvers (CG, GMRES) scale to millions of unknowns.',
      'Preconditioners accelerate convergence for ill-conditioned systems.'
    ],
    formulas: [
      '\\mathbf{A}\\mathbf{x} = \\mathbf{b}',
      '\\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k \\mathbf{r}_k',
      '\\text{CG minimizes } \\frac{1}{2}\\mathbf{x}^\\top\\mathbf{A}\\mathbf{x} - \\mathbf{b}^\\top\\mathbf{x}'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.sparse.linalg import cg\nimport scipy.sparse as sp\n\nA = sp.diags([-1, 2, -1], [-1, 0, 1], shape=(100, 100), format='csr')\nb = np.ones(100)\nx, info = cg(A, b, tol=1e-10)\nprint(f"Converged: {info == 0}, residual norm: {np.linalg.norm(A @ x - b):.2e}")`,
        caption: 'Conjugate gradient for a tridiagonal system.'
      }
    ],
    prerequisites: ['scicomp', 'linalg-matrices', 'linalg-decomp'],
    related: ['hpc-parallel', 'scicomp-fdm', 'scicomp-fem'],
    applications: ['scicomp-fdm', 'scicomp-fem', 'mathphys-pde'],
    references: [
      { title: 'Iterative Methods for Sparse Linear Systems', author: 'Yousef Saad', source: 'SIAM', url: 'https://www-users.cs.umn.edu/~saad/IterMethBook_2ndEd.pdf' }
    ],
    tags: ['linear-solver', 'cg', 'gmres', 'preconditioner']
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    domain: 'Machine Learning',
    difficulty: 'beginner',
    summary: 'Algorithms that improve performance on a task through experience, typically by fitting models to data.',
    keyPoints: [
      'Supervised learning predicts labels from labeled examples.',
      'Unsupervised learning finds hidden structure in unlabeled data.',
      'Reinforcement learning optimizes cumulative rewards through interaction.'
    ],
    formulas: [
      '\\hat{y} = f_{\\theta}(x)',
      '\\mathcal{L}(\\theta) = \\frac{1}{n} \\sum_{i=1}^{n} \\ell(f_{\\theta}(x_i), y_i)',
      '\\hat{\\theta} = \\arg\\min_\\theta \\mathcal{L}(\\theta)'
    ],
    code: [
      {
        language: 'python',
        content: `from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)`,
        caption: 'Basic supervised learning with scikit-learn.'
      }
    ],
    prerequisites: ['linalg', 'probstat', 'optimization'],
    related: ['dl', 'scicomp'],
    applications: ['ml-regression', 'ml-clustering', 'dl-mlp'],
    references: [
      { title: 'Pattern Recognition and Machine Learning', author: 'Christopher Bishop', source: 'Springer', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/' }
    ],
    tags: ['machine-learning', 'supervised', 'unsupervised', 'reinforcement']
  },
  {
    id: 'ml-regression',
    title: 'Linear & Logistic Regression',
    domain: 'Machine Learning',
    difficulty: 'beginner',
    summary: 'Linear models for predicting continuous outputs and probabilities via a generalized linear framework.',
    keyPoints: [
      'Linear regression minimizes squared error and has a closed-form solution.',
      'Logistic regression uses the sigmoid to model binary probabilities.',
      'Regularization prevents overfitting and improves generalization.'
    ],
    formulas: [
      '\\hat{\\beta} = (\\mathbf{X}^\\top\\mathbf{X})^{-1} \\mathbf{X}^\\top\\mathbf{y}',
      'p(y=1|x) = \\sigma(\\beta^\\top x) = \\frac{1}{1 + e^{-\\beta^\\top x}}',
      '\\mathcal{L}(\\beta) = -\\sum_i \\left[ y_i \\log p_i + (1-y_i) \\log(1-p_i) \\right]'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nX = np.random.randn(100, 3)\nbeta_true = np.array([1.0, -2.0, 0.5])\ny = X @ beta_true + 0.1 * np.random.randn(100)\nbeta_hat = np.linalg.lstsq(X, y, rcond=None)[0]\nprint(beta_hat)`,
        caption: 'Ordinary least squares in NumPy.'
      }
    ],
    prerequisites: ['ml', 'linalg-matrices', 'probstat-mle'],
    related: ['ml-optimization', 'optimization-grad'],
    applications: ['ml-trees', 'dl-mlp'],
    references: [
      { title: 'The Elements of Statistical Learning', author: 'Hastie, Tibshirani, Friedman', source: 'Springer', url: 'https://hastie.su.domains/ElemStatLearn/' }
    ],
    tags: ['regression', 'linear', 'logistic', 'least-squares']
  },
  {
    id: 'ml-optimization',
    title: 'Training as Optimization',
    domain: 'Machine Learning',
    difficulty: 'intermediate',
    summary: 'Viewing model training as minimizing an empirical risk function over a parameter space.',
    keyPoints: [
      'Loss functions encode the task objective.',
      'Optimization landscapes can be convex, non-convex, or stochastic.',
      'Generalization depends on the gap between empirical and population risk.'
    ],
    formulas: [
      '\\min_\\theta \\frac{1}{n} \\sum_{i=1}^n \\ell(f_\\theta(x_i), y_i) + \\lambda R(\\theta)',
      'R_{\\text{emp}}(\\theta) = \\frac{1}{n} \\sum_{i=1}^n \\ell_i(\\theta)',
      'R_{\\text{pop}}(\\theta) = \\mathbb{E}_{(x,y) \\sim P} \\ell(f_\\theta(x), y)'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\ndef grad_mse(X, y, theta):\n    n = len(y)\n    return (2/n) * X.T @ (X @ theta - y)`,
        caption: 'Gradient of empirical risk.'
      }
    ],
    prerequisites: ['ml', 'optimization-grad'],
    related: ['ml-gradient', 'dl-backprop'],
    applications: ['ml-regression', 'dl-mlp'],
    references: [
      { title: 'Understanding Machine Learning', author: 'Shai Shalev-Shwartz and Shai Ben-David', source: 'Cambridge University Press', url: 'https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/' }
    ],
    tags: ['optimization', 'empirical-risk', 'loss', 'generalization']
  },
  {
    id: 'ml-gradient',
    title: 'Gradient Descent',
    domain: 'Machine Learning',
    difficulty: 'intermediate',
    summary: 'An iterative algorithm that follows the negative gradient to minimize a differentiable objective.',
    keyPoints: [
      'Learning rate controls step size and convergence.',
      'Convex objectives converge to the global minimum under standard conditions.',
      'Momentum and adaptive methods improve practical performance.'
    ],
    formulas: [
      '\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta \\mathcal{L}(\\theta_t)',
      'v_{t+1} = \\beta v_t + (1 - \\beta) \\nabla_\\theta \\mathcal{L}(\\theta_t)',
      '\\theta_{t+1} = \\theta_t - \\eta v_{t+1}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\ndef gradient_descent(X, y, lr=0.01, epochs=1000):\n    theta = np.zeros(X.shape[1])\n    for _ in range(epochs):\n        grad = (2/len(y)) * X.T @ (X @ theta - y)\n        theta -= lr * grad\n    return theta`,
        caption: 'Vanilla gradient descent for least squares.'
      }
    ],
    prerequisites: ['ml-optimization', 'optimization-grad'],
    related: ['optimization-sgd', 'dl-backprop'],
    applications: ['dl-mlp', 'ml-regression'],
    references: [
      { title: 'Optimization Methods for Large-Scale Machine Learning', author: 'Leon Bottou, Frank Curtis, Jorge Nocedal', source: 'SIAM Review', url: 'https://arxiv.org/abs/1606.04838' }
    ],
    tags: ['gradient-descent', 'sgd', 'learning-rate', 'momentum']
  },
  {
    id: 'ml-svm',
    title: 'Support Vector Machines',
    domain: 'Machine Learning',
    difficulty: 'intermediate',
    summary: 'Discriminative classifiers that maximize the margin between classes, extendable via kernels.',
    keyPoints: [
      'The max-margin principle improves generalization.',
      'Kernel trick maps data to high-dimensional spaces implicitly.',
      'The dual problem is a quadratic program with support vectors.'
    ],
    formulas: [
      '\\min_{w,b} \\frac{1}{2}\\|w\\|^2 + C \\sum_i \\max(0, 1 - y_i(w^\\top x_i + b))',
      'K(x, x^\\prime) = \\phi(x)^\\top \\phi(x^\\prime)',
      '\\text{RBF kernel: } K(x, x^\\prime) = \\exp\\left(-\\gamma \\|x - x^\\prime\\|^2\\right)'
    ],
    code: [
      {
        language: 'python',
        content: `from sklearn import svm\n\nclf = svm.SVC(kernel='rbf', C=1.0, gamma='scale')\nclf.fit(X_train, y_train)\nprint(clf.score(X_test, y_test))`,
        caption: 'Training an RBF support vector classifier.'
      }
    ],
    prerequisites: ['ml-regression', 'optimization-convex'],
    related: ['optimization-lagrange', 'ml-trees'],
    applications: ['ml-evaluation', 'dl-mlp'],
    references: [
      { title: 'Support Vector Machines', author: 'Ingo Steinwart and Andreas Christmann', source: 'Springer', url: 'https://link.springer.com/book/10.1007/978-0-387-77242-4' }
    ],
    tags: ['svm', 'kernel', 'margin', 'classification']
  },
  {
    id: 'ml-trees',
    title: 'Decision Trees & Ensembles',
    domain: 'Machine Learning',
    difficulty: 'intermediate',
    summary: 'Hierarchical models that partition feature space, often combined into powerful forests and gradient boosting.',
    keyPoints: [
      'Trees recursively split data to maximize purity or reduce variance.',
      'Random forests average decorrelated trees to reduce variance.',
      'Gradient boosting trains trees sequentially to correct residuals.'
    ],
    formulas: [
      '\\text{Gini}(t) = 1 - \\sum_{k} p_{tk}^2',
      '\\text{IG}(t) = H(t) - \\sum_{j} \\frac{N_j}{N} H(t_j)',
      'F_M(x) = \\sum_{m=1}^M \\gamma_m h_m(x)'
    ],
    code: [
      {
        language: 'python',
        content: `from sklearn.ensemble import RandomForestClassifier\n\nclf = RandomForestClassifier(n_estimators=100, random_state=42)\nclf.fit(X_train, y_train)\nprint(clf.feature_importances_)`,
        caption: 'Random forest feature importance.'
      }
    ],
    prerequisites: ['ml', 'ml-regression'],
    related: ['ml-svm', 'ml-clustering'],
    applications: ['ml-evaluation', 'hpc-distributed'],
    references: [
      { title: 'The Elements of Statistical Learning', author: 'Hastie, Tibshirani, Friedman', source: 'Springer', url: 'https://hastie.su.domains/ElemStatLearn/' }
    ],
    tags: ['decision-tree', 'random-forest', 'boosting', 'ensemble']
  },
  {
    id: 'ml-clustering',
    title: 'Clustering',
    domain: 'Machine Learning',
    difficulty: 'intermediate',
    summary: 'Unsupervised grouping of data points based on similarity, without predefined labels.',
    keyPoints: [
      'K-means partitions data into K spherical clusters.',
      'Hierarchical clustering builds nested cluster structures.',
      'Density-based methods discover clusters of arbitrary shape.'
    ],
    formulas: [
      '\\min_{\\mu, C} \\sum_{i=1}^n \\|x_i - \\mu_{c_i}\\|^2',
      '\\mu_k = \\frac{1}{|C_k|} \\sum_{x \\in C_k} x',
      '\\text{Silhouette}(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}'
    ],
    code: [
      {
        language: 'python',
        content: `from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=3, random_state=42)\nlabels = kmeans.fit_predict(X)\nprint(kmeans.cluster_centers_)`,
        caption: 'K-means clustering with scikit-learn.'
      }
    ],
    prerequisites: ['ml', 'linalg-pca'],
    related: ['ml-trees', 'linalg-pca'],
    applications: ['ml-evaluation', 'dl-mlp'],
    references: [
      { title: 'Pattern Recognition and Machine Learning', author: 'Christopher Bishop', source: 'Springer', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/' }
    ],
    tags: ['clustering', 'k-means', 'unsupervised', 'similarity']
  },
  {
    id: 'ml-evaluation',
    title: 'Model Evaluation',
    domain: 'Machine Learning',
    difficulty: 'intermediate',
    summary: 'Metrics and procedures for assessing how well a learned model generalizes to unseen data.',
    keyPoints: [
      'Cross-validation reduces variance in performance estimates.',
      'Accuracy, precision, recall, F1, and AUC capture different trade-offs.',
      'Bias-variance decomposition explains over- and under-fitting.'
    ],
    formulas: [
      '\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}',
      'F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
      '\\mathbb{E}[\\text{Err}] = \\text{Bias}^2 + \\text{Variance} + \\sigma^2'
    ],
    code: [
      {
        language: 'python',
        content: `from sklearn.model_selection import cross_val_score\n\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV accuracy: {scores.mean():.4f} (+/- {scores.std():.4f})")`,
        caption: 'Cross-validation for performance estimation.'
      }
    ],
    prerequisites: ['ml', 'probstat-hypothesis'],
    related: ['ml-regression', 'ml-trees'],
    applications: ['dl-mlp', 'transformers-bert'],
    references: [
      { title: 'An Introduction to Statistical Learning', author: 'James, Witten, Hastie, Tibshirani', source: 'Springer', url: 'https://www.statlearning.com/' }
    ],
    tags: ['evaluation', 'cross-validation', 'bias-variance', 'metrics']
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    domain: 'Deep Learning',
    difficulty: 'intermediate',
    summary: 'Representation learning with deep neural networks, enabling end-to-end feature extraction from raw data.',
    keyPoints: [
      'Deep networks stack differentiable transformations.',
      'Backpropagation computes gradients efficiently.',
      'Architectures are specialized for data types: CNNs for images, RNNs for sequences, Transformers for text.'
    ],
    formulas: [
      'h^{(l)} = \\sigma(W^{(l)} h^{(l-1)} + b^{(l)})',
      '\\mathcal{L} = \\frac{1}{n} \\sum_i \\ell(y_i, f(x_i; \\theta))',
      '\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\mathcal{L}'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Linear(784, 256),\n    nn.ReLU(),\n    nn.Linear(256, 10)\n)\ncriterion = nn.CrossEntropyLoss()`,
        caption: 'A simple feedforward network in PyTorch.'
      }
    ],
    prerequisites: ['ml', 'linalg', 'optimization'],
    related: ['transformers', 'hpc-gpu'],
    applications: ['dl-mlp', 'dl-convnet', 'dl-recurrent'],
    references: [
      { title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', source: 'MIT Press', url: 'https://www.deeplearningbook.org/' }
    ],
    tags: ['deep-learning', 'neural-network', 'backpropagation', 'representation']
  },
  {
    id: 'dl-mlp',
    title: 'Multilayer Perceptron',
    domain: 'Deep Learning',
    difficulty: 'beginner',
    summary: 'Fully connected feedforward networks that approximate continuous functions given enough hidden units.',
    keyPoints: [
      'Universal approximation theorem justifies expressive power.',
      'Hidden layers introduce non-linearity through activation functions.',
      'Training requires careful initialization and learning rate tuning.'
    ],
    formulas: [
      'y = W^{(L)} \\sigma(\\cdots W^{(2)} \\sigma(W^{(1)} x + b^{(1)}) + b^{(2)} \\cdots) + b^{(L)}',
      '\\sigma(z) = \\max(0, z)',
      '\\frac{\\partial \\mathcal{L}}{\\partial W^{(l)}} = \\delta^{(l)} (h^{(l-1)})^\\top'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(784, 256),\n            nn.ReLU(),\n            nn.Linear(256, 64),\n            nn.ReLU(),\n            nn.Linear(64, 10)\n        )\n    def forward(self, x):\n        return self.net(x)`,
        caption: 'PyTorch implementation of a three-layer MLP.'
      }
    ],
    prerequisites: ['dl', 'linalg-matrices', 'ml-regression'],
    related: ['dl-activation', 'dl-backprop'],
    applications: ['dl-convnet', 'transformers-attention'],
    references: [
      { title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', source: 'MIT Press', url: 'https://www.deeplearningbook.org/' }
    ],
    tags: ['mlp', 'feedforward', 'perceptron', 'fully-connected']
  },
  {
    id: 'dl-backprop',
    title: 'Backpropagation',
    domain: 'Deep Learning',
    difficulty: 'intermediate',
    summary: 'The chain rule applied to computational graphs, enabling efficient gradient computation in deep networks.',
    keyPoints: [
      'Forward pass computes activations and outputs.',
      'Backward pass propagates error gradients from outputs to inputs.',
      'Automatic differentiation libraries handle graph construction and differentiation.'
    ],
    formulas: [
      '\\delta^{(L)} = \\nabla_a \\mathcal{L} \\odot \\sigma^\\prime(z^{(L)})',
      '\\delta^{(l)} = ((W^{(l+1)})^\\top \\delta^{(l+1)}) \\odot \\sigma^\\prime(z^{(l)})',
      '\\frac{\\partial \\mathcal{L}}{\\partial W^{(l)}} = \\delta^{(l)} (a^{(l-1)})^\\top'
    ],
    code: [
      {
        language: 'python',
        content: `import torch\n\nx = torch.randn(4, 784, requires_grad=True)\nW = torch.randn(784, 10, requires_grad=True)\nloss = torch.sum((x @ W - torch.randn(4, 10))**2)\nloss.backward()\nprint(W.grad.shape)`,
        caption: 'Automatic differentiation in PyTorch.'
      }
    ],
    prerequisites: ['dl-mlp', 'ml-gradient'],
    related: ['dl-activation', 'optimization-grad'],
    applications: ['dl-convnet', 'dl-recurrent', 'transformers-attention'],
    references: [
      { title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', source: 'MIT Press', url: 'https://www.deeplearningbook.org/' }
    ],
    tags: ['backpropagation', 'chain-rule', 'autograd', 'gradient']
  },
  {
    id: 'dl-convnet',
    title: 'Convolutional Neural Networks',
    domain: 'Deep Learning',
    difficulty: 'intermediate',
    summary: 'Neural networks that exploit spatial structure through local receptive fields and weight sharing.',
    keyPoints: [
      'Convolution layers detect local patterns regardless of position.',
      'Pooling reduces spatial dimensions and adds translation invariance.',
      'Modern CNNs use residual connections and batch normalization.'
    ],
    formulas: [
      '(f * g)(i, j) = \\sum_{m}\\sum_{n} f(m, n) g(i-m, j-n)',
      'y_{i,j} = \\sum_{k} \\sum_{u,v} W_{u,v}^{(k)} x_{i+u, j+v}^{(k)} + b^{(k)}',
      '\\text{Pooling: } y_{i,j} = \\max_{(u,v) \\in \\mathcal{N}} x_{i+u, j+v}'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn as nn\n\nconv = nn.Sequential(\n    nn.Conv2d(1, 32, kernel_size=3, padding=1),\n    nn.ReLU(),\n    nn.MaxPool2d(2),\n    nn.Conv2d(32, 64, kernel_size=3, padding=1),\n    nn.ReLU(),\n    nn.MaxPool2d(2)\n)`,
        caption: 'Simple CNN feature extractor.'
      }
    ],
    prerequisites: ['dl-mlp', 'dl-backprop'],
    related: ['dl-batchnorm', 'dl-activation'],
    applications: ['dl-recurrent', 'transformers-bert'],
    references: [
      { title: 'Deep Learning for Computer Vision', author: 'Stanford CS231n', source: 'Stanford', url: 'https://cs231n.stanford.edu/' }
    ],
    tags: ['cnn', 'convolution', 'pooling', 'image']
  },
  {
    id: 'dl-recurrent',
    title: 'Recurrent Neural Networks',
    domain: 'Deep Learning',
    difficulty: 'advanced',
    summary: 'Networks with cyclic connections that maintain hidden state, designed for sequential data.',
    keyPoints: [
      'RNNs share parameters across time steps.',
      'Vanishing and exploding gradients limit long-term memory.',
      'LSTMs and GRUs use gating mechanisms to preserve information.'
    ],
    formulas: [
      'h_t = \\sigma(W_{hh} h_{t-1} + W_{xh} x_t + b_h)',
      'y_t = W_{hy} h_t + b_y',
      '\\text{LSTM gates: } f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn as nn\n\nlstm = nn.LSTM(input_size=10, hidden_size=20, num_layers=2, batch_first=True)\noutput, (hn, cn) = lstm(torch.randn(5, 100, 10))`,
        caption: 'PyTorch LSTM for sequence modeling.'
      }
    ],
    prerequisites: ['dl-mlp', 'dl-backprop', 'diffeq'],
    related: ['transformers-attention', 'dl-activation'],
    applications: ['transformers-gpt', 'transformers-bert'],
    references: [
      { title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', source: 'MIT Press', url: 'https://www.deeplearningbook.org/' }
    ],
    tags: ['rnn', 'lstm', 'sequence', 'recurrent']
  },
  {
    id: 'dl-activation',
    title: 'Activation Functions',
    domain: 'Deep Learning',
    difficulty: 'beginner',
    summary: 'Non-linearities that allow neural networks to approximate complex functions and learn rich representations.',
    keyPoints: [
      'ReLU avoids vanishing gradients for positive inputs.',
      'Sigmoid and tanh saturate, limiting gradient flow.',
      'GELU and Swish are smooth alternatives used in modern Transformers.'
    ],
    formulas: [
      '\\text{ReLU}(x) = \\max(0, x)',
      '\\sigma(x) = \\frac{1}{1 + e^{-x}}',
      '\\text{GELU}(x) = x \\Phi(x)'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn.functional as F\n\nx = torch.randn(100)\nprint(F.relu(x)[:5])\nprint(F.gelu(x)[:5])`,
        caption: 'ReLU and GELU activations in PyTorch.'
      }
    ],
    prerequisites: ['dl-mlp'],
    related: ['dl-backprop', 'dl-batchnorm'],
    applications: ['dl-convnet', 'transformers-attention'],
    references: [
      { title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', source: 'MIT Press', url: 'https://www.deeplearningbook.org/' }
    ],
    tags: ['activation', 'relu', 'sigmoid', 'gelu']
  },
  {
    id: 'dl-batchnorm',
    title: 'Batch Normalization',
    domain: 'Deep Learning',
    difficulty: 'intermediate',
    summary: 'Normalizing layer inputs to stabilize training and permit higher learning rates.',
    keyPoints: [
      'Normalizes each feature to zero mean and unit variance over a mini-batch.',
      'Learnable scale and shift recover representational capacity.',
      'Reduces internal covariate shift and acts as a regularizer.'
    ],
    formulas: [
      '\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}',
      'y_i = \\gamma \\hat{x}_i + \\beta',
      '\\mu_B = \\frac{1}{m} \\sum_{i=1}^m x_i'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn as nn\n\nbn = nn.BatchNorm1d(num_features=64)\nout = bn(torch.randn(32, 64))`,
        caption: 'Batch normalization layer in PyTorch.'
      }
    ],
    prerequisites: ['dl-mlp', 'dl-backprop'],
    related: ['dl-regularization', 'dl-activation'],
    applications: ['dl-convnet', 'transformers-bert'],
    references: [
      { title: 'Batch Normalization: Accelerating Deep Network Training', author: 'Ioffe and Szegedy', source: 'ICML 2015', url: 'https://arxiv.org/abs/1502.03167' }
    ],
    tags: ['batch-normalization', 'normalization', 'regularization', 'training']
  },
  {
    id: 'dl-regularization',
    title: 'Regularization',
    domain: 'Deep Learning',
    difficulty: 'intermediate',
    summary: 'Techniques to prevent overfitting and improve generalization in neural networks.',
    keyPoints: [
      'L2 and L1 penalties shrink weights toward zero.',
      'Dropout randomly disables units during training.',
      'Data augmentation and early stopping increase robustness.'
    ],
    formulas: [
      '\\mathcal{L}_{\\text{reg}} = \\mathcal{L} + \\lambda \\sum_{ij} W_{ij}^2',
      '\\text{Dropout: } h_{\\text{drop}} = h \\odot \\frac{m}{1-p}',
      '\\hat{y} = \\mathbb{E}_m [f(x; m, \\theta)]'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.nn as nn\n\nlayer = nn.Sequential(\n    nn.Linear(256, 128),\n    nn.ReLU(),\n    nn.Dropout(p=0.5),\n    nn.Linear(128, 10)\n)`,
        caption: 'Dropout regularization in PyTorch.'
      }
    ],
    prerequisites: ['dl-mlp', 'linalg-norms'],
    related: ['dl-batchnorm', 'ml-evaluation'],
    applications: ['dl-convnet', 'dl-recurrent'],
    references: [
      { title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting', author: 'Srivastava et al.', source: 'JMLR', url: 'https://jmlr.org/papers/v15/srivastava14a.html' }
    ],
    tags: ['regularization', 'dropout', 'l2', 'generalization']
  },
  {
    id: 'transformers',
    title: 'Transformers',
    domain: 'Transformers',
    difficulty: 'advanced',
    summary: 'Deep-learning architectures built on self-attention, dominating natural language processing and beyond.',
    keyPoints: [
      'Self-attention relates every position to every other position in parallel.',
      'No recurrence or convolution is required; attention does the heavy lifting.',
      'Pre-training plus fine-tuning is the dominant paradigm.'
    ],
    formulas: [
      '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V',
      '\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O',
      'FFN(x) = \\max(0, xW_1 + b_1)W_2 + b_2'
    ],
    code: [
      {
        language: 'python',
        content: `import torch\nimport torch.nn.functional as F\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = Q @ K.transpose(-2, -1) / d_k**0.5\n    attn = F.softmax(scores, dim=-1)\n    return attn @ V`,
        caption: 'Core attention computation in PyTorch.'
      }
    ],
    prerequisites: ['dl', 'dl-activation', 'linalg'],
    related: ['dl-recurrent', 'dl-mlp'],
    applications: ['transformers-attention', 'transformers-bert', 'transformers-gpt'],
    references: [
      { title: 'Attention Is All You Need', author: 'Vaswani et al.', source: 'NeurIPS 2017', url: 'https://arxiv.org/abs/1706.03762' }
    ],
    tags: ['transformer', 'attention', 'nlp', 'self-attention']
  },
  {
    id: 'transformers-attention',
    title: 'Self-Attention Mechanism',
    domain: 'Transformers',
    difficulty: 'advanced',
    summary: 'A content-dependent weighting that lets each token attend to all others, capturing long-range dependencies.',
    keyPoints: [
      'Query, Key, and Value projections are learned from input embeddings.',
      'Scaling by sqrt(d_k) prevents softmax saturation.',
      'Attention matrices are interpretable and can reveal syntactic patterns.'
    ],
    formulas: [
      'Q = X W^Q, \\quad K = X W^K, \\quad V = X W^V',
      'A = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)',
      'Z = AV'
    ],
    code: [
      {
        language: 'python',
        content: `import torch\n\nbatch, seq_len, d_model = 2, 10, 64\nX = torch.randn(batch, seq_len, d_model)\nW_q = torch.randn(d_model, d_model)\nW_k = torch.randn(d_model, d_model)\nW_v = torch.randn(d_model, d_model)\n\nQ, K, V = X @ W_q, X @ W_k, X @ W_v\nA = torch.softmax(Q @ K.transpose(-2, -1) / d_model**0.5, dim=-1)\nZ = A @ V`,
        caption: 'Self-attention from scratch with PyTorch.'
      }
    ],
    prerequisites: ['transformers', 'dl-mlp', 'linalg-matrices'],
    related: ['transformers-positional', 'dl-activation'],
    applications: ['transformers-encoder', 'transformers-decoder'],
    references: [
      { title: 'Attention Is All You Need', author: 'Vaswani et al.', source: 'NeurIPS 2017', url: 'https://arxiv.org/abs/1706.03762' }
    ],
    tags: ['self-attention', 'query', 'key', 'value']
  },
  {
    id: 'transformers-encoder',
    title: 'Transformer Encoder',
    domain: 'Transformers',
    difficulty: 'advanced',
    summary: 'Stack of self-attention and feed-forward layers that produces contextualized representations.',
    keyPoints: [
      'Encoders are bidirectional: each token attends to all tokens.',
      'Residual connections and layer normalization stabilize deep stacks.',
      'BERT and its variants are encoder-only models.'
    ],
    formulas: [
      '\\text{SubLayer}(x) = \\text{LayerNorm}(x + \\text{Sublayer}(x))',
      '\\text{Encoder}(x) = \\text{LN}(x + \\text{FFN}(\\text{LN}(x + \\text{Attn}(x))))'
    ],
    code: [
      {
        language: 'python',
        content: `from torch.nn import TransformerEncoderLayer\n\nencoder_layer = TransformerEncoderLayer(\n    d_model=512, nhead=8, dim_feedforward=2048, batch_first=True\n)\nout = encoder_layer(torch.randn(2, 10, 512))`,
        caption: 'PyTorch Transformer encoder layer.'
      }
    ],
    prerequisites: ['transformers-attention', 'dl-batchnorm'],
    related: ['transformers-bert', 'transformers-decoder'],
    applications: ['transformers-bert', 'transformers-gpt'],
    references: [
      { title: 'Attention Is All You Need', author: 'Vaswani et al.', source: 'NeurIPS 2017', url: 'https://arxiv.org/abs/1706.03762' }
    ],
    tags: ['encoder', 'bert', 'bidirectional', 'representation']
  },
  {
    id: 'transformers-decoder',
    title: 'Transformer Decoder',
    domain: 'Transformers',
    difficulty: 'advanced',
    summary: 'Autoregressive stack that generates sequences one token at a time, using masked self-attention.',
    keyPoints: [
      'Masked self-attention prevents attending to future tokens.',
      'Cross-attention integrates encoder outputs into generation.',
      'GPT and decoder-only models power modern generative AI.'
    ],
    formulas: [
      'M_{ij} = \\begin{cases} 0 & i \\geq j \\\\ -\\infty & i < j \\end{cases}',
      '\\text{MaskedAttn}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}} + M\\right)V',
      'p(x_t | x_{<t}) = \\text{softmax}(W_e h_t + b)'
    ],
    code: [
      {
        language: 'python',
        content: `from torch.nn import TransformerDecoderLayer\n\ndecoder_layer = TransformerDecoderLayer(\n    d_model=512, nhead=8, dim_feedforward=2048, batch_first=True\n)\nout = decoder_layer(torch.randn(2, 5, 512), memory=torch.randn(2, 10, 512))`,
        caption: 'PyTorch Transformer decoder layer.'
      }
    ],
    prerequisites: ['transformers-attention', 'transformers-encoder'],
    related: ['transformers-gpt', 'transformers-tokenization'],
    applications: ['transformers-gpt', 'transformers-bert'],
    references: [
      { title: 'Attention Is All You Need', author: 'Vaswani et al.', source: 'NeurIPS 2017', url: 'https://arxiv.org/abs/1706.03762' }
    ],
    tags: ['decoder', 'autoregressive', 'masked-attention', 'generation']
  },
  {
    id: 'transformers-bert',
    title: 'BERT',
    domain: 'Transformers',
    difficulty: 'intermediate',
    summary: 'Bidirectional Encoder Representations from Transformers, pre-trained with masked language modeling.',
    keyPoints: [
      'Pre-trained on large unlabeled text with masked token prediction.',
      'Fine-tuned for classification, question answering, and NER.',
      'Introduced the [CLS] token for sentence-level tasks.'
    ],
    formulas: [
      'P(x_i | \\tilde{x}) = \\text{softmax}(W^T h_i + b)',
      '\\mathcal{L}_{\\text{MLM}} = -\\sum_{i \\in \\mathcal{M}} \\log P(x_i | \\tilde{x})',
      '\\text{NSP loss} = -\\left[ y \\log p + (1-y) \\log(1-p) \\right]'
    ],
    code: [
      {
        language: 'python',
        content: `from transformers import BertTokenizer, BertForSequenceClassification\n\ntokenizer = BertTokenizer.from_pretrained('bert-base-uncased')\nmodel = BertForSequenceClassification.from_pretrained('bert-base-uncased')\ninputs = tokenizer('Hello world', return_tensors='pt')\noutputs = model(**inputs)`,
        caption: 'Loading a pre-trained BERT model.'
      }
    ],
    prerequisites: ['transformers-encoder'],
    related: ['transformers-tokenization', 'transformers-attention'],
    applications: ['transformers-gpt', 'ml-evaluation'],
    references: [
      { title: 'BERT: Pre-training of Deep Bidirectional Transformers', author: 'Devlin et al.', source: 'NAACL 2019', url: 'https://arxiv.org/abs/1810.04805' }
    ],
    tags: ['bert', 'masked-language-model', 'nlp', 'pre-training']
  },
  {
    id: 'transformers-gpt',
    title: 'GPT',
    domain: 'Transformers',
    difficulty: 'advanced',
    summary: 'Generative Pre-trained Transformers that scale decoder-only language modeling to massive corpora.',
    keyPoints: [
      'Trained autoregressively to predict the next token.',
      'Scaling model size and data leads to emergent abilities.',
      'Instruction tuning and RLHF align outputs with human preferences.'
    ],
    formulas: [
      '\\mathcal{L} = -\\sum_t \\log P(x_t | x_{<t}; \\theta)',
      '\\text{RLHF: } \\max_\\theta \\mathbb{E}_{x \\sim D} \\left[ r_\\phi(x, y) - \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)} \\right]'
    ],
    code: [
      {
        language: 'python',
        content: `from transformers import GPT2Tokenizer, GPT2LMHeadModel\n\ntokenizer = GPT2Tokenizer.from_pretrained('gpt2')\nmodel = GPT2LMHeadModel.from_pretrained('gpt2')\ninputs = tokenizer('The future of AI is', return_tensors='pt')\noutputs = model.generate(**inputs, max_length=20)\nprint(tokenizer.decode(outputs[0]))`,
        caption: 'Text generation with GPT-2.'
      }
    ],
    prerequisites: ['transformers-decoder'],
    related: ['transformers-tokenization', 'hpc-distributed'],
    applications: ['transformers-bert', 'transformers-attention'],
    references: [
      { title: 'Language Models are Few-Shot Learners', author: 'Brown et al.', source: 'NeurIPS 2020', url: 'https://arxiv.org/abs/2005.14165' }
    ],
    tags: ['gpt', 'generative', 'language-model', 'rlhf']
  },
  {
    id: 'transformers-positional',
    title: 'Positional Encoding',
    domain: 'Transformers',
    difficulty: 'intermediate',
    summary: 'Injecting order information into token embeddings since self-attention is permutation-invariant.',
    keyPoints: [
      'Sinusoidal encodings encode position with varying wavelengths.',
      'Learned positional embeddings are an alternative.',
      'Rotary embeddings (RoPE) encode relative positions in attention scores.'
    ],
    formulas: [
      'PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)',
      'PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)',
      'RoPE: q_m^T k_n = (R_{\\Theta, m} x_m)^T (R_{\\Theta, n} x_n)'
    ],
    code: [
      {
        language: 'python',
        content: `import torch\nimport math\n\ndef positional_encoding(seq_len, d_model):\n    pos = torch.arange(seq_len).unsqueeze(1).float()\n    div = torch.exp(torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model))\n    pe = torch.zeros(seq_len, d_model)\n    pe[:, 0::2] = torch.sin(pos * div)\n    pe[:, 1::2] = torch.cos(pos * div)\n    return pe`,
        caption: 'Sinusoidal positional encoding.'
      }
    ],
    prerequisites: ['transformers', 'linalg-vectors'],
    related: ['transformers-attention', 'transformers-encoder'],
    applications: ['transformers-bert', 'transformers-gpt'],
    references: [
      { title: 'Attention Is All You Need', author: 'Vaswani et al.', source: 'NeurIPS 2017', url: 'https://arxiv.org/abs/1706.03762' }
    ],
    tags: ['positional-encoding', 'sinusoidal', 'rope', 'order']
  },
  {
    id: 'transformers-tokenization',
    title: 'Tokenization',
    domain: 'Transformers',
    difficulty: 'beginner',
    summary: 'Splitting text into subword units that balance vocabulary size and out-of-vocabulary handling.',
    keyPoints: [
      'WordPiece, BPE, and SentencePiece are common subword algorithms.',
      'Subword tokenization handles rare and compound words gracefully.',
      'Tokenization strategy affects model vocabulary and downstream performance.'
    ],
    formulas: [
      '\\text{BPE merge: } (p_1, p_2) = \\arg\\max_{(p_i, p_j)} \\text{count}(p_i, p_j)',
      'P(x) = \\prod_{i=1}^{n} P(x_i | x_{<i})'
    ],
    code: [
      {
        language: 'python',
        content: `from transformers import BertTokenizer\n\ntokenizer = BertTokenizer.from_pretrained('bert-base-uncased')\nprint(tokenizer.tokenize('tokenization'))  # ['token', '##ization']`,
        caption: 'Subword tokenization with BERT tokenizer.'
      }
    ],
    prerequisites: ['transformers'],
    related: ['transformers-bert', 'transformers-gpt'],
    applications: ['transformers-encoder', 'transformers-decoder'],
    references: [
      { title: 'Neural Machine Translation of Rare Words with Subword Units', author: 'Sennrich et al.', source: 'ACL 2016', url: 'https://arxiv.org/abs/1508.07909' }
    ],
    tags: ['tokenization', 'bpe', 'wordpiece', 'subword']
  },
  {
    id: 'optimization',
    title: 'Optimization',
    domain: 'Optimization',
    difficulty: 'intermediate',
    summary: 'The science of selecting the best element from a set of alternatives, typically minimizing cost or maximizing utility.',
    keyPoints: [
      'Optimization problems consist of an objective, variables, and constraints.',
      'Convex problems have a unique global optimum and efficient algorithms.',
      'Non-convex and discrete optimization require specialized methods.'
    ],
    formulas: [
      '\\min_{x \\in \\mathcal{X}} f(x)',
      '\\text{s.t. } g_i(x) \\leq 0, \\; h_j(x) = 0',
      '\\nabla f(x^*) = 0 \\quad (\\text{unconstrained optimum})'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.optimize import minimize\n\nres = minimize(lambda x: x[0]**2 + x[1]**2, x0=[1, 1])\nprint(res.x)`,
        caption: 'Unconstrained minimization with SciPy.'
      }
    ],
    prerequisites: ['linalg', 'probstat'],
    related: ['ml', 'dl', 'hpc'],
    applications: ['optimization-grad', 'optimization-convex', 'optimization-linprog'],
    references: [
      { title: 'Convex Optimization', author: 'Stephen Boyd and Lieven Vandenberghe', source: 'Cambridge University Press', url: 'https://web.stanford.edu/~boyd/cvxbook/' }
    ],
    tags: ['optimization', 'objective', 'constraints', 'convex']
  },
  {
    id: 'optimization-convex',
    title: 'Convex Optimization',
    domain: 'Optimization',
    difficulty: 'advanced',
    summary: 'Optimization over convex sets with convex objectives, where local optima are global and duality is rich.',
    keyPoints: [
      'Convex functions have epigraphs that are convex sets.',
      'Linear, quadratic, and semidefinite programs are convex.',
      'Interior-point and first-order methods solve large-scale convex problems.'
    ],
    formulas: [
      'f(\\theta x + (1-\\theta) y) \\leq \\theta f(x) + (1-\\theta) f(y)',
      '\\min_x \\frac{1}{2} x^\\top P x + q^\\top x + r \\quad \\text{s.t. } Gx \\leq h, \\; Ax = b',
      '\\mathcal{L}(x, \\lambda, \\nu) = f(x) + \\lambda^\\top g(x) + \\nu^\\top h(x)'
    ],
    code: [
      {
        language: 'python',
        content: `import cvxpy as cp\n\nx = cp.Variable(2)\nobj = cp.Minimize(cp.sum_squares(x - [1, 2]))\nprob = cp.Problem(obj, [x >= 0])\nprob.solve()\nprint(x.value)`,
        caption: 'Convex least-squares with CVXPY.'
      }
    ],
    prerequisites: ['optimization', 'linalg-matrices'],
    related: ['optimization-lagrange', 'optimization-linprog'],
    applications: ['ml-svm', 'optimization-grad'],
    references: [
      { title: 'Convex Optimization', author: 'Stephen Boyd and Lieven Vandenberghe', source: 'Cambridge University Press', url: 'https://web.stanford.edu/~boyd/cvxbook/' }
    ],
    tags: ['convex', 'cvxpy', 'duality', 'sdp']
  },
  {
    id: 'optimization-grad',
    title: 'Gradient-Based Methods',
    domain: 'Optimization',
    difficulty: 'intermediate',
    summary: 'Iterative methods that use first-order information to navigate the objective landscape.',
    keyPoints: [
      'Gradient descent moves in the direction of steepest decrease.',
      'Adaptive methods (Adam, RMSprop) scale per-parameter learning rates.',
      'Convergence rates depend on smoothness and convexity.'
    ],
    formulas: [
      'x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)',
      'm_{k+1} = \\beta_1 m_k + (1 - \\beta_1) g_k',
      'v_{k+1} = \\beta_2 v_k + (1 - \\beta_2) g_k^2',
      'x_{k+1} = x_k - \\alpha \\frac{m_{k+1}}{\\sqrt{v_{k+1}} + \\epsilon}'
    ],
    code: [
      {
        language: 'python',
        content: `import torch\n\nx = torch.tensor([2.0, 3.0], requires_grad=True)\noptimizer = torch.optim.Adam([x], lr=0.1)\nfor _ in range(100):\n    loss = (x[0] - 1)**2 + (x[1] + 2)**2\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\nprint(x)`,
        caption: 'Adam optimizer in PyTorch.'
      }
    ],
    prerequisites: ['optimization', 'linalg-vectors'],
    related: ['optimization-sgd', 'ml-gradient', 'optimization-newton'],
    applications: ['dl-backprop', 'ml-gradient'],
    references: [
      { title: 'Optimization Methods for Large-Scale Machine Learning', author: 'Bottou, Curtis, Nocedal', source: 'SIAM Review', url: 'https://arxiv.org/abs/1606.04838' }
    ],
    tags: ['gradient-descent', 'adam', 'first-order', 'optimizer']
  },
  {
    id: 'optimization-newton',
    title: 'Newton & Quasi-Newton Methods',
    domain: 'Optimization',
    difficulty: 'advanced',
    summary: 'Second-order methods that use curvature to achieve faster convergence near optima.',
    keyPoints: [
      'Newton method uses the Hessian inverse to normalize curvature.',
      'Quasi-Newton methods (BFGS, L-BFGS) approximate the Hessian.',
      'Trust regions handle non-convexity and indefinite Hessians.'
    ],
    formulas: [
      'x_{k+1} = x_k - [\\nabla^2 f(x_k)]^{-1} \\nabla f(x_k)',
      '\\min_{p} m_k(p) = f_k + g_k^\\top p + \\frac{1}{2} p^\\top B_k p',
      'B_{k+1} = B_k - \\frac{B_k s_k s_k^\\top B_k}{s_k^\\top B_k s_k} + \\frac{y_k y_k^\\top}{y_k^\\top s_k}'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.optimize import minimize\n\ndef rosen(x):\n    return (1 - x[0])**2 + 100*(x[1] - x[0]**2)**2\n\nres = minimize(rosen, x0=[-1, 2], method='BFGS')\nprint(res.x)`,
        caption: 'BFGS optimization of the Rosenbrock function.'
      }
    ],
    prerequisites: ['optimization-grad', 'linalg-matrices'],
    related: ['optimization-convex', 'optimization-lagrange'],
    applications: ['ml-optimization', 'optimization-sgd'],
    references: [
      { title: 'Numerical Optimization', author: 'Nocedal and Wright', source: 'Springer', url: 'https://www.springer.com/gp/book/9780387303031' }
    ],
    tags: ['newton', 'bfgs', 'hessian', 'quasi-newton']
  },
  {
    id: 'optimization-lagrange',
    title: 'Lagrange Multipliers',
    domain: 'Optimization',
    difficulty: 'intermediate',
    summary: 'A method for finding extrema of a function subject to equality constraints by introducing dual variables.',
    keyPoints: [
      'The Lagrangian combines objective and constraints.',
      'Stationary conditions yield the KKT conditions for inequality constraints.',
      'Dual problems often have structure that accelerates solution.'
    ],
    formulas: [
      '\\mathcal{L}(x, \\lambda) = f(x) - \\lambda^\\top h(x)',
      '\\nabla_x \\mathcal{L} = 0, \\quad \\nabla_\\lambda \\mathcal{L} = 0',
      'g(x) \\leq 0, \\quad \\lambda \\geq 0, \\quad \\lambda \\odot g(x) = 0'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.optimize import minimize\n\n# Minimize x^2 + y^2 subject to x + y = 1\ncons = {'type': 'eq', 'fun': lambda z: z[0] + z[1] - 1}\nres = minimize(lambda z: z[0]**2 + z[1]**2, x0=[0, 0], constraints=cons)\nprint(res.x)`,
        caption: 'Equality-constrained minimization with SciPy.'
      }
    ],
    prerequisites: ['optimization', 'linalg-vectors'],
    related: ['optimization-convex', 'ml-svm'],
    applications: ['ml-svm', 'optimization-convex'],
    references: [
      { title: 'Convex Optimization', author: 'Stephen Boyd and Lieven Vandenberghe', source: 'Cambridge University Press', url: 'https://web.stanford.edu/~boyd/cvxbook/' }
    ],
    tags: ['lagrange', 'kkt', 'constraints', 'duality']
  },
  {
    id: 'optimization-linprog',
    title: 'Linear Programming',
    domain: 'Optimization',
    difficulty: 'intermediate',
    summary: 'Optimization of a linear objective subject to linear constraints, solvable by the simplex or interior-point methods.',
    keyPoints: [
      'LPs have a polyhedral feasible region.',
      'The simplex method walks along vertices of the feasible polytope.',
      'Interior-point methods solve LPs in polynomial time.'
    ],
    formulas: [
      '\\min_x c^\\top x \\quad \\text{s.t. } Ax \\leq b, \\; x \\geq 0',
      '\\max_\\lambda b^\\top \\lambda \\quad \\text{s.t. } A^\\top \\lambda \\leq c, \\; \\lambda \\geq 0',
      'x_i \\geq 0, \\; \\lambda_j \\geq 0'
    ],
    code: [
      {
        language: 'python',
        content: `from scipy.optimize import linprog\n\nres = linprog(c=[-1, -2], A_ub=[[1, 1]], b_ub=[4], bounds=[(0, None), (0, None)])\nprint(res.x)`,
        caption: 'Linear programming with SciPy.'
      }
    ],
    prerequisites: ['optimization', 'linalg-matrices'],
    related: ['optimization-convex', 'optimization-lagrange'],
    applications: ['optimization-sgd', 'hpc-distributed'],
    references: [
      { title: 'Introduction to Linear Optimization', author: 'Dimitris Bertsimas and John Tsitsiklis', source: 'Athena Scientific', url: 'https://www.athenasc.com/linoptbook.html' }
    ],
    tags: ['linear-programming', 'simplex', 'interior-point', 'lp']
  },
  {
    id: 'optimization-sgd',
    title: 'Stochastic Gradient Descent',
    domain: 'Optimization',
    difficulty: 'intermediate',
    summary: 'A stochastic approximation of gradient descent that uses a single example or mini-batch per update.',
    keyPoints: [
      'Reduces per-iteration cost from O(n) to O(b).',
      'Noisy gradients can escape shallow local minima.',
      'Learning rate schedules and variance reduction improve convergence.'
    ],
    formulas: [
      '\\theta_{t+1} = \\theta_t - \\eta_t \\nabla_\\theta \\ell(f_\\theta(x_{i_t}), y_{i_t})',
      'g_t = \\frac{1}{b} \\sum_{i \\in \\mathcal{B}_t} \\nabla_\\theta \\ell_i(\\theta_t)',
      '\\mathbb{E}[g_t] = \\nabla \\mathcal{L}(\\theta_t)'
    ],
    code: [
      {
        language: 'python',
        content: `from torch.utils.data import DataLoader, TensorDataset\n\nloader = DataLoader(TensorDataset(X, y), batch_size=32, shuffle=True)\nfor epoch in range(10):\n    for xb, yb in loader:\n        optimizer.zero_grad()\n        loss = criterion(model(xb), yb)\n        loss.backward()\n        optimizer.step()`,
        caption: 'Mini-batch stochastic gradient descent in PyTorch.'
      }
    ],
    prerequisites: ['optimization-grad', 'ml-gradient'],
    related: ['ml-optimization', 'dl-backprop'],
    applications: ['dl-mlp', 'ml-gradient'],
    references: [
      { title: 'Stochastic Gradient Descent Tricks', author: 'Leon Bottou', source: 'Neural Networks: Tricks of the Trade', url: 'https://leon.bottou.org/publications/pdf/tricks-2012.pdf' }
    ],
    tags: ['sgd', 'stochastic', 'mini-batch', 'learning-rate']
  },
  {
    id: 'algoopt',
    title: 'Algorithm Optimization',
    domain: 'Algorithm Optimization',
    difficulty: 'intermediate',
    summary: 'The craft of designing and tuning algorithms to reduce time, space, or energy consumption.',
    keyPoints: [
      'Asymptotic analysis predicts scaling behavior.',
      'Algorithmic choices interact with hardware and data layout.',
      'Optimized algorithms are essential for HPC, ML, and big data.'
    ],
    formulas: [
      'T(n) = \\mathcal{O}(f(n))',
      'T(n) \\leq c \\cdot f(n) \\quad \\text{for } n \\geq n_0',
      'S(n) = \\Theta(g(n))'
    ],
    code: [
      {
        language: 'python',
        content: `import time\n\n# Compare linear scan vs. binary search\ndef linear_search(arr, x):\n    return x in arr\n\ndef binary_search(arr, x):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == x: return True\n        elif arr[mid] < x: lo = mid + 1\n        else: hi = mid - 1\n    return False`,
        caption: 'Comparing search algorithms.'
      }
    ],
    prerequisites: ['linalg', 'optimization'],
    related: ['hpc', 'scicomp'],
    applications: ['algoopt-dp', 'algoopt-graph', 'algoopt-cache'],
    references: [
      { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', source: 'MIT Press', url: 'https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition' }
    ],
    tags: ['algorithm', 'complexity', 'optimization', 'big-o']
  },
  {
    id: 'algoopt-complexity',
    title: 'Time & Space Complexity',
    domain: 'Algorithm Optimization',
    difficulty: 'beginner',
    summary: 'Big-O notation and asymptotic analysis for characterizing algorithmic resource usage.',
    keyPoints: [
      'Big-O describes an upper bound on growth rate.',
      'Theta and Omega give tight and lower bounds.',
      'Space complexity tracks memory usage beyond input storage.'
    ],
    formulas: [
      '\\mathcal{O}(f(n)) = \\{ g(n) : \\exists c, n_0 \\text{ s.t. } 0 \\leq g(n) \\leq c f(n) \\forall n \\geq n_0 \\}',
      'T_{\\text{best}} \\leq T_{\\text{avg}} \\leq T_{\\text{worst}}',
      '\\log n \\prec n \\prec n \\log n \\prec n^2 \\prec 2^n'
    ],
    code: [
      {
        language: 'python',
        content: `def fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# This is O(2^n) time; use dynamic programming for O(n).`,
        caption: 'Recursive Fibonacci with exponential time complexity.'
      }
    ],
    prerequisites: ['algoopt'],
    related: ['algoopt-dp', 'algoopt-greedy'],
    applications: ['algoopt-graph', 'algoopt-parallel'],
    references: [
      { title: 'Introduction to Algorithms', author: 'Cormen et al.', source: 'MIT Press', url: 'https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition' }
    ],
    tags: ['big-o', 'complexity', 'asymptotic', 'analysis']
  },
  {
    id: 'algoopt-dp',
    title: 'Dynamic Programming',
    domain: 'Algorithm Optimization',
    difficulty: 'intermediate',
    summary: 'Solving complex problems by breaking them into overlapping subproblems and storing intermediate results.',
    keyPoints: [
      'Optimal substructure means optimal solutions contain optimal subsolutions.',
      'Memoization and tabulation are the two implementation styles.',
      'DP often reduces exponential time to polynomial time.'
    ],
    formulas: [
      'F(n) = F(n-1) + F(n-2)',
      'dp[i] = \\max(dp[i-1], dp[i-2] + value[i])',
      '\\text{optimal substructure: } \\text{opt}(S) = f(\\text{opt}(S_1), \\dots, \\text{opt}(S_k))'
    ],
    code: [
      {
        language: 'python',
        content: `def fib_dp(n):\n    if n <= 1: return n\n    dp = [0, 1]\n    for i in range(2, n + 1):\n        dp.append(dp[-1] + dp[-2])\n    return dp[n]`,
        caption: 'Fibonacci via dynamic programming.'
      }
    ],
    prerequisites: ['algoopt', 'algoopt-complexity'],
    related: ['algoopt-greedy', 'algoopt-graph'],
    applications: ['algoopt-cache', 'algoopt-parallel'],
    references: [
      { title: 'Introduction to Algorithms', author: 'Cormen et al.', source: 'MIT Press', url: 'https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition' }
    ],
    tags: ['dynamic-programming', 'memoization', 'tabulation', 'subproblem']
  },
  {
    id: 'algoopt-greedy',
    title: 'Greedy Algorithms',
    domain: 'Algorithm Optimization',
    difficulty: 'intermediate',
    summary: 'Algorithms that make locally optimal choices at each step, hoping to find a global optimum.',
    keyPoints: [
      'Greedy algorithms are simple and often fast.',
      'Correctness requires a matroid or exchange argument.',
      'Examples include Dijkstra, Huffman coding, and Kruskal.'
    ],
    formulas: [
      '\\text{Choose } a^* = \\arg\\min_{a \\in \\text{feasible}} \\text{cost}(S \\cup \\{a\\})',
      '\\text{Greedy stays ahead: } \\text{cost}_i \\leq \\text{opt}_i',
      '\\text{Exchange argument: replace an optimal choice with the greedy choice}'
    ],
    code: [
      {
        language: 'python',
        content: `import heapq\n\ndef dijkstra(graph, start):\n    dist = {v: float('inf') for v in graph}\n    dist[start] = 0\n    pq = [(0, start)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist`,
        caption: 'Dijkstra shortest path algorithm.'
      }
    ],
    prerequisites: ['algoopt', 'algoopt-complexity'],
    related: ['algoopt-graph', 'algoopt-dp'],
    applications: ['algoopt-graph', 'hpc-parallel'],
    references: [
      { title: 'Algorithm Design', author: 'Kleinberg and Tardos', source: 'Pearson', url: 'https://www.cs.cornell.edu/home/kleinber/networks-book/' }
    ],
    tags: ['greedy', 'dijkstra', 'huffman', 'kruskal']
  },
  {
    id: 'algoopt-graph',
    title: 'Graph Algorithms',
    domain: 'Algorithm Optimization',
    difficulty: 'intermediate',
    summary: 'Algorithms for traversing, searching, and optimizing over graph-structured data.',
    keyPoints: [
      'BFS and DFS explore graphs in breadth-first and depth-first order.',
      'Shortest path and minimum spanning tree are classic problems.',
      'Flow algorithms solve network routing and matching problems.'
    ],
    formulas: [
      'd[v] = \\min(d[v], d[u] + w(u,v))',
      '\\sum_{e \\in T} w(e) \\text{ is minimized for MST } T',
      '\\max \\sum f(u,v) \\quad \\text{s.t. capacity and conservation constraints}'
    ],
    code: [
      {
        language: 'python',
        content: `from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    while queue:\n        u = queue.popleft()\n        for v in graph[u]:\n            if v not in visited:\n                visited.add(v)\n                queue.append(v)\n    return visited`,
        caption: 'Breadth-first search traversal.'
      }
    ],
    prerequisites: ['algoopt', 'algoopt-complexity'],
    related: ['algoopt-greedy', 'algoopt-dp'],
    applications: ['hpc-parallel', 'algoopt-cache'],
    references: [
      { title: 'Introduction to Algorithms', author: 'Cormen et al.', source: 'MIT Press', url: 'https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition' }
    ],
    tags: ['graph', 'bfs', 'dfs', 'shortest-path', 'mst']
  },
  {
    id: 'algoopt-parallel',
    title: 'Parallel Algorithms',
    domain: 'Algorithm Optimization',
    difficulty: 'advanced',
    summary: 'Algorithms designed to run on multiple processors simultaneously, exposing parallelism and managing synchronization.',
    keyPoints: [
      'Amdahl and Gustafson laws quantify parallel speedup.',
      'Work-span models capture theoretical parallel complexity.',
      'Data dependency and load balancing limit achievable speedup.'
    ],
    formulas: [
      'S_{\\text{latency}}(p) = \\frac{1}{(1-f) + f/p}',
      'S_{\\text{speedup}} = \\frac{T_1}{T_p}',
      'T_\\infty = \\text{critical path length}, \\quad T_1 = \\text{total work}'
    ],
    code: [
      {
        language: 'c',
        content: `#pragma omp parallel for\nfor (int i = 0; i < N; i++) {\n    c[i] = a[i] + b[i];\n}`,
        caption: 'OpenMP parallel vector addition.'
      }
    ],
    prerequisites: ['algoopt', 'hpc-parallel'],
    related: ['hpc-mpi', 'hpc-openmp'],
    applications: ['hpc-parallel', 'hpc-distributed'],
    references: [
      { title: 'Introduction to Parallel Algorithms', author: 'Joseph JaJa', source: 'Addison-Wesley', url: 'https://www.pearson.com/en-us/subject-catalog/p/introduction-to-parallel-algorithms/P200000005795' }
    ],
    tags: ['parallel', 'speedup', 'amdahl', 'work-span']
  },
  {
    id: 'algoopt-cache',
    title: 'Cache-Efficient Algorithms',
    domain: 'Algorithm Optimization',
    difficulty: 'advanced',
    summary: 'Algorithms tuned to exploit memory hierarchy, minimizing cache misses and maximizing data reuse.',
    keyPoints: [
      'Temporal locality reuses data while it remains in cache.',
      'Spatial locality accesses contiguous memory locations.',
      'Tiling and blocking improve cache utilization for matrix and stencil operations.'
    ],
    formulas: [
      '\\text{Cache misses} \\approx \\frac{\\text{data volume}}{\\text{cache line size}}',
      '\\text{Arithmetic intensity} = \\frac{\\text{flops}}{\\text{bytes transferred}}',
      'T_{\\text{total}} = T_{\\text{compute}} + T_{\\text{memory}}'
    ],
    code: [
      {
        language: 'c',
        content: `// Tiled matrix multiplication\nfor (int ii = 0; ii < N; ii += B)\n  for (int jj = 0; jj < N; jj += B)\n    for (int kk = 0; kk < N; kk += B)\n      for (int i = ii; i < min(ii+B, N); i++)\n        for (int j = jj; j < min(jj+B, N); j++)\n          for (int k = kk; k < min(kk+B, N); k++)\n            C[i][j] += A[i][k] * B[k][j];`,
        caption: 'Blocked matrix multiplication for cache reuse.'
      }
    ],
    prerequisites: ['algoopt', 'hpc'],
    related: ['hpc-gpu', 'hpc-parallel'],
    applications: ['scicomp-linear', 'hpc-gpu'],
    references: [
      { title: 'Cache-Oblivious Algorithms and Data Structures', author: 'Erik Demaine', source: 'Lecture Notes', url: 'https://erikdemaine.org/papers/BRICS2002/' }
    ],
    tags: ['cache', 'locality', 'tiling', 'memory-hierarchy']
  },
  {
    id: 'hpc',
    title: 'High-Performance Computing',
    domain: 'HPC',
    difficulty: 'intermediate',
    summary: 'The practice of using supercomputers, parallel clusters, and accelerators to solve large computational problems.',
    keyPoints: [
      'HPC combines hardware, algorithms, and software for maximum throughput.',
      'Performance is measured in FLOPS, bandwidth, and efficiency.',
      'Scalability is limited by communication, memory, and serial bottlenecks.'
    ],
    formulas: [
      '\\text{Speedup} = \\frac{T_1}{T_p}',
      '\\text{Efficiency} = \\frac{\\text{Speedup}}{p}',
      '\\text{FLOPS} = \\frac{\\text{number of floating point operations}}{\\text{time}}'
    ],
    code: [
      {
        language: 'python',
        content: `import numpy as np\n\nA = np.random.randn(2000, 2000)\nB = np.random.randn(2000, 2000)\n%timeit A @ B  # Uses optimized BLAS under the hood`,
        caption: 'High-performance matrix multiplication via NumPy/BLAS.'
      }
    ],
    prerequisites: ['linalg', 'scicomp', 'algoopt'],
    related: ['hpc-parallel', 'hpc-mpi', 'hpc-openmp', 'hpc-gpu'],
    applications: ['scicomp-linear', 'hpc-distributed', 'hpc-cuda'],
    references: [
      { title: 'Introduction to High-Performance Scientific Computing', author: 'Victor Eijkhout', source: 'Lulu', url: 'https://pages.tacc.utexas.edu/~eijkhout/istc/istc.html' }
    ],
    tags: ['hpc', 'supercomputing', 'parallel', 'performance']
  },
  {
    id: 'hpc-parallel',
    title: 'Parallel Computing',
    domain: 'HPC',
    difficulty: 'intermediate',
    summary: 'Simultaneous execution of computations across multiple processing units to reduce wall-clock time.',
    keyPoints: [
      'Data parallelism distributes data across workers.',
      'Task parallelism decomposes work by function or workflow.',
      'Synchronization and communication overheads must be minimized.'
    ],
    formulas: [
      'T_p = \\frac{T_1}{p} + T_{\\text{overhead}}',
      '\\text{Efficiency} = \\frac{T_1}{p T_p}',
      '\\text{Strong scaling: fixed problem, more workers}'
    ],
    code: [
      {
        language: 'python',
        content: `from multiprocessing import Pool\n\ndef square(x):\n    return x * x\n\nwith Pool(4) as p:\n    results = p.map(square, range(1000))`,
        caption: 'Data parallelism with Python multiprocessing.'
      }
    ],
    prerequisites: ['hpc'],
    related: ['hpc-mpi', 'hpc-openmp', 'algoopt-parallel'],
    applications: ['hpc-distributed', 'scicomp-linear'],
    references: [
      { title: 'Parallel Programming in MPI and OpenMP', author: 'Victor Eijkhout', source: 'Lulu', url: 'https://pages.tacc.utexas.edu/~eijkhout/parprogbook/parprogbook.html' }
    ],
    tags: ['parallel', 'data-parallelism', 'task-parallelism', 'scaling']
  },
  {
    id: 'hpc-mpi',
    title: 'Message Passing Interface (MPI)',
    domain: 'HPC',
    difficulty: 'advanced',
    summary: 'A standardized library for distributed-memory parallel programming, widely used in scientific computing.',
    keyPoints: [
      'MPI programs run as multiple processes that communicate via messages.',
      'Collective operations (broadcast, reduce, gather) are highly optimized.',
      'Domain decomposition maps data onto distributed processes.'
    ],
    formulas: [
      'y = \\sum_{i=0}^{p-1} x_i \\quad \\text{(MPI_Allreduce)}',
      'T_{\\text{comm}} = \\alpha + \\beta n',
      '\\text{Speedup} = \\frac{T_1}{T_p} \\approx \\frac{1}{\\frac{f}{p} + (1-f) + \\frac{T_{\\text{comm}}}{T_1}}'
    ],
    code: [
      {
        language: 'c',
        content: `#include <mpi.h>\n\nint main(int argc, char** argv) {\n    MPI_Init(&argc, &argv);\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n    int local = rank;\n    int total;\n    MPI_Reduce(&local, &total, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);\n    MPI_Finalize();\n    return 0;\n}`,
        caption: 'MPI reduce example in C.'
      }
    ],
    prerequisites: ['hpc-parallel'],
    related: ['hpc-openmp', 'hpc-distributed'],
    applications: ['scicomp-fdm', 'scicomp-fem', 'hpc-distributed'],
    references: [
      { title: 'Using MPI', author: 'William Gropp, Ewing Lusk, Anthony Skjellum', source: 'MIT Press', url: 'https://mitpress.mit.edu/books/using-mpi-fourth-edition' }
    ],
    tags: ['mpi', 'distributed-memory', 'collective', 'message-passing']
  },
  {
    id: 'hpc-openmp',
    title: 'OpenMP',
    domain: 'HPC',
    difficulty: 'intermediate',
    summary: 'An API for shared-memory parallel programming using compiler directives, pragmas, and runtime routines.',
    keyPoints: [
      'OpenMP uses a fork-join model with threads.',
      'Compiler directives parallelize loops and sections.',
      'Reduction clauses handle collective operations safely.'
    ],
    formulas: [
      '\\#pragma omp parallel for reduction(+:sum)',
      'T_{\\text{parallel}} \\approx \\frac{T_{\\text{serial}}}{p} + T_{\\text{sync}}',
      '\\text{Thread safety: critical, atomic, barrier}'
    ],
    code: [
      {
        language: 'c',
        content: `#include <omp.h>\n\ndouble sum = 0.0;\n#pragma omp parallel for reduction(+:sum)\nfor (int i = 0; i < N; i++) {\n    sum += a[i] * b[i];\n}`,
        caption: 'OpenMP dot product with reduction.'
      }
    ],
    prerequisites: ['hpc-parallel'],
    related: ['hpc-mpi', 'algoopt-parallel'],
    applications: ['scicomp-linear', 'scicomp-fdm'],
    references: [
      { title: 'Using OpenMP', author: 'Chapman, Jost, van der Pas', source: 'MIT Press', url: 'https://mitpress.mit.edu/books/using-openmp' }
    ],
    tags: ['openmp', 'shared-memory', 'threads', 'pragmas']
  },
  {
    id: 'hpc-gpu',
    title: 'GPU Computing',
    domain: 'HPC',
    difficulty: 'advanced',
    summary: 'Using graphics processing units for general-purpose parallel computing, especially for data-parallel workloads.',
    keyPoints: [
      'GPUs expose thousands of lightweight cores.',
      'High memory bandwidth and throughput favor regular access patterns.',
      'Kernels are launched with grids of threads organized in blocks.'
    ],
    formulas: [
      '\\text{Occupancy} = \\frac{\\text{active warps}}{\\text{maximum warps per SM}}',
      '\\text{Memory bandwidth} = \\frac{\\text{bytes read}}{\\text{time}}',
      '\\text{Thread ID: } (blockIdx.x \\cdot blockDim.x) + threadIdx.x'
    ],
    code: [
      {
        language: 'cuda',
        content: `__global__ void add(int n, float *x, float *y) {\n    int i = blockIdx.x * blockDim.x + threadIdx.x;\n    if (i < n) y[i] = x[i] + y[i];\n}\n\nint blockSize = 256;\nint numBlocks = (N + blockSize - 1) / blockSize;\nadd<<<numBlocks, blockSize>>>(N, x, y);`,
        caption: 'CUDA kernel for vector addition.'
      }
    ],
    prerequisites: ['hpc-parallel'],
    related: ['hpc-cuda', 'algoopt-cache'],
    applications: ['dl-mlp', 'dl-convnet', 'scicomp-linear'],
    references: [
      { title: 'Programming Massively Parallel Processors', author: 'Kirk and Hwu', source: 'Morgan Kaufmann', url: 'https://www.elsevier.com/books/programming-massively-parallel-processors/kirk/978-0-12-811986-0' }
    ],
    tags: ['gpu', 'cuda', 'threads', 'kernel']
  },
  {
    id: 'hpc-cuda',
    title: 'CUDA Programming',
    domain: 'HPC',
    difficulty: 'advanced',
    summary: 'NVIDIA CUDA provides a parallel computing platform and API for programming GPUs with C/C++.',
    keyPoints: [
      'CUDA exposes explicit control over memory hierarchy.',
      'Shared memory enables fast intra-block communication.',
      'Streams and events allow overlapping computation and data transfer.'
    ],
    formulas: [
      '\\text{Global mem bandwidth} \\gg \\text{Shared mem bandwidth}',
      '\\text{coalesced access: threads in a warp access consecutive words}',
      '\\text{latency hiding: } \\text{enough warps to cover memory latency}'
    ],
    code: [
      {
        language: 'cuda',
        content: `__shared__ float tile[BLOCK_SIZE][BLOCK_SIZE];\n\ntile[threadIdx.y][threadIdx.x] = input[row * N + col];\n__syncthreads();\n\n// Compute using shared tile to reduce global memory traffic`,
        caption: 'Shared memory tiling in CUDA.'
      }
    ],
    prerequisites: ['hpc-gpu'],
    related: ['hpc-parallel', 'algoopt-cache'],
    applications: ['dl-convnet', 'hpc-distributed', 'scicomp-linear'],
    references: [
      { title: 'CUDA C Programming Guide', author: 'NVIDIA', source: 'NVIDIA Documentation', url: 'https://docs.nvidia.com/cuda/cuda-c-programming-guide/' }
    ],
    tags: ['cuda', 'shared-memory', 'coalesced', 'streams']
  },
  {
    id: 'hpc-distributed',
    title: 'Distributed Training',
    domain: 'HPC',
    difficulty: 'advanced',
    summary: 'Training machine learning models across multiple machines, scaling data and model parallelism to massive sizes.',
    keyPoints: [
      'Data parallelism replicates the model and splits batches across workers.',
      'Model parallelism splits layers or tensors across devices.',
      'All-reduce synchronizes gradients efficiently.'
    ],
    formulas: [
      'g = \\frac{1}{p} \\sum_{i=1}^p g_i \\quad \\text{(all-reduce)}',
      '\\text{Data parallelism: } B_{\\text{total}} = p \\cdot B_{\\text{local}}',
      '\\text{Model parallelism: } W = [W_1 | W_2 | \\dots | W_p]'
    ],
    code: [
      {
        language: 'python',
        content: `import torch.distributed as dist\nfrom torch.nn.parallel import DistributedDataParallel\n\ndist.init_process_group(backend='nccl')\nmodel = DistributedDataParallel(model)\noutput = model(input)\nloss = criterion(output, target)\nloss.backward()\noptimizer.step()`,
        caption: 'PyTorch distributed data parallel training.'
      }
    ],
    prerequisites: ['hpc-mpi', 'hpc-parallel', 'dl'],
    related: ['hpc-gpu', 'transformers-gpt'],
    applications: ['transformers-gpt', 'dl-convnet'],
    references: [
      { title: 'PyTorch Distributed Training', author: 'PyTorch Team', source: 'PyTorch Documentation', url: 'https://pytorch.org/tutorials/beginner/dist_overview.html' }
    ],
    tags: ['distributed-training', 'data-parallelism', 'model-parallelism', 'all-reduce']
  },
  {
    id: 'hpc-profiling',
    title: 'Performance Profiling',
    domain: 'HPC',
    difficulty: 'intermediate',
    summary: 'Measuring and analyzing program execution to identify bottlenecks and guide optimization.',
    keyPoints: [
      'Profiling reveals hotspots, memory usage, and communication overhead.',
      'CPU profilers sample instruction pointers.',
      'GPU profilers capture kernel occupancy, bandwidth, and occupancy.'
    ],
    formulas: [
      '\\text{Speedup} = \\frac{T_{\\text{before}}}{T_{\\text{after}}}',
      '\\text{Roofline model: } \\text{Performance} = \\min(\\text{Peak FLOPS}, \\text{AI} \\times \\text{Bandwidth})',
      '\\text{Amdahl: } S = \\frac{1}{(1-p) + p/s}'
    ],
    code: [
      {
        language: 'python',
        content: `import cProfile\n\ncProfile.run('my_function()')`,
        caption: 'Python profiling with cProfile.'
      }
    ],
    prerequisites: ['hpc', 'algoopt-complexity'],
    related: ['hpc-gpu', 'hpc-cuda'],
    applications: ['hpc-distributed', 'scicomp-linear'],
    references: [
      { title: 'The Roofline Model', author: 'Williams, Waterman, Patterson', source: 'IEEE', url: 'https://people.eecs.berkeley.edu/~knight/cs267_roofline.html' }
    ],
    tags: ['profiling', 'roofline', 'bottleneck', 'performance-analysis']
  },
  // END_TOPICS
];
