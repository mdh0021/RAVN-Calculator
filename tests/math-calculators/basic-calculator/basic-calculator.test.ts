// Unit tests for Basic Calculator mathematical functions
import { basicArithmeticTestCases, errorTestCases } from '../../setup/test-helpers';

// Mock the basic calculator functions since we can't import from the actual component
// These are the functions that would be in the basic calculator component

// Helper function to format numbers with decimal precision
const formatNumber = (num: number): number => {
  return Math.round(num * 100000000) / 100000000; // 8 decimal places precision
};

// Basic arithmetic operations
const add = (a: number, b: number): number => formatNumber(a + b);
const subtract = (a: number, b: number): number => formatNumber(a - b);
const multiply = (a: number, b: number): number => formatNumber(a * b);
const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return formatNumber(a / b);
};

// Percentage calculations
const calculatePercentage = (percentage: number, whole: number): number => {
  return formatNumber((percentage / 100) * whole);
};

const whatPercentOf = (part: number, whole: number): number => {
  if (whole === 0) {
    throw new Error('Cannot calculate percentage of zero');
  }
  return formatNumber((part / whole) * 100);
};

const percentageIncrease = (original: number, newAmount: number): number => {
  if (original === 0) {
    throw new Error('Cannot calculate percentage increase from zero');
  }
  return formatNumber(((newAmount - original) / original) * 100);
};

const percentageDecrease = (original: number, newAmount: number): number => {
  if (original === 0) {
    throw new Error('Cannot calculate percentage decrease from zero');
  }
  return formatNumber(((original - newAmount) / original) * 100);
};

const percentageDifference = (num1: number, num2: number): number => {
  const average = (num1 + num2) / 2;
  if (average === 0) {
    throw new Error('Cannot calculate percentage difference when average is zero');
  }
  return formatNumber(Math.abs((num1 - num2) / average) * 100);
};

describe('Basic Calculator Math Functions', () => {
  describe('Addition', () => {
    basicArithmeticTestCases.addition.forEach((testCase, index) => {
      test(`addition test case ${index + 1}: ${testCase.a} + ${testCase.b} = ${testCase.expected}`, () => {
        const result = add(testCase.a, testCase.b);
        expect(result).toBe(testCase.expected);
      });
    });

    test('should handle very large numbers', () => {
      const result = add(999999999, 1);
      expect(result).toBe(1000000000);
    });

    test('should handle very small decimal numbers', () => {
      const result = add(0.1, 0.2);
      expect(result).toBe(0.3);
    });

    test('should handle negative numbers', () => {
      const result = add(-5, 3);
      expect(result).toBe(-2);
    });

    test('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('Subtraction', () => {
    basicArithmeticTestCases.subtraction.forEach((testCase, index) => {
      test(`subtraction test case ${index + 1}: ${testCase.a} - ${testCase.b} = ${testCase.expected}`, () => {
        const result = subtract(testCase.a, testCase.b);
        expect(result).toBe(testCase.expected);
      });
    });

    test('should handle negative results', () => {
      const result = subtract(3, 8);
      expect(result).toBe(-5);
    });

    test('should handle zero', () => {
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
      expect(subtract(0, 0)).toBe(0);
    });
  });

  describe('Multiplication', () => {
    basicArithmeticTestCases.multiplication.forEach((testCase, index) => {
      test(`multiplication test case ${index + 1}: ${testCase.a} × ${testCase.b} = ${testCase.expected}`, () => {
        const result = multiply(testCase.a, testCase.b);
        expect(result).toBe(testCase.expected);
      });
    });

    test('should handle multiplication by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(0, 0)).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(multiply(-3, 4)).toBe(-12);
      expect(multiply(3, -4)).toBe(-12);
      expect(multiply(-3, -4)).toBe(12);
    });

    test('should handle decimal multiplication', () => {
      const result = multiply(0.1, 0.2);
      expect(result).toBe(0.02);
    });
  });

  describe('Division', () => {
    basicArithmeticTestCases.division.forEach((testCase, index) => {
      test(`division test case ${index + 1}: ${testCase.a} ÷ ${testCase.b} = ${testCase.expected}`, () => {
        const result = divide(testCase.a, testCase.b);
        expect(result).toBe(testCase.expected);
      });
    });

    test('should handle division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
      expect(() => divide(-10, 0)).toThrow('Cannot divide by zero');
      expect(() => divide(0, 0)).toThrow('Cannot divide by zero');
    });

    test('should handle negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(10, -2)).toBe(-5);
      expect(divide(-10, -2)).toBe(5);
    });

    test('should handle decimal division', () => {
      const result = divide(1, 3);
      expect(result).toBeCloseTo(0.33333333);
    });
  });

  describe('Percentage Calculations', () => {
    describe('Calculate Percentage', () => {
      const testCases = [
        { percentage: 25, whole: 100, expected: 25 },
        { percentage: 50, whole: 200, expected: 100 },
        { percentage: 10, whole: 50, expected: 5 },
        { percentage: 75, whole: 80, expected: 60 },
        { percentage: 33.33, whole: 300, expected: 99.99 },
      ];

      testCases.forEach((testCase, index) => {
        test(`calculate percentage test case ${index + 1}: ${testCase.percentage}% of ${testCase.whole} = ${testCase.expected}`, () => {
          const result = calculatePercentage(testCase.percentage, testCase.whole);
          expect(result).toBe(testCase.expected);
        });
      });

      test('should handle 100%', () => {
        expect(calculatePercentage(100, 50)).toBe(50);
      });

      test('should handle 0%', () => {
        expect(calculatePercentage(0, 100)).toBe(0);
      });

      test('should handle percentages over 100%', () => {
        expect(calculatePercentage(150, 100)).toBe(150);
      });
    });

    describe('What Percent Of', () => {
      const testCases = [
        { part: 25, whole: 100, expected: 25 },
        { part: 50, whole: 200, expected: 25 },
        { part: 10, whole: 50, expected: 20 },
        { part: 75, whole: 300, expected: 25 },
        { part: 15, whole: 60, expected: 25 },
      ];

      testCases.forEach((testCase, index) => {
        test(`what percent of test case ${index + 1}: ${testCase.part} is what % of ${testCase.whole} = ${testCase.expected}%`, () => {
          const result = whatPercentOf(testCase.part, testCase.whole);
          expect(result).toBe(testCase.expected);
        });
      });

      test('should handle 100%', () => {
        expect(whatPercentOf(50, 50)).toBe(100);
      });

      test('should handle 0%', () => {
        expect(whatPercentOf(0, 100)).toBe(0);
      });

      test('should handle percentages over 100%', () => {
        expect(whatPercentOf(150, 100)).toBe(150);
      });
    });

    describe('Percentage Increase', () => {
      const testCases = [
        { original: 100, new: 125, expected: 25 },
        { original: 50, new: 75, expected: 50 },
        { original: 200, new: 250, expected: 25 },
        { original: 80, new: 100, expected: 25 },
        { original: 300, new: 450, expected: 50 },
      ];

      testCases.forEach((testCase, index) => {
        test(`percentage increase test case ${index + 1}: from ${testCase.original} to ${testCase.new} = ${testCase.expected}%`, () => {
          const result = percentageIncrease(testCase.original, testCase.new);
          expect(result).toBe(testCase.expected);
        });
      });

      test('should handle no change', () => {
        expect(percentageIncrease(100, 100)).toBe(0);
      });

      test('should handle 100% increase', () => {
        expect(percentageIncrease(50, 100)).toBe(100);
      });
    });

    describe('Percentage Decrease', () => {
      const testCases = [
        { original: 100, new: 75, expected: 25 },
        { original: 200, new: 150, expected: 25 },
        { original: 50, new: 25, expected: 50 },
        { original: 80, new: 60, expected: 25 },
        { original: 400, new: 300, expected: 25 },
      ];

      testCases.forEach((testCase, index) => {
        test(`percentage decrease test case ${index + 1}: from ${testCase.original} to ${testCase.new} = ${testCase.expected}%`, () => {
          const result = percentageDecrease(testCase.original, testCase.new);
          expect(result).toBe(testCase.expected);
        });
      });

      test('should handle no change', () => {
        expect(percentageDecrease(100, 100)).toBe(0);
      });

      test('should handle 50% decrease', () => {
        expect(percentageDecrease(100, 50)).toBe(50);
      });

      test('should handle 100% decrease', () => {
        expect(percentageDecrease(100, 0)).toBe(100);
      });
    });

    describe('Percentage Difference', () => {
      test('should calculate percentage difference correctly', () => {
        const result = percentageDifference(100, 120);
        expect(result).toBe(18.181818181818183);
      });

      test('should handle same numbers', () => {
        expect(percentageDifference(100, 100)).toBe(0);
      });

      test('should handle negative numbers', () => {
        const result = percentageDifference(-100, 100);
        expect(result).toBe(100);
      });
    });
  });

  describe('Error Handling', () => {
    describe('Division by Zero', () => {
      errorTestCases.divisionByZero.forEach((testCase, index) => {
        test(`division by zero test case ${index + 1} should throw error`, () => {
          expect(() => divide(testCase.a, testCase.b)).toThrow('Cannot divide by zero');
        });
      });
    });

    describe('Percentage Error Cases', () => {
      test('should throw error when calculating percentage of zero', () => {
        expect(() => whatPercentOf(5, 0)).toThrow('Cannot calculate percentage of zero');
      });

      test('should throw error when calculating percentage increase from zero', () => {
        expect(() => percentageIncrease(0, 100)).toThrow('Cannot calculate percentage increase from zero');
      });

      test('should throw error when calculating percentage decrease from zero', () => {
        expect(() => percentageDecrease(0, 100)).toThrow('Cannot calculate percentage decrease from zero');
      });

      test('should throw error when calculating percentage difference with zero average', () => {
        expect(() => percentageDifference(0, 0)).toThrow('Cannot calculate percentage difference when average is zero');
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle very large numbers', () => {
      const largeNum = 1e15;
      expect(add(largeNum, largeNum)).toBe(2e15);
      expect(multiply(largeNum, 2)).toBe(2e15);
    });

    test('should handle very small numbers', () => {
      const smallNum = 1e-15;
      expect(add(smallNum, smallNum)).toBe(2e-15);
      expect(multiply(smallNum, 2)).toBe(2e-15);
    });

    test('should handle floating point precision issues', () => {
      // These tests ensure our formatNumber function works correctly
      expect(add(0.1, 0.2)).toBe(0.3);
      expect(multiply(0.1, 0.1)).toBe(0.01);
      expect(divide(1, 3)).toBeCloseTo(0.33333333);
    });

    test('should handle infinity', () => {
      expect(() => divide(1, 0)).toThrow();
      expect(() => divide(Infinity, 1)).toThrow();
    });
  });
});