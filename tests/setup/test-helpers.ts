import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function for calculator components
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any custom options here
}

export const renderCalculator = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  return render(ui, options);
};

// Helper to simulate keyboard events
export const simulateKeyPress = (key: string, element?: Element) => {
  const event = new KeyboardEvent('keydown', {
    key,
    code: key,
    bubbles: true,
  });
  
  const target = element || document.body;
  target.dispatchEvent(event);
};

// Helper to simulate number input
export const simulateNumberInput = (number: string, element?: Element) => {
  for (const digit of number) {
    simulateKeyPress(digit, element);
  }
};

// Helper to simulate operator input
export const simulateOperatorInput = (operator: string, element?: Element) => {
  simulateKeyPress(operator, element);
};

// Helper to simulate equals key
export const simulateEquals = (element?: Element) => {
  simulateKeyPress('Enter', element);
  simulateKeyPress('=', element);
};

// Helper to simulate clear operations
export const simulateClear = (type: 'all' | 'entry' = 'all', element?: Element) => {
  if (type === 'all') {
    simulateKeyPress('Escape', element);
    simulateKeyPress('c', element);
    simulateKeyPress('C', element);
  } else {
    simulateKeyPress('Backspace', element);
  }
};

// Fraction interface for testing
export interface TestFraction {
  numerator: number;
  denominator: number;
}

// Helper to create fraction objects
export const createFraction = (numerator: number, denominator: number): TestFraction => ({
  numerator,
  denominator,
});

// Helper to format fraction for display
export const formatFraction = (fraction: TestFraction): string => {
  if (fraction.denominator === 1) {
    return fraction.numerator.toString();
  }
  return `${fraction.numerator}/${fraction.denominator}`;
};

// Helper to check if fraction is simplified
export const isSimplified = (fraction: TestFraction): boolean => {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  
  const divisor = gcd(Math.abs(fraction.numerator), Math.abs(fraction.denominator));
  return divisor === 1;
};

// Helper to get GCD
export const getGCD = (a: number, b: number): number => {
  return b === 0 ? a : getGCD(b, a % b);
};

// Helper to simplify fraction
export const simplifyFraction = (fraction: TestFraction): TestFraction => {
  const divisor = getGCD(Math.abs(fraction.numerator), Math.abs(fraction.denominator));
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
};

// Test data for common fractions
export const testFractions = {
  oneHalf: createFraction(1, 2),
  oneThird: createFraction(1, 3),
  twoThirds: createFraction(2, 3),
  threeQuarters: createFraction(3, 4),
  oneQuarter: createFraction(1, 4),
  fiveEighths: createFraction(5, 8),
  sevenEighths: createFraction(7, 8),
  negativeHalf: createFraction(-1, 2),
  improperFraction: createFraction(5, 2),
  wholeNumber: createFraction(4, 1),
};

// Common test cases for mathematical operations
export const commonTestCases = {
  addition: [
    { a: createFraction(1, 2), b: createFraction(1, 3), expected: createFraction(5, 6) },
    { a: createFraction(2, 3), b: createFraction(1, 4), expected: createFraction(11, 12) },
    { a: createFraction(-1, 2), b: createFraction(1, 2), expected: createFraction(0, 1) },
  ],
  subtraction: [
    { a: createFraction(3, 4), b: createFraction(1, 2), expected: createFraction(1, 4) },
    { a: createFraction(5, 6), b: createFraction(1, 3), expected: createFraction(1, 2) },
    { a: createFraction(1, 2), b: createFraction(3, 4), expected: createFraction(-1, 4) },
  ],
  multiplication: [
    { a: createFraction(2, 3), b: createFraction(3, 4), expected: createFraction(1, 2) },
    { a: createFraction(1, 2), b: createFraction(2, 5), expected: createFraction(1, 5) },
    { a: createFraction(-2, 3), b: createFraction(3, 4), expected: createFraction(-1, 2) },
  ],
  division: [
    { a: createFraction(1, 2), b: createFraction(1, 4), expected: createFraction(2, 1) },
    { a: createFraction(3, 4), b: createFraction(2, 3), expected: createFraction(9, 8) },
    { a: createFraction(2, 5), b: createFraction(3, 10), expected: createFraction(4, 3) },
  ],
};

// Percentage calculation test cases
export const percentageTestCases = {
  whatPercentOf: [
    { part: 25, whole: 100, expected: 25 },
    { part: 15, whole: 60, expected: 25 },
    { part: 7, whole: 28, expected: 25 },
  ],
  findPercentage: [
    { percentage: 20, whole: 100, expected: 20 },
    { percentage: 15, whole: 200, expected: 30 },
    { percentage: 7.5, whole: 80, expected: 6 },
  ],
  percentageIncrease: [
    { original: 100, new: 120, expected: 20 },
    { original: 50, new: 75, expected: 50 },
    { original: 80, new: 100, expected: 25 },
  ],
  percentageDecrease: [
    { original: 100, new: 80, expected: 20 },
    { original: 200, new: 150, expected: 25 },
    { original: 60, new: 45, expected: 25 },
  ],
};

// Basic arithmetic test cases
export const basicArithmeticTestCases = {
  addition: [
    { a: 5, b: 3, expected: 8 },
    { a: -2, b: 7, expected: 5 },
    { a: 0, b: 0, expected: 0 },
    { a: 1.5, b: 2.5, expected: 4 },
  ],
  subtraction: [
    { a: 10, b: 3, expected: 7 },
    { a: 5, b: 8, expected: -3 },
    { a: 0, b: 5, expected: -5 },
    { a: 7.5, b: 2.5, expected: 5 },
  ],
  multiplication: [
    { a: 4, b: 3, expected: 12 },
    { a: -2, b: 5, expected: -10 },
    { a: 0, b: 100, expected: 0 },
    { a: 2.5, b: 4, expected: 10 },
  ],
  division: [
    { a: 12, b: 3, expected: 4 },
    { a: 15, b: 5, expected: 3 },
    { a: 7, b: 2, expected: 3.5 },
    { a: -10, b: 2, expected: -5 },
  ],
};

// Error test cases
export const errorTestCases = {
  divisionByZero: [
    { a: 5, b: 0 },
    { a: -10, b: 0 },
    { a: 0, b: 0 },
  ],
  invalidInput: [
    { input: 'abc' },
    { input: 'NaN' },
    { input: 'undefined' },
    { input: 'null' },
  ],
};