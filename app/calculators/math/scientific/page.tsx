"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

export default function ScientificCalculator() {
  // State management for calculator
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
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

  // Scientific functions
  const calculateSin = () => {
    const value = parseFloat(displayValue);
    const radians = angleMode === 'deg' ? value * (Math.PI / 180) : value;
    const result = Math.sin(radians);
    setDisplayValue(String(result));
    addToHistory(`${angleMode === 'deg' ? 'sin(' + value + '°)' : 'sin(' + value + ' rad)'}`, result);
  };

  const calculateCos = () => {
    const value = parseFloat(displayValue);
    const radians = angleMode === 'deg' ? value * (Math.PI / 180) : value;
    const result = Math.cos(radians);
    setDisplayValue(String(result));
    addToHistory(`${angleMode === 'deg' ? 'cos(' + value + '°)' : 'cos(' + value + ' rad)'}`, result);
  };

  const calculateTan = () => {
    const value = parseFloat(displayValue);
    const radians = angleMode === 'deg' ? value * (Math.PI / 180) : value;
    const result = Math.tan(radians);
    setDisplayValue(String(result));
    addToHistory(`${angleMode === 'deg' ? 'tan(' + value + '°)' : 'tan(' + value + ' rad)'}`, result);
  };

  const calculateAsin = () => {
    const value = parseFloat(displayValue);
    if (value < -1 || value > 1) {
      setDisplayValue('Error');
      return;
    }
    const result = Math.asin(value);
    const degrees = angleMode === 'deg' ? result * (180 / Math.PI) : result;
    setDisplayValue(String(degrees));
    addToHistory(`${angleMode === 'deg' ? 'asin(' + value + ')°' : 'asin(' + value + ') rad'}`, degrees);
  };

  const calculateAcos = () => {
    const value = parseFloat(displayValue);
    if (value < -1 || value > 1) {
      setDisplayValue('Error');
      return;
    }
    const result = Math.acos(value);
    const degrees = angleMode === 'deg' ? result * (180 / Math.PI) : result;
    setDisplayValue(String(degrees));
    addToHistory(`${angleMode === 'deg' ? 'acos(' + value + ')°' : 'acos(' + value + ') rad'}`, degrees);
  };

  const calculateAtan = () => {
    const value = parseFloat(displayValue);
    const result = Math.atan(value);
    const degrees = angleMode === 'deg' ? result * (180 / Math.PI) : result;
    setDisplayValue(String(degrees));
    addToHistory(`${angleMode === 'deg' ? 'atan(' + value + ')°' : 'atan(' + value + ') rad'}`, degrees);
  };

  const calculateLog = () => {
    const value = parseFloat(displayValue);
    if (value <= 0) {
      setDisplayValue('Error');
      return;
    }
    const result = Math.log10(value);
    setDisplayValue(String(result));
    addToHistory(`log(${value})`, result);
  };

  const calculateLn = () => {
    const value = parseFloat(displayValue);
    if (value <= 0) {
      setDisplayValue('Error');
      return;
    }
    const result = Math.log(value);
    setDisplayValue(String(result));
    addToHistory(`ln(${value})`, result);
  };

  const calculateExp = () => {
    const value = parseFloat(displayValue);
    const result = Math.exp(value);
    setDisplayValue(String(result));
    addToHistory(`e^(${value})`, result);
  };

  const calculatePower2 = () => {
    const value = parseFloat(displayValue);
    const result = Math.pow(value, 2);
    setDisplayValue(String(result));
    addToHistory(`${value}²`, result);
  };

  const calculatePower3 = () => {
    const value = parseFloat(displayValue);
    const result = Math.pow(value, 3);
    setDisplayValue(String(result));
    addToHistory(`${value}³`, result);
  };

  const calculatePowerY = () => {
    const inputValue = parseFloat(displayValue);
    if (previousValue === null) {
      setPreviousValue(inputValue);
      setOperation('^');
      setWaitingForOperand(true);
    } else {
      const result = Math.pow(previousValue, inputValue);
      setDisplayValue(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
      addToHistory(`${previousValue}^(${inputValue})`, result);
    }
  };

  const calculateSqrt = () => {
    const value = parseFloat(displayValue);
    if (value < 0) {
      setDisplayValue('Error');
      return;
    }
    const result = Math.sqrt(value);
    setDisplayValue(String(result));
    addToHistory(`√${value}`, result);
  };

  const calculateCbrt = () => {
    const value = parseFloat(displayValue);
    const result = Math.cbrt(value);
    setDisplayValue(String(result));
    addToHistory(`∛${value}`, result);
  };

  const calculateFactorial = () => {
    const value = parseInt(displayValue);
    if (value < 0) {
      setDisplayValue('Error');
      return;
    }
    let result = 1;
    for (let i = 2; i <= value; i++) {
      result *= i;
    }
    setDisplayValue(String(result));
    addToHistory(`${value}!`, result);
  };

  const calculateAbs = () => {
    const value = parseFloat(displayValue);
    const result = Math.abs(value);
    setDisplayValue(String(result));
    addToHistory(`|${value}|`, result);
  };

  const calculatePi = () => {
    setDisplayValue(String(Math.PI));
    addToHistory('π', Math.PI);
  };

  const calculateE = () => {
    setDisplayValue(String(Math.E));
    addToHistory('e', Math.E);
  };

  // Memory functions
  const memoryStore = () => {
    setMemory(parseFloat(displayValue));
  };

  const memoryRecall = () => {
    setDisplayValue(String(memory));
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(displayValue));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(displayValue));
  };

  const toggleAngleMode = () => {
    setAngleMode(angleMode === 'deg' ? 'rad' : 'deg');
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
      setDisplayValue(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      
      // Add to history
      const calculationString = `${previousValue} ${operation === '×' ? '×' : operation} ${inputValue} = ${newValue}`;
      setCalculationHistory(prev => [calculationString, ...prev.slice(0, 9)]);
    }
  };

  const addToHistory = (operation: string, result: number) => {
    const historyEntry = `${operation} = ${result}`;
    setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
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
                <p className="text-xs text-slate-500 dark:text-slate-400">Scientific Calculator</p>
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
          <Link href="/calculators/math" className="hover:text-slate-900 dark:hover:text-white transition-colors">Math</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900 dark:text-white font-medium">Scientific Calculator</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🔬
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Scientific Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Advanced mathematical functions for students and professionals. 
            Includes trigonometry, logarithms, exponents, and scientific constants.
          </p>
        </div>

        {/* Calculator Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
            {/* Display */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">SCIENTIFIC CALC</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
              </div>
              {/* Angle Mode Indicator */}
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Mode: {angleMode === 'deg' ? 'DEG' : 'RAD'}
                </div>
                <button
                  onClick={toggleAngleMode}
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                >
                  Toggle {angleMode === 'deg' ? 'RAD' : 'DEG'}
                </button>
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
            <div className="grid grid-cols-6 gap-3">
              {/* First Row - Memory and Constants */}
              <button 
                onClick={memoryClear}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                MC
              </button>
              <button 
                onClick={memoryRecall}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                MR
              </button>
              <button 
                onClick={memoryStore}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                MS
              </button>
              <button 
                onClick={memoryAdd}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                M+
              </button>
              <button 
                onClick={memorySubtract}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                M-
              </button>
              <button 
                onClick={calculatePi}
                className="col-span-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                π
              </button>

              {/* Second Row - Trigonometry */}
              <button 
                onClick={calculateSin}
                className="col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                sin
              </button>
              <button 
                onClick={calculateCos}
                className="col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                cos
              </button>
              <button 
                onClick={calculateTan}
                className="col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                tan
              </button>
              <button 
                onClick={calculateAsin}
                className="col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                sin⁻¹
              </button>
              <button 
                onClick={calculateAcos}
                className="col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                cos⁻¹
              </button>
              <button 
                onClick={calculateAtan}
                className="col-span-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                tan⁻¹
              </button>

              {/* Third Row - Logarithms and Exponents */}
              <button 
                onClick={calculateLog}
                className="col-span-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                log
              </button>
              <button 
                onClick={calculateLn}
                className="col-span-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                ln
              </button>
              <button 
                onClick={calculateExp}
                className="col-span-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                eˣ
              </button>
              <button 
                onClick={calculatePower2}
                className="col-span-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                x²
              </button>
              <button 
                onClick={calculatePower3}
                className="col-span-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                x³
              </button>
              <button 
                onClick={calculatePowerY}
                className="col-span-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                xʸ
              </button>

              {/* Fourth Row - Roots and Advanced Functions */}
              <button 
                onClick={calculateSqrt}
                className="col-span-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                √x
              </button>
              <button 
                onClick={calculateCbrt}
                className="col-span-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                ∛x
              </button>
              <button 
                onClick={calculateFactorial}
                className="col-span-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                x!
              </button>
              <button 
                onClick={calculateAbs}
                className="col-span-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                |x|
              </button>
              <button 
                onClick={calculateE}
                className="col-span-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                e
              </button>
              <button 
                onClick={() => inputPercent()}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                %
              </button>

              {/* Fifth Row - Basic Operations */}
              <button 
                onClick={clear}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                AC
              </button>
              <button 
                onClick={clearEntry}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                C
              </button>
              <button 
                onClick={toggleSign}
                className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                ±
              </button>
              <button 
                onClick={() => handleOperatorClick('÷')}
                className="col-span-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                ÷
              </button>
              <button 
                onClick={() => handleOperatorClick('×')}
                className="col-span-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                ×
              </button>
              <button 
                onClick={() => handleOperatorClick('-')}
                className="col-span-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                −
              </button>

              {/* Sixth Row - Numbers and Equals */}
              <button 
                onClick={() => handleNumberClick('7')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                7
              </button>
              <button 
                onClick={() => handleNumberClick('8')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                8
              </button>
              <button 
                onClick={() => handleNumberClick('9')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                9
              </button>
              <button 
                onClick={() => handleNumberClick('4')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                4
              </button>
              <button 
                onClick={() => handleNumberClick('5')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                5
              </button>
              <button 
                onClick={() => handleNumberClick('6')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                6
              </button>

              {/* Seventh Row - More Numbers */}
              <button 
                onClick={() => handleNumberClick('1')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                1
              </button>
              <button 
                onClick={() => handleNumberClick('2')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                2
              </button>
              <button 
                onClick={() => handleNumberClick('3')}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                3
              </button>
              <button 
                onClick={() => handleNumberClick('0')}
                className="col-span-2 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                0
              </button>
              <button 
                onClick={inputDecimal}
                className="col-span-1 bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
              >
                .
              </button>
              <button 
                onClick={() => handleOperatorClick('+')}
                className="col-span-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                +
              </button>

              {/* Eighth Row - Equals */}
              <button 
                onClick={handleEqualsClick}
                className="col-span-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-sm"
              >
                =
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Trigonometry Functions</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• sin, cos, tan (with degree/radian mode)</li>
                <li>• sin⁻¹, cos⁻¹, tan⁻¹ (inverse functions)</li>
                <li>• Automatic angle conversion</li>
                <li>• Error handling for invalid inputs</li>
              </ul>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Advanced Operations</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Logarithms: log (base 10) and ln (natural)</li>
                <li>• Exponents: x², x³, xʸ, eˣ</li>
                <li>• Roots: √x, ∛x</li>
                <li>• Constants: π, e</li>
                <li>• Memory functions: M+, M-, MR, MC</li>
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