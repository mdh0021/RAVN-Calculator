import Link from "next/link";

export default function StatisticsCategoryPage() {
  // Statistics & Probability calculators data
  const statisticsCalculators = [
    {
      id: "mean",
      title: "Mean Calculator",
      description: "Calculate arithmetic mean, median, and mode of data sets",
      icon: "📊",
      color: "from-green-500 to-emerald-600",
      complexity: "Low",
      available: false,
      features: ["Arithmetic Mean", "Weighted Mean", "Geometric Mean", "Harmonic Mean"]
    },
    {
      id: "median",
      title: "Median Calculator",
      description: "Find the median value of a data set",
      icon: "📈",
      color: "from-emerald-500 to-teal-600",
      complexity: "Low",
      available: false,
      features: ["Median Calculation", "Odd/Even Data Sets", "Sorted Data", "Position Finding"]
    },
    {
      id: "mode",
      title: "Mode Calculator",
      description: "Determine the mode and frequency distribution",
      icon: "🔢",
      color: "from-teal-500 to-cyan-600",
      complexity: "Low",
      available: false,
      features: ["Mode Finding", "Frequency Analysis", "Multiple Modes", "Data Distribution"]
    },
    {
      id: "standard-deviation",
      title: "Standard Deviation Calculator",
      description: "Calculate population and sample standard deviation",
      icon: "📉",
      color: "from-cyan-500 to-blue-600",
      complexity: "Low-Medium",
      available: false,
      features: ["Population SD", "Sample SD", "Variance", "Data Spread"]
    },
    {
      id: "variance",
      title: "Variance Calculator",
      description: "Calculate variance for population and sample data",
      icon: "📊",
      color: "from-blue-500 to-indigo-600",
      complexity: "Low-Medium",
      available: false,
      features: ["Population Variance", "Sample Variance", "Standard Deviation", "Data Analysis"]
    },
    {
      id: "z-score",
      title: "Z-Score Calculator",
      description: "Calculate z-scores and standardize data",
      icon: "📈",
      color: "from-indigo-500 to-purple-600",
      complexity: "Medium",
      available: false,
      features: ["Z-Score Calculation", "Standardization", "Normal Distribution", "Data Comparison"]
    },
    {
      id: "t-score",
      title: "T-Score Calculator",
      description: "Calculate t-scores for small sample analysis",
      icon: "📉",
      color: "from-purple-500 to-pink-600",
      complexity: "Medium-High",
      available: false,
      features: ["T-Score Calculation", "Degrees of Freedom", "Small Sample Analysis", "Confidence Intervals"]
    },
    {
      id: "normal-distribution",
      title: "Normal Distribution Calculator",
      description: "Calculate probabilities and percentiles for normal distributions",
      icon: "📊",
      color: "from-pink-500 to-red-600",
      complexity: "Medium-High",
      available: false,
      features: ["Probability Density", "Cumulative Probability", "Z-Scores", "Percentiles"]
    },
    {
      id: "regression",
      title: "Regression Calculator",
      description: "Perform linear regression analysis and correlation",
      icon: "📈",
      color: "from-red-500 to-orange-600",
      complexity: "High",
      available: false,
      features: ["Linear Regression", "Correlation Coefficient", "Line of Best Fit", "R-Squared"]
    },
    {
      id: "correlation",
      title: "Correlation Coefficient Calculator",
      description: "Calculate Pearson correlation and covariance",
      icon: "📉",
      color: "from-orange-500 to-amber-600",
      complexity: "Medium-High",
      available: false,
      features: ["Pearson Correlation", "Covariance", "Strength of Relationship", "Scatter Plot Analysis"]
    },
    {
      id: "probability",
      title: "Probability Calculator",
      description: "Calculate probabilities for various distributions",
      icon: "🎲",
      color: "from-amber-500 to-yellow-600",
      complexity: "Medium",
      available: false,
      features: ["Basic Probability", "Conditional Probability", "Independent Events", "Combinations"]
    },
    {
      id: "permutation-probability",
      title: "Permutation/Combination Probability",
      description: "Calculate probabilities using permutations and combinations",
      icon: "🔢",
      color: "from-yellow-500 to-lime-600",
      complexity: "Medium",
      available: false,
      features: ["Permutation Probability", "Combination Probability", "Counting Principles", "Sample Spaces"]
    },
    {
      id: "binomial",
      title: "Binomial Distribution",
      description: "Calculate binomial probabilities and distributions",
      icon: "📊",
      color: "from-lime-500 to-green-600",
      complexity: "High",
      available: false,
      features: ["Binomial Probability", "Expected Value", "Variance", "Success/Failure Trials"]
    },
    {
      id: "poisson",
      title: "Poisson Distribution",
      description: "Calculate Poisson probabilities for rare events",
      icon: "📈",
      color: "from-green-500 to-emerald-600",
      complexity: "High",
      available: false,
      features: ["Poisson Probability", "Lambda Parameter", "Rare Events", "Time Intervals"]
    },
    {
      id: "confidence-interval",
      title: "Confidence Interval Calculator",
      description: "Calculate confidence intervals for population parameters",
      icon: "📉",
      color: "from-emerald-500 to-teal-600",
      complexity: "High",
      available: false,
      features: ["Confidence Level", "Margin of Error", "Population Mean", "Sample Size"]
    }
  ];

  // Calculate statistics
  const totalCalculators = statisticsCalculators.length;
  const availableCalculators = statisticsCalculators.filter(calc => calc.available).length;
  const progress = (availableCalculators / totalCalculators) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-950 dark:to-emerald-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                  RAVN Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Statistics & Probability Calculators</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/calculators" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Calculators
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/calculators" className="hover:text-slate-900 dark:hover:text-white transition-colors">Calculators</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900 dark:text-white font-medium">Statistics & Probability</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                📈
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Statistics & Probability Calculators
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  Statistical analysis and probability calculation tools for data analysis and research.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-slate-900 dark:text-white">{totalCalculators}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Total Calculators</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
              <span>Development Progress</span>
              <span>{availableCalculators} / {totalCalculators} Available</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
              <div 
                className="h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statisticsCalculators.map((calculator) => (
            <div
              key={calculator.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${calculator.color} rounded-lg flex items-center justify-center text-xl shadow-lg`}>
                    {calculator.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {calculator.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {calculator.description}
                    </p>
                  </div>
                </div>
                {!calculator.available && (
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Features:</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {calculator.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Complexity: <span className="font-medium text-slate-900 dark:text-white">{calculator.complexity}</span>
                </div>
                <div className="flex gap-3">
                  {!calculator.available ? (
                    <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-lg font-medium cursor-not-allowed text-sm">
                      Coming Soon
                    </button>
                  ) : (
                    <Link
                      href={`/calculators/statistics/${calculator.id}`}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
                    >
                      Launch Calculator
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Stats */}
        <div className="mt-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{availableCalculators}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalCalculators - availableCalculators}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Coming Soon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{progress.toFixed(0)}%</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">15</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Total</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">© 2024 RAVN Calculator. Built with precision.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Home</Link>
              <Link href="/calculators" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Calculators</Link>
              <Link href="/calculators/statistics" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Statistics & Probability</Link>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}