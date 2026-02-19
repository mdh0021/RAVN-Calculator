import Link from "next/link";

export default function ConversionCategoryPage() {
  // Measurement & Conversion calculators data
  const conversionCalculators = [
    {
      id: "distance",
      title: "Unit Converter (distance)",
      description: "Convert between different distance and length units",
      icon: "📏",
      color: "from-teal-500 to-cyan-600",
      complexity: "Low",
      available: false,
      features: ["Meters to Feet", "Kilometers to Miles", "Inches to Centimeters", "Nautical Miles"]
    },
    {
      id: "weight",
      title: "Weight/Mass Converter",
      description: "Convert between different weight and mass units",
      icon: "⚖️",
      color: "from-cyan-500 to-blue-600",
      complexity: "Low",
      available: false,
      features: ["Kilograms to Pounds", "Grams to Ounces", "Tons to Kilograms", "Stone to Pounds"]
    },
    {
      id: "temperature",
      title: "Temperature Converter",
      description: "Convert between Celsius, Fahrenheit, and Kelvin",
      icon: "🌡️",
      color: "from-blue-500 to-indigo-600",
      complexity: "Low",
      available: false,
      features: ["Celsius to Fahrenheit", "Fahrenheit to Celsius", "Kelvin Conversions", "Temperature Scales"]
    },
    {
      id: "speed",
      title: "Speed Converter",
      description: "Convert between different speed and velocity units",
      icon: "🚗",
      color: "from-indigo-500 to-purple-600",
      complexity: "Low",
      available: false,
      features: ["MPH to KPH", "Knots to MPH", "Meters per Second", "Mach Numbers"]
    },
    {
      id: "time",
      title: "Time Converter",
      description: "Convert between different time units and formats",
      icon: "⏱️",
      color: "from-purple-500 to-pink-600",
      complexity: "Low",
      available: false,
      features: ["Hours to Minutes", "Days to Hours", "Seconds to Minutes", "Military Time"]
    },
    {
      id: "area",
      title: "Area Converter",
      description: "Convert between different area measurement units",
      icon: "📐",
      color: "from-pink-500 to-red-600",
      complexity: "Low",
      available: false,
      features: ["Square Meters", "Square Feet", "Acres to Hectares", "Square Kilometers"]
    },
    {
      id: "volume",
      title: "Volume Converter",
      description: "Convert between different volume and capacity units",
      icon: "🧊",
      color: "from-red-500 to-orange-600",
      complexity: "Low",
      available: false,
      features: ["Liters to Gallons", "Cubic Meters", "Fluid Ounces", "Barrels"]
    },
    {
      id: "pressure",
      title: "Pressure Converter",
      description: "Convert between different pressure units",
      icon: "🔽",
      color: "from-orange-500 to-amber-600",
      complexity: "Low-Medium",
      available: false,
      features: ["PSI to Bar", "Atmospheres", "Pascals", "Mercury Inches"]
    },
    {
      id: "energy",
      title: "Energy Converter",
      description: "Convert between different energy and work units",
      icon: "⚡",
      color: "from-amber-500 to-yellow-600",
      complexity: "Low-Medium",
      available: false,
      features: ["Joules to Calories", "Kilowatt Hours", "BTU Conversions", "Electron Volts"]
    },
    {
      id: "power",
      title: "Power Converter",
      description: "Convert between different power units",
      icon: "🔌",
      color: "from-yellow-500 to-lime-600",
      complexity: "Low-Medium",
      available: false,
      features: ["Watts to Horsepower", "Kilowatts", "Megawatts", "BTU per Hour"]
    },
    {
      id: "data-storage",
      title: "Data Storage Converter",
      description: "Convert between different digital storage units",
      icon: "💾",
      color: "from-lime-500 to-green-600",
      complexity: "Low",
      available: false,
      features: ["Bytes to Kilobytes", "Megabytes to Gigabytes", "Terabytes", "Binary vs Decimal"]
    },
    {
      id: "fuel-economy",
      title: "Fuel Economy Converter",
      description: "Convert between different fuel efficiency measurements",
      icon: "⛽",
      color: "from-green-500 to-emerald-600",
      complexity: "Low-Medium",
      available: false,
      features: ["MPG to L/100km", "Kilometers per Liter", "Miles per Gallon", "Fuel Efficiency"]
    },
    {
      id: "time-zone",
      title: "Time Zone Converter",
      description: "Convert time between different time zones",
      icon: "🌍",
      color: "from-emerald-500 to-teal-600",
      complexity: "Medium",
      available: false,
      features: ["World Time Zones", "Daylight Saving", "UTC Conversions", "Meeting Planner"]
    }
  ];

  // Calculate statistics
  const totalCalculators = conversionCalculators.length;
  const availableCalculators = conversionCalculators.filter(calc => calc.available).length;
  const progress = (availableCalculators / totalCalculators) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-950 dark:to-cyan-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                  RAVN Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Measurement & Conversion Calculators</p>
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
          <span className="text-slate-900 dark:text-white font-medium">Measurement & Conversion</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                📏
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Measurement & Conversion Calculators
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  Unit conversion and measurement tools for all your conversion needs across different systems.
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
                className="h-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conversionCalculators.map((calculator) => (
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
                      href={`/calculators/conversion/${calculator.id}`}
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
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
              <div className="text-2xl font-bold text-slate-900 dark:text-white">13</div>
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
              <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">© 2024 RAVN Calculator. Built with precision.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Home</Link>
              <Link href="/calculators" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Calculators</Link>
              <Link href="/calculators/conversion" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Measurement & Conversion</Link>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}