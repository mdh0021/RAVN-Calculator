'use client';

import { useState } from 'react';

interface CalculationResult {
  value: number;
  type: string;
}

interface HistoryItem {
  id: number;
  calculation: string;
  timestamp: string;
}

export default function PercentCalculator() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [operation, setOperation] = useState('percentage');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const calculate = () => {
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);
    
    if (isNaN(num1) || isNaN(num2)) {
      alert('Please enter valid numbers');
      return;
    }

    let calculationResult = 0;
    let calculationType = '';

    switch (operation) {
      case 'percentage':
        calculationResult = (num1 / num2) * 100;
        calculationType = `${num1} is ${calculationResult.toFixed(2)}% of ${num2}`;
        break;
      case 'findPercentage':
        calculationResult = (num1 * num2) / 100;
        calculationType = `${num2}% of ${num1} is ${calculationResult}`;
        break;
      case 'percentageIncrease':
        calculationResult = num1 + (num1 * num2) / 100;
        calculationType = `${num1} increased by ${num2}% = ${calculationResult}`;
        break;
      case 'percentageDecrease':
        calculationResult = num1 - (num1 * num2) / 100;
        calculationType = `${num1} decreased by ${num2}% = ${calculationResult}`;
        break;
      case 'percentageDifference':
        calculationResult = Math.abs((num1 - num2) / ((num1 + num2) / 2)) * 100;
        calculationType = `Percentage difference between ${num1} and ${num2} is ${calculationResult.toFixed(2)}%`;
        break;
      default:
        return;
    }

    setResult({
      value: calculationResult,
      type: calculationType
    });

    // Add to history
    const newHistory = [
      {
        id: Date.now(),
        calculation: calculationType,
        timestamp: new Date().toLocaleString()
      },
      ...history
    ].slice(0, 10); // Keep only last 10 calculations

    setHistory(newHistory);
  };

  const clear = () => {
    setInput1('');
    setInput2('');
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getOperationLabel = (op: string) => {
    switch (op) {
      case 'percentage': return 'What percent of';
      case 'findPercentage': return 'Find percentage of';
      case 'percentageIncrease': return 'Percentage increase';
      case 'percentageDecrease': return 'Percentage decrease';
      case 'percentageDifference': return 'Percentage difference';
      default: return op;
    }
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                  RAVN Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Percentage Calculator</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/calculators/math" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Math & Number
              </a>
              <a href="/calculators" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                All Calculators
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
          <a href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
          <span className="mx-2">›</span>
          <a href="/calculators" className="hover:text-slate-900 dark:hover:text-white transition-colors">Calculators</a>
          <span className="mx-2">›</span>
          <a href="/calculators/math" className="hover:text-slate-900 dark:hover:text-white transition-colors">Math & Number</a>
          <span className="mx-2">›</span>
          <span className="text-slate-900 dark:text-white font-medium">Percentage Calculator</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Percentage Calculator</h2>
                <p className="text-slate-600 dark:text-slate-300">Calculate percentages, increases, decreases, and comparisons</p>
              </div>

              {/* Operation Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Calculation Type</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="percentage">What percent of (X is what % of Y)</option>
                  <option value="findPercentage">Find percentage of (X% of Y)</option>
                  <option value="percentageIncrease">Percentage increase (X increased by Y%)</option>
                  <option value="percentageDecrease">Percentage decrease (X decreased by Y%)</option>
                  <option value="percentageDifference">Percentage difference between X and Y</option>
                </select>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {operation === 'percentage' || operation === 'findPercentage' || operation === 'percentageDifference' ? 'First Number' : 'Original Value'}
                  </label>
                  <input
                    type="number"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    placeholder={operation === 'percentage' ? "Enter first number" : 
                              operation === 'findPercentage' ? "Enter base number" : 
                              operation === 'percentageIncrease' ? "Enter original value" : 
                              operation === 'percentageDecrease' ? "Enter original value" : 
                              "Enter first number"}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {operation === 'percentage' || operation === 'findPercentage' || operation === 'percentageDifference' ? 'Second Number' : 'Percentage'}
                  </label>
                  <input
                    type="number"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    placeholder={operation === 'percentage' ? "Enter second number" : 
                              operation === 'findPercentage' ? "Enter percentage" : 
                              operation === 'percentageIncrease' ? "Enter percentage increase" : 
                              operation === 'percentageDecrease' ? "Enter percentage decrease" : 
                              "Enter second number"}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={calculate}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Calculate
                </button>
                <button
                  onClick={clear}
                  className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Clear
                </button>
              </div>

              {/* Result Display */}
              {result && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Result</h3>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {typeof result.value === 'number' ? result.value.toLocaleString() : result.value}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{result.type}</p>
                </div>
              )}
            </div>

            {/* Formula Reference */}
            <div className="mt-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <strong>Percentage:</strong> (Part / Whole) × 100
                </div>
                <div>
                  <strong>Find Percentage:</strong> (Percentage / 100) × Number
                </div>
                <div>
                  <strong>Percentage Increase:</strong> Number × (1 + Percentage/100)
                </div>
                <div>
                  <strong>Percentage Decrease:</strong> Number × (1 - Percentage/100)
                </div>
                <div>
                  <strong>Percentage Difference:</strong> |A - B| / ((A + B)/2) × 100
                </div>
              </div>
            </div>
          </div>

          {/* History and Examples */}
          <div className="lg:col-span-1">
            {/* History */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">History</h3>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {history.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm">No calculations yet</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">{item.calculation}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Examples */}
            <div className="mt-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Examples</h3>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <strong>What percent of:</strong> 25 is what % of 100? = 25%
                </div>
                <div>
                  <strong>Find percentage:</strong> 20% of 150 = 30
                </div>
                <div>
                  <strong>Percentage increase:</strong> 100 increased by 25% = 125
                </div>
                <div>
                  <strong>Percentage decrease:</strong> 100 decreased by 20% = 80
                </div>
                <div>
                  <strong>Percentage difference:</strong> Difference between 80 and 120 = 40%
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Tips</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Use decimal numbers for more precise calculations</li>
                <li>• Negative percentages work for decreases</li>
                <li>• Results are automatically saved to history</li>
                <li>• Clear history to start fresh</li>
              </ul>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">© 2024 RAVN Calculator. Built with precision.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <a href="/calculators/math" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Math & Number</a>
              <a href="/calculators" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">All Calculators</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}