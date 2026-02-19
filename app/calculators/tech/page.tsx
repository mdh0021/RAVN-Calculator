import Link from "next/link";

export default function TechCategoryPage() {
  // Tech & Computer Science calculators data
  const techCalculators = [
    {
      id: "ip-subnet",
      title: "IP Subnet Calculator",
      description: "Calculate subnet masks, network ranges, and IP address planning",
      icon: "🌐",
      color: "from-purple-500 to-violet-600",
      complexity: "High",
      available: false,
      features: ["Subnet Mask", "Network Range", "Host Count", "CIDR Notation"]
    },
    {
      id: "hex-binary-octal",
      title: "Hex/Binary/Octal Converter",
      description: "Convert between hexadecimal, binary, octal, and decimal number systems",
      icon: "🔢",
      color: "from-violet-500 to-indigo-600",
      complexity: "Low-Medium",
      available: false,
      features: ["Base Conversions", "Number Systems", "Programming", "Data Analysis"]
    },
    {
      id: "character-count",
      title: "Character Count / Word Count",
      description: "Count characters, words, and lines in text content",
      icon: "📝",
      color: "from-indigo-500 to-blue-600",
      complexity: "Low",
      available: false,
      features: ["Character Count", "Word Count", "Line Count", "Text Analysis"]
    },
    {
      id: "url-encoder",
      title: "URL Encoder/Decoder",
      description: "Encode and decode URLs for web development and data transmission",
      icon: "🔗",
      color: "from-blue-500 to-cyan-600",
      complexity: "Low-Medium",
      available: false,
      features: ["URL Encoding", "URL Decoding", "Special Characters", "Web Development"]
    }
  ];

  // Calculate statistics
  const totalCalculators = techCalculators.length;
  const availableCalculators = techCalculators.filter(calc => calc.available).length;
  const progress = (availableCalculators / totalCalculators) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 dark:from-slate-900 dark:via-purple-950 dark:to-violet-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                  RAVN Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tech & Computer Science Calculators</p>
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
          <span className="text-slate-900 dark:text-white font-medium">Tech & Computer Science</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                📱
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Tech & Computer Science Calculators
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  Technology and computer science calculation tools for developers and IT professionals.
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
                className="h-4 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCalculators.map((calculator) => (
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
                      href={`/calculators/tech/${calculator.id}`}
                      className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
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
              <div className="text-2xl font-bold text-slate-900 dark:text-white">4</div>
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
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-600 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">© 2024 RAVN Calculator. Built with precision.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Home</Link>
              <Link href="/calculators" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Calculators</Link>
              <Link href="/calculators/tech" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Tech & Computer Science</Link>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}