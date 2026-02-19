import Link from "next/link";

export default function CalculatorsPage() {
  // Category data structure for hierarchical navigation
  const categories = [
    {
      id: "math",
      title: "Math & Number",
      description: "Basic mathematical operations and number theory calculators",
      icon: "📐",
      color: "from-blue-500 to-indigo-600",
      calculators: [
        { id: "basic", title: "Basic Calculator", available: true },
        { id: "scientific", title: "Scientific Calculator", available: true },
        { id: "percent", title: "Percent Calculator", available: false },
        { id: "fraction", title: "Fraction Calculator", available: false },
        { id: "ratio", title: "Ratio Calculator", available: false },
        { id: "number-base", title: "Number Base Converter", available: false },
        { id: "prime-checker", title: "Prime Number Checker", available: false },
        { id: "gcd-lcm", title: "GCD & LCM Calculator", available: false },
        { id: "modulo", title: "Modulo Calculator", available: false },
        { id: "absolute-value", title: "Absolute Value Calculator", available: false },
        { id: "square-root", title: "Square Root Calculator", available: false },
        { id: "exponent", title: "Exponent Calculator", available: false },
        { id: "logarithm", title: "Logarithm Calculator", available: false },
        { id: "factorial", title: "Factorial Calculator", available: false },
        { id: "random-number", title: "Random Number Generator", available: false },
        { id: "permutation", title: "Permutation Calculator", available: false },
        { id: "combination", title: "Combination Calculator", available: false },
        { id: "rounding", title: "Rounding Calculator", available: false },
        { id: "significant-figures", title: "Significant Figures Calculator", available: false },
        { id: "parentheses", title: "Calculator with Parentheses Support", available: false }
      ]
    },
    {
      id: "algebra",
      title: "Algebra & Functions",
      description: "Algebraic equation solving and function analysis tools",
      icon: "📊",
      color: "from-purple-500 to-purple-600",
      calculators: [
        { id: "quadratic-solver", title: "Quadratic Equation Solver", available: false },
        { id: "linear-solver", title: "Linear Equation Solver", available: false },
        { id: "polynomial", title: "Polynomial Calculator", available: false },
        { id: "system-solver", title: "System of Equations Solver", available: false },
        { id: "inequality-solver", title: "Inequality Solver", available: false },
        { id: "matrix", title: "Matrix Calculator", available: false },
        { id: "determinant", title: "Determinant Calculator", available: false },
        { id: "root-finder", title: "Root Finder", available: false },
        { id: "function-plotter", title: "Function Plotter", available: false },
        { id: "interpolation", title: "Interpolation Calculator", available: false }
      ]
    },
    {
      id: "statistics",
      title: "Statistics & Probability",
      description: "Statistical analysis and probability calculation tools",
      icon: "📈",
      color: "from-green-500 to-emerald-600",
      calculators: [
        { id: "mean", title: "Mean Calculator", available: false },
        { id: "median", title: "Median Calculator", available: false },
        { id: "mode", title: "Mode Calculator", available: false },
        { id: "standard-deviation", title: "Standard Deviation Calculator", available: false },
        { id: "variance", title: "Variance Calculator", available: false },
        { id: "z-score", title: "Z-Score Calculator", available: false },
        { id: "t-score", title: "T-Score Calculator", available: false },
        { id: "normal-distribution", title: "Normal Distribution Calculator", available: false },
        { id: "regression", title: "Regression Calculator", available: false },
        { id: "correlation", title: "Correlation Coefficient Calculator", available: false },
        { id: "probability", title: "Probability Calculator", available: false },
        { id: "permutation-probability", title: "Permutation/Combination Probability", available: false },
        { id: "binomial", title: "Binomial Distribution", available: false },
        { id: "poisson", title: "Poisson Distribution", available: false },
        { id: "confidence-interval", title: "Confidence Interval Calculator", available: false }
      ]
    },
    {
      id: "geometry",
      title: "Geometry",
      description: "Geometric calculations for 2D and 3D shapes",
      icon: "📐",
      color: "from-orange-500 to-red-600",
      calculators: [
        { id: "area", title: "Area Calculator", available: false },
        { id: "perimeter", title: "Perimeter Calculator", available: false },
        { id: "triangle-solver", title: "Triangle Solver", available: false },
        { id: "circle-sector", title: "Circle Sector Calculator", available: false },
        { id: "polygon", title: "Polygon Calculator", available: false },
        { id: "volume", title: "Volume Calculator", available: false },
        { id: "surface-area", title: "Surface Area Calculator", available: false },
        { id: "cylinder", title: "Cylinder Calculator", available: false },
        { id: "sphere", title: "Sphere Calculator", available: false },
        { id: "cone", title: "Cone Calculator", available: false },
        { id: "pythagorean", title: "Pythagorean Theorem Calculator", available: false },
        { id: "trigonometry", title: "Trigonometry Calculator", available: false }
      ]
    },
    {
      id: "conversion",
      title: "Measurement & Conversion",
      description: "Unit conversion and measurement tools",
      icon: "📏",
      color: "from-teal-500 to-cyan-600",
      calculators: [
        { id: "distance", title: "Unit Converter (distance)", available: false },
        { id: "weight", title: "Weight/Mass Converter", available: false },
        { id: "temperature", title: "Temperature Converter", available: false },
        { id: "speed", title: "Speed Converter", available: false },
        { id: "time", title: "Time Converter", available: false },
        { id: "area", title: "Area Converter", available: false },
        { id: "volume", title: "Volume Converter", available: false },
        { id: "pressure", title: "Pressure Converter", available: false },
        { id: "energy", title: "Energy Converter", available: false },
        { id: "power", title: "Power Converter", available: false },
        { id: "data-storage", title: "Data Storage Converter", available: false },
        { id: "fuel-economy", title: "Fuel Economy Converter", available: false },
        { id: "time-zone", title: "Time Zone Converter", available: false }
      ]
    },
    {
      id: "finance",
      title: "Finance & Money",
      description: "Financial planning and money management tools",
      icon: "💰",
      color: "from-green-500 to-lime-600",
      calculators: [
        { id: "loan-payment", title: "Loan Payment Calculator", available: false },
        { id: "mortgage", title: "Mortgage Calculator", available: false },
        { id: "interest", title: "Interest Calculator", available: false },
        { id: "savings-growth", title: "Savings Growth Calculator", available: false },
        { id: "retirement", title: "Retirement Calculator", available: false },
        { id: "investment-return", title: "Investment Return Calculator", available: false },
        { id: "inflation", title: "Inflation Calculator", available: false },
        { id: "currency", title: "Currency Converter", available: false },
        { id: "budget", title: "Budget Calculator", available: false },
        { id: "tax", title: "Tax Calculator", available: false },
        { id: "discount", title: "Discount Calculator", available: false },
        { id: "tip", title: "Tip Calculator", available: false }
      ]
    },
    {
      id: "health",
      title: "Health & Fitness",
      description: "Health metrics and fitness tracking tools",
      icon: "🧠",
      color: "from-red-500 to-pink-600",
      calculators: [
        { id: "bmi", title: "BMI Calculator", available: false },
        { id: "bmr", title: "BMR Calculator", available: false },
        { id: "body-fat", title: "Body Fat Calculator", available: false },
        { id: "ideal-weight", title: "Ideal Weight Calculator", available: false },
        { id: "calorie-needs", title: "Calorie Needs Calculator", available: false },
        { id: "heart-rate", title: "Heart Rate Calculator", available: false },
        { id: "hydration", title: "Hydration Calculator", available: false },
        { id: "pregnancy", title: "Pregnancy Due Date Calculator", available: false },
        { id: "step-counter", title: "Step Counter Estimator", available: false }
      ]
    },
    {
      id: "travel",
      title: "Travel & Lifestyle",
      description: "Travel planning and lifestyle calculation tools",
      icon: "🚗",
      color: "from-yellow-500 to-orange-600",
      calculators: [
        { id: "trip-cost", title: "Trip Cost Calculator", available: false },
        { id: "fuel-cost", title: "Fuel Cost Calculator", available: false },
        { id: "distance", title: "Distance Calculator", available: false },
        { id: "speed-time", title: "Speed/Time Calculator", available: false },
        { id: "packing-weight", title: "Packing Weight Calculator", available: false },
        { id: "commute-time", title: "Commute Time Calculator", available: false }
      ]
    },
    {
      id: "tech",
      title: "Tech & Computer Science",
      description: "Technology and computer science calculation tools",
      icon: "📱",
      color: "from-purple-500 to-violet-600",
      calculators: [
        { id: "ip-subnet", title: "IP Subnet Calculator", available: false },
        { id: "hex-binary-octal", title: "Hex/Binary/Octal Converter", available: false },
        { id: "character-count", title: "Character Count / Word Count", available: false },
        { id: "url-encoder", title: "URL Encoder/Decoder", available: false }
      ]
    }
  ];

  // Helper function to get category statistics
  const getCategoryStats = (category: { calculators: { available: boolean }[] }) => {
    const total = category.calculators.length;
    const available = category.calculators.filter(calc => calc.available).length;
    return { total, available };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                  RAVN Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose Your Calculator</p>
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
          <span className="text-slate-900 dark:text-white font-medium">Calculators</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Calculator
          </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore our comprehensive range of 87+ calculators across 9 categories, 
            designed for every need. Currently featuring Basic Calculator with more advanced calculators coming soon!
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const { total, available } = getCategoryStats(category);
            const progress = (available / total) * 100;
            
            return (
              <Link
                key={category.id}
                href={`/calculators/${category.id}`}
                className="block group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{total}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Calculators</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
                      <span>Available Calculators</span>
                      <span>{available} / {total}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${category.color}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Available Calculators Preview */}
                  <div className="space-y-2 mb-6">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Available:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {category.calculators
                        .filter(calc => calc.available)
                        .slice(0, 3)
                        .map((calc) => (
                          <div
                            key={calc.id}
                            className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-slate-700 dark:text-slate-300">{calc.title}</span>
                          </div>
                        ))}
                      {available === 0 && (
                        <div className="text-sm text-slate-500 dark:text-slate-400 italic">No calculators available yet</div>
                      )}
                    </div>
                  </div>

                  {/* Coming Soon Count */}
                  {available < total && (
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Coming Soon
                      </span>
                      <span>{total - available} calculators</span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Explore {category.title}
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 group-hover:scale-105">
                        View Calculators
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">87+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Calculators Planned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Accuracy Guaranteed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">0ms</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Calculation Speed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Always Available</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">© 2024 RAVN Calculator. Built with precision.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Home</Link>
              <Link href="/calculators" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Calculators</Link>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}