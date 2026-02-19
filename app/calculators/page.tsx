import Link from "next/link";

export default function CalculatorsPage() {
  const calculatorTypes = [
    {
      id: "basic",
      title: "Basic Calculator",
      description: "Simple arithmetic operations for everyday calculations",
      icon: "🧮",
      features: ["Addition", "Subtraction", "Multiplication", "Division"],
      color: "from-blue-500 to-blue-600",
      complexity: "Low"
    },
    {
      id: "scientific",
      title: "Scientific Calculator",
      description: "Advanced mathematical functions for students and professionals",
      icon: "🔬",
      features: ["Trigonometry", "Logarithms", "Exponents", "Constants"],
      color: "from-indigo-500 to-indigo-600",
      complexity: "Medium"
    },
    {
      id: "programmer",
      title: "Programmer Calculator",
      description: "Binary, hexadecimal, and octal conversions for developers",
      icon: "💻",
      features: ["Binary/Hex/Octal", "Bitwise Operations", "Logic Gates", "Base Conversions"],
      color: "from-purple-500 to-purple-600",
      complexity: "Medium",
      comingSoon: true
    },
    {
      id: "financial",
      title: "Financial Calculator",
      description: "Loan calculations, interest rates, and currency conversion",
      icon: "💰",
      features: ["Loan Payments", "Interest Rates", "Currency Conversion", "Investment Analysis"],
      color: "from-green-500 to-green-600",
      complexity: "Medium-High",
      comingSoon: true
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert between different measurement units",
      icon: "📏",
      features: ["Length", "Weight", "Temperature", "Volume", "Speed"],
      color: "from-orange-500 to-orange-600",
      complexity: "Low-Medium",
      comingSoon: true
    },
    {
      id: "date-calculator",
      title: "Date Calculator",
      description: "Date differences, age calculations, and business days",
      icon: "📅",
      features: ["Date Differences", "Age Calculator", "Business Days", "Duration"],
      color: "from-red-500 to-red-600",
      complexity: "Low-Medium",
      comingSoon: true
    },
    {
      id: "percentage",
      title: "Percentage Calculator",
      description: "Percentage calculations and comparisons",
      icon: "📊",
      features: ["Percentage Increase", "Percentage Decrease", "Percentage of Total", "Comparisons"],
      color: "from-teal-500 to-teal-600",
      complexity: "Low",
      comingSoon: true
    },
    {
      id: "graphing",
      title: "Graphing Calculator",
      description: "Function plotting and visualization",
      icon: "📈",
      features: ["Function Plotting", "Graph Analysis", "Multiple Functions", "Export Charts"],
      color: "from-pink-500 to-pink-600",
      complexity: "High",
      comingSoon: true
    }
  ];

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

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorTypes.map((calculator) => (
            <div
              key={calculator.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${calculator.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {calculator.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {calculator.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {calculator.description}
                    </p>
                  </div>
                </div>
                {calculator.comingSoon && (
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Features:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {calculator.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Complexity: <span className="font-medium text-slate-900 dark:text-white">{calculator.complexity}</span>
                </div>
                <div className="flex gap-3">
                  {calculator.comingSoon ? (
                    <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                      Coming Soon
                    </button>
                  ) : (
                    <Link
                      href={`/calculators/${calculator.id}`}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Launch Calculator
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
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