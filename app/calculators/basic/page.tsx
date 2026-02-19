"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

export default function BasicCalculator() {
  // State management for calculator
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<string[]>([]);
  const [currentCalculation, setCurrentCalculation] = useState<string>("");
  const displayRef = useRef<HTMLDivElement>(null);

  // Calculator functions
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplayValue('0');
  };

  const toggleSign = () => {
    setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.slice(1) : '-' + displayValue);
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstOperand: number, secondOperand: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return firstOperand / secondOperand;
      case '%':
        return firstOperand % secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleNumberClick = (num: string) => {
    inputNumber(num);
  };

  const handleOperatorClick = (op: string) => {
    performOperation(op);
  };

  const handleEqualsClick = () => {
    const inputValue = parseFloat(displayValue);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const calculationString = `${previousValue} ${operation === '×' ? '×' : operation} ${inputValue} = ${newValue}`;
      
      setDisplayValue(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      
      // Add to history
      setCalculationHistory(prev => [calculationString, ...prev.slice(0, 9)]); // Keep last 10 calculations
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      inputNumber(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+') {
      performOperation('+');
    } else if (key === '-') {
      performOperation('-');
    } else if (key === '*') {
      performOperation('×');
    } else if (key === '/') {
      event.preventDefault();
      performOperation('÷');
    } else if (key === '%') {
      inputPercent();
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      handleEqualsClick();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      clearEntry();
    } else if (key === '±') {
      toggleSign();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayValue, previousValue, operation, waitingForOperand]);

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
                <p className="text-xs text-slate-500 dark:text-slate-400">Basic Calculator</p>
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
          <span className="text-slate-900 dark:text-white font-medium">Basic Calculator</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🧮
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Basic Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Simple arithmetic operations for everyday calculations. Perfect for quick math tasks, 
            school work, and basic computations.
          </p>
        </div>

        {/* Calculator Interface */}
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
            {/* Display */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">BASIC CALC</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
              </div>
              {/* Current Calculation Display */}
              <div className="text-left mb-2">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Calculation:</div>
                <div className="text-sm font-mono text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-700/50 p-2 rounded">
                  {previousValue !== null && operation ? `${previousValue} ${operation === '×' ? '×' : operation} ${displayValue}` : 'Ready to calculate'}
                </div>
              </div>
              {/* Result Display */}
              <div className="text-right">
                <div 
                  id="display" 
                  className="text-3xl font-mono font-bold text-slate-900 dark:text-white mb-1"
                  ref={displayRef}
                >
                  {displayValue}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {operation ? `Operation: ${operation}` : 'Ready to calculate'}
                </div>
              </div>
            </div>

            {/* Calculator Buttons */}
            <div className="grid grid-cols-4 gap-3">
              {/* First Row */}
              <button 
                onClick={clear}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-4 px-4 rounded-lg transition-colors"
              >
                AC
              </button>
              <button 
                onClick={clearEntry}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-4 px-4 rounded-lg transition-colors"
              >
                C
              </button>
              <button 
                onClick={() => inputPercent()}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-4 px-4 rounded-lg transition-colors"
              >
                %
              </button>
              <button 
                onClick={() => handleOperatorClick('÷')}
                className="col-span-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-4 rounded-lg transition-all shadow-lg"
              >
                ÷
              </button>

              {/* Number Rows */}
              {[7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '±', '='].map((key, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (typeof key === 'number') {
                      handleNumberClick(key.toString());
                    } else if (key === '.') {
                      inputDecimal();
                    } else if (key === '±') {
                      toggleSign();
                    } else if (key === '=') {
                      handleEqualsClick();
                    } else {
                      handleOperatorClick(key);
                    }
                  }}
                  className={`py-4 px-4 rounded-lg font-semibold transition-all shadow-md ${
                    typeof key === 'string' && ['×', '-', '+', '='].includes(key)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                      : 'bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200'
                  } ${
                    key === '=' ? 'row-span-2' : ''
                  }`}
                >
                  {key === '×' ? '×' : key === '±' ? '±' : key}
                </button>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Supported Operations</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Addition (+)</li>
                <li>• Subtraction (−)</li>
                <li>• Multiplication (×)</li>
                <li>• Division (÷)</li>
                <li>• Percentage calculations</li>
                <li>• Decimal numbers</li>
              </ul>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Use Cases</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Everyday calculations</li>
                <li>• School homework</li>
                <li>• Budgeting and shopping</li>
                <li>• Quick math checks</li>
                <li>• Basic financial calculations</li>
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
                        const result = calc.split(' = ')[1];
                        setDisplayValue(result);
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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
        <div className="text-center mt-12">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            ← Back to Calculator Selection
          </Link>
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