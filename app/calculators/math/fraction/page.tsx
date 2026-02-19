"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

interface Fraction {
  numerator: number;
  denominator: number;
}

export default function FractionCalculator() {
  // State management for fraction calculator
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [operation, setOperation] = useState<string | null>(null);
  const [result, setResult] = useState<Fraction | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [steps, setSteps] = useState<string[]>([]);

  // Helper functions for fraction operations
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (frac: Fraction): Fraction => {
    const divisor = gcd(Math.abs(frac.numerator), Math.abs(frac.denominator));
    return {
      numerator: frac.numerator / divisor,
      denominator: frac.denominator / divisor
    };
  };

  const addFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const lcd = f1.denominator * f2.denominator;
    const num1 = f1.numerator * f2.denominator;
    const num2 = f2.numerator * f1.denominator;
    return simplifyFraction({ numerator: num1 + num2, denominator: lcd });
  };

  const subtractFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const lcd = f1.denominator * f2.denominator;
    const num1 = f1.numerator * f2.denominator;
    const num2 = f2.numerator * f1.denominator;
    return simplifyFraction({ numerator: num1 - num2, denominator: lcd });
  };

  const multiplyFractions = (f1: Fraction, f2: Fraction): Fraction => {
    return simplifyFraction({
      numerator: f1.numerator * f2.numerator,
      denominator: f1.denominator * f2.denominator
    });
  };

  const divideFractions = (f1: Fraction, f2: Fraction): Fraction => {
    if (f2.numerator === 0) {
      throw new Error("Cannot divide by zero");
    }
    return simplifyFraction({
      numerator: f1.numerator * f2.denominator,
      denominator: f1.denominator * f2.numerator
    });
  };

  const calculateResult = () => {
    setError('');
    setSteps([]);
    
    if (!operation || fraction2.denominator === 0) {
      setError('Please select an operation and ensure denominators are not zero');
      return;
    }

    try {
      let calculatedResult: Fraction;
      let stepDescriptions: string[] = [];

      switch (operation) {
        case '+':
          calculatedResult = addFractions(fraction1, fraction2);
          stepDescriptions = [
            `Find LCD: ${fraction1.denominator} × ${fraction2.denominator} = ${fraction1.denominator * fraction2.denominator}`,
            `Convert fractions: ${fraction1.numerator}/${fraction1.denominator} = ${fraction1.numerator * fraction2.denominator}/${fraction1.denominator * fraction2.denominator}`,
            `Convert fractions: ${fraction2.numerator}/${fraction2.denominator} = ${fraction2.numerator * fraction1.denominator}/${fraction2.denominator * fraction1.denominator}`,
            `Add numerators: ${fraction1.numerator * fraction2.denominator} + ${fraction2.numerator * fraction1.denominator} = ${(fraction1.numerator * fraction2.denominator) + (fraction2.numerator * fraction1.denominator)}`,
            `Result: ${(fraction1.numerator * fraction2.denominator) + (fraction2.numerator * fraction1.denominator)}/${fraction1.denominator * fraction2.denominator}`
          ];
          break;
        case '-':
          calculatedResult = subtractFractions(fraction1, fraction2);
          stepDescriptions = [
            `Find LCD: ${fraction1.denominator} × ${fraction2.denominator} = ${fraction1.denominator * fraction2.denominator}`,
            `Convert fractions: ${fraction1.numerator}/${fraction1.denominator} = ${fraction1.numerator * fraction2.denominator}/${fraction1.denominator * fraction2.denominator}`,
            `Convert fractions: ${fraction2.numerator}/${fraction2.denominator} = ${fraction2.numerator * fraction1.denominator}/${fraction2.denominator * fraction1.denominator}`,
            `Subtract numerators: ${fraction1.numerator * fraction2.denominator} - ${fraction2.numerator * fraction1.denominator} = ${(fraction1.numerator * fraction2.denominator) - (fraction2.numerator * fraction1.denominator)}`,
            `Result: ${(fraction1.numerator * fraction2.denominator) - (fraction2.numerator * fraction1.denominator)}/${fraction1.denominator * fraction2.denominator}`
          ];
          break;
        case '×':
          calculatedResult = multiplyFractions(fraction1, fraction2);
          stepDescriptions = [
            `Multiply numerators: ${fraction1.numerator} × ${fraction2.numerator} = ${fraction1.numerator * fraction2.numerator}`,
            `Multiply denominators: ${fraction1.denominator} × ${fraction2.denominator} = ${fraction1.denominator * fraction2.denominator}`,
            `Result: ${fraction1.numerator * fraction2.numerator}/${fraction1.denominator * fraction2.denominator}`
          ];
          break;
        case '÷':
          if (fraction2.numerator === 0) {
            throw new Error("Cannot divide by zero");
          }
          calculatedResult = divideFractions(fraction1, fraction2);
          stepDescriptions = [
            `Find reciprocal of ${fraction2.numerator}/${fraction2.denominator} = ${fraction2.denominator}/${fraction2.numerator}`,
            `Multiply: ${fraction1.numerator}/${fraction1.denominator} × ${fraction2.denominator}/${fraction2.numerator}`,
            `Multiply numerators: ${fraction1.numerator} × ${fraction2.denominator} = ${fraction1.numerator * fraction2.denominator}`,
            `Multiply denominators: ${fraction1.denominator} × ${fraction2.numerator} = ${fraction1.denominator * fraction2.numerator}`,
            `Result: ${fraction1.numerator * fraction2.denominator}/${fraction1.denominator * fraction2.numerator}`
          ];
          break;
        default:
          return;
      }

      setResult(calculatedResult);
      setSteps(stepDescriptions);
      
      // Add to history
      const calculationString = `${formatFraction(fraction1)} ${operation} ${formatFraction(fraction2)} = ${formatFraction(calculatedResult)}`;
      setCalculationHistory(prev => [calculationString, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const formatFraction = (frac: Fraction): string => {
    if (frac.denominator === 1) {
      return frac.numerator.toString();
    }
    return `${frac.numerator}/${frac.denominator}`;
  };

  const formatMixedNumber = (frac: Fraction): string => {
    if (frac.denominator === 1) {
      return frac.numerator.toString();
    }
    if (Math.abs(frac.numerator) < frac.denominator) {
      return formatFraction(frac);
    }
    
    const whole = Math.floor(Math.abs(frac.numerator) / frac.denominator);
    const remainder = Math.abs(frac.numerator) % frac.denominator;
    const sign = frac.numerator < 0 ? '-' : '';
    
    if (remainder === 0) {
      return `${sign}${whole}`;
    }
    return `${sign}${whole} ${remainder}/${frac.denominator}`;
  };

  const handleNumberInput = (fractionIndex: 1 | 2, type: 'numerator' | 'denominator', value: string) => {
    const numValue = parseInt(value) || 0;
    const setState = fractionIndex === 1 ? setFraction1 : setFraction2;
    const currentFraction = fractionIndex === 1 ? fraction1 : fraction2;
    
    setState({
      ...currentFraction,
      [type]: numValue
    });
  };

  const clear = () => {
    setFraction1({ numerator: 0, denominator: 1 });
    setFraction2({ numerator: 0, denominator: 1 });
    setOperation(null);
    setResult(null);
    setError('');
    setSteps([]);
  };

  const clearEntry = () => {
    if (operation) {
      setFraction2({ numerator: 0, denominator: 1 });
    } else {
      setFraction1({ numerator: 0, denominator: 1 });
    }
    setResult(null);
    setError('');
    setSteps([]);
  };

  const handleOperationClick = (op: string) => {
    setOperation(op);
    setResult(null);
    setError('');
    setSteps([]);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      // Handle number input - would need focus management for specific inputs
    } else if (key === '+') {
      handleOperationClick('+');
    } else if (key === '-') {
      handleOperationClick('-');
    } else if (key === '*') {
      handleOperationClick('×');
    } else if (key === '/') {
      event.preventDefault();
      handleOperationClick('÷');
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      clearEntry();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fraction1, fraction2, operation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                  RAVN Calculator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fraction Calculator</p>
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
          <Link href="/calculators/math" className="hover:text-slate-900 dark:hover:text-white transition-colors">Math & Number</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900 dark:text-white font-medium">Fraction Calculator</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🔢
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Fraction Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Perform fraction arithmetic with automatic simplification. Add, subtract, multiply, and divide fractions with step-by-step solutions.
          </p>
        </div>

        {/* Calculator Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="text-red-600 dark:text-red-400 font-medium">Error</div>
                <div className="text-red-500 dark:text-red-300 text-sm mt-1">{error}</div>
              </div>
            )}

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* First Fraction Input */}
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6">
                <div className="text-center mb-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">First Fraction</span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={fraction1.numerator}
                      onChange={(e) => handleNumberInput(1, 'numerator', e.target.value)}
                      className="w-full px-4 py-3 text-center text-lg font-mono bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Numerator"
                    />
                  </div>
                  <div className="border-t-2 border-slate-400 dark:border-slate-500"></div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={fraction1.denominator}
                      onChange={(e) => handleNumberInput(1, 'denominator', e.target.value)}
                      className="w-full px-4 py-3 text-center text-lg font-mono bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Denominator"
                    />
                  </div>
                </div>
              </div>

              {/* Operation Selector */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Operation</div>
                <div className="grid grid-cols-2 gap-3">
                  {['+', '-', '×', '÷'].map((op) => (
                    <button
                      key={op}
                      onClick={() => handleOperationClick(op)}
                      className={`w-16 h-16 text-lg font-bold rounded-lg transition-all shadow-md ${
                        operation === op
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform -translate-y-1'
                          : 'bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
                <button
                  onClick={calculateResult}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Calculate
                </button>
              </div>

              {/* Second Fraction Input */}
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6">
                <div className="text-center mb-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Second Fraction</span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={fraction2.numerator}
                      onChange={(e) => handleNumberInput(2, 'numerator', e.target.value)}
                      className="w-full px-4 py-3 text-center text-lg font-mono bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Numerator"
                    />
                  </div>
                  <div className="border-t-2 border-slate-400 dark:border-slate-500"></div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={fraction2.denominator}
                      onChange={(e) => handleNumberInput(2, 'denominator', e.target.value)}
                      className="w-full px-4 py-3 text-center text-lg font-mono bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Denominator"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Result Display */}
            {result && (
              <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Result</span>
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium"
                  >
                    {showSteps ? 'Hide' : 'Show'} Steps
                  </button>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-green-800 dark:text-green-200 mb-2">
                    {formatFraction(result)}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300">
                    or {formatMixedNumber(result)} (mixed number)
                  </div>
                </div>
              </div>
            )}

            {/* Steps Display */}
            {showSteps && steps.length > 0 && (
              <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-6 mb-6">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Step-by-Step Solution:</div>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="text-sm text-slate-600 dark:text-slate-300 bg-white/30 dark:bg-slate-600/30 p-2 rounded">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3">
              <button 
                onClick={clear}
                className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={clearEntry}
                className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear Entry
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Supported Operations</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Fraction Addition (+)</li>
                <li>• Fraction Subtraction (−)</li>
                <li>• Fraction Multiplication (×)</li>
                <li>• Fraction Division (÷)</li>
                <li>• Automatic simplification</li>
                <li>• Mixed number conversion</li>
              </ul>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Use Cases</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Math homework help</li>
                <li>• Cooking measurements</li>
                <li>• Construction calculations</li>
                <li>• Academic studies</li>
                <li>• Fraction practice</li>
                <li>• Step-by-step learning</li>
              </ul>
            </div>
          </div>

          {/* Calculation History Section */}
          {calculationHistory.length > 0 && (
            <div className="mt-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Recent Calculations</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {calculationHistory.map((calc, index) => (
                  <div 
                    key={index}
                    className="text-sm font-mono text-slate-600 dark:text-slate-300 bg-white/30 dark:bg-slate-700/30 p-2 rounded flex items-center justify-between"
                  >
                    <span>{calc}</span>
                    <button
                      onClick={() => {
                        // Parse the result and set it as the first fraction
                        const resultMatch = calc.match(/= (.+)$/);
                        if (resultMatch) {
                          const resultStr = resultMatch[1];
                          if (resultStr.includes('/')) {
                            const [num, den] = resultStr.split('/');
                            setFraction1({ numerator: parseInt(num), denominator: parseInt(den) });
                          } else {
                            setFraction1({ numerator: parseInt(resultStr), denominator: 1 });
                          }
                        }
                      }}
                      className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                    >
                      Use Result
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                History is cleared when you refresh the page
              </div>
            </div>
          )}
        </div>

        {/* Back to Calculators */}
        <div className="text-center mt-12 space-y-4">
          <Link
            href="/calculators/math"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Back to Math & Number Calculators
          </Link>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Or go to
            <Link
              href="/calculators"
              className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
            >
              All Calculators
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-md flex items-center justify-center">
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