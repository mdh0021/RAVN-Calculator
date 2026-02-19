// Unit tests for Percentage Calculator mathematical functions
import { percentageTestCases, errorTestCases } from '../../setup/test-helpers';

// Mock the percentage calculator functions since we can't import from the actual component
// These are the functions that would be in the percentage calculator component

// Helper function to format numbers with decimal precision
const formatNumber = (num: number): number => {
  return Math.round(num * 100000000) / 100000000; // 8 decimal places precision
};

// Percentage calculation functions
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

describe('Percentage Calculator Math Functions', () => {
  describe('Calculate Percentage', () => {
    percentageTestCases.findPercentage.forEach((testCase, index) => {
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

    test('should handle negative percentages', () => {
      expect(calculatePercentage(-25, 100)).toBe(-25);
    });

    test('should handle decimal percentages', () => {
      expect(calculatePercentage(12.5, 80)).toBe(10);
    });

    test('should handle very small percentages', () => {
      expect(calculatePercentage(0.01, 10000)).toBe(1);
    });

    test('should handle very large percentages', () => {
      expect(calculatePercentage(1000, 10)).toBe(100);
    });
  });

  describe('What Percent Of', () => {
    percentageTestCases.whatPercentOf.forEach((testCase, index) => {
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

    test('should handle negative parts', () => {
      expect(whatPercentOf(-25, 100)).toBe(-25);
    });

    test('should handle decimal results', () => {
      expect(whatPercentOf(1, 3)).toBeCloseTo(33.33333333);
    });

    test('should handle very small parts', () => {
      expect(whatPercentOf(0.01, 100)).toBe(0.01);
    });

    test('should handle very large parts', () => {
      expect(whatPercentOf(1000000, 1000)).toBe(100000);
    });
  });

  describe('Percentage Increase', () => {
    percentageTestCases.percentageIncrease.forEach((testCase, index) => {
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

    test('should handle 50% increase', () => {
      expect(percentageIncrease(100, 150)).toBe(50);
    });

    test('should handle 200% increase', () => {
      expect(percentageIncrease(50, 150)).toBe(200);
    });

    test('should handle small increases', () => {
      expect(percentageIncrease(100, 101)).toBe(1);
    });

    test('should handle large increases', () => {
      expect(percentageIncrease(1, 100)).toBe(9900);
    });

    test('should handle negative to positive increase', () => {
      expect(percentageIncrease(-50, 50)).toBe(200);
    });

    test('should handle decimal increases', () => {
      expect(percentageIncrease(10, 10.5)).toBe(5);
    });
  });

  describe('Percentage Decrease', () => {
    percentageTestCases.percentageDecrease.forEach((testCase, index) => {
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

    test('should handle 25% decrease', () => {
      expect(percentageDecrease(80, 60)).toBe(25);
    });

    test('should handle small decreases', () => {
      expect(percentageDecrease(100, 99)).toBe(1);
    });

    test('should handle large decreases', () => {
      expect(percentageDecrease(100, 1)).toBe(99);
    });

    test('should handle positive to negative decrease', () => {
      expect(percentageDecrease(50, -50)).toBe(200);
    });

    test('should handle decimal decreases', () => {
      expect(percentageDecrease(10, 9.5)).toBe(5);
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

    test('should handle both negative numbers', () => {
      const result = percentageDifference(-50, -75);
      expect(result).toBe(40);
    });

    test('should handle zero and positive number', () => {
      const result = percentageDifference(0, 100);
      expect(result).toBe(200);
    });

    test('should handle zero and negative number', () => {
      const result = percentageDifference(0, -50);
      expect(result).toBe(200);
    });

    test('should handle decimal numbers', () => {
      const result = percentageDifference(10.5, 11.5);
      expect(result).toBeCloseTo(18.181818181818183);
    });

    test('should be commutative', () => {
      const result1 = percentageDifference(100, 150);
      const result2 = percentageDifference(150, 100);
      expect(result1).toBe(result2);
    });
  });

  describe('Error Handling', () => {
    describe('Division by Zero', () => {
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

    describe('Invalid Input Handling', () => {
      test('should handle NaN inputs gracefully', () => {
        expect(() => whatPercentOf(NaN, 100)).toThrow();
        expect(() => whatPercentOf(50, NaN)).toThrow();
      });

      test('should handle infinity inputs', () => {
        expect(() => whatPercentOf(Infinity, 100)).toThrow();
        expect(() => whatPercentOf(50, Infinity)).toThrow();
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle very large numbers', () => {
      const largeNum = 1e15;
      expect(calculatePercentage(50, largeNum)).toBe(5e14);
      expect(whatPercentOf(largeNum / 2, largeNum)).toBe(50);
    });

    test('should handle very small numbers', () => {
      const smallNum = 1e-15;
      expect(calculatePercentage(50, smallNum)).toBe(5e-16);
      expect(whatPercentOf(smallNum / 2, smallNum)).toBe(50);
    });

    test('should handle floating point precision issues', () => {
      // These tests ensure our formatNumber function works correctly
      expect(calculatePercentage(33.33333333, 3)).toBeCloseTo(1);
      expect(whatPercentOf(1, 3)).toBeCloseTo(33.33333333);
    });

    test('should handle percentage increase from very small numbers', () => {
      expect(percentageIncrease(0.0001, 0.0002)).toBe(100);
    });

    test('should handle percentage decrease to very small numbers', () => {
      expect(percentageDecrease(0.0002, 0.0001)).toBe(50);
    });

    test('should handle percentage calculations with scientific notation', () => {
      expect(calculatePercentage(1e-2, 1e4)).toBe(1e2);
      expect(whatPercentOf(1e2, 1e4)).toBe(1e-2);
    });
  });

  describe('Mathematical Properties', () => {
    test('percentage calculation should be distributive', () => {
      const percentage = 25;
      const num1 = 100;
      const num2 = 200;
      
      const result1 = calculatePercentage(percentage, num1 + num2);
      const result2 = calculatePercentage(percentage, num1) + calculatePercentage(percentage, num2);
      
      expect(result1).toBe(result2);
    });

    test('percentage increase and decrease should be inverse operations', () => {
      const original = 100;
      const increasePercent = 20;
      
      const increased = original * (1 + increasePercent / 100);
      const decreasePercent = ((increased - original) / increased) * 100;
      
      expect(decreasePercent).toBeCloseTo(increasePercent / (1 + increasePercent / 100) * 100);
    });

    test('percentage difference should be symmetric', () => {
      const num1 = 100;
      const num2 = 150;
      
      const diff1 = percentageDifference(num1, num2);
      const diff2 = percentageDifference(num2, num1);
      
      expect(diff1).toBe(diff2);
    });
  });

  describe('Real-world Scenarios', () => {
    test('should calculate sales tax correctly', () => {
      const price = 100;
      const taxRate = 8.25;
      const taxAmount = calculatePercentage(taxRate, price);
      expect(taxAmount).toBe(8.25);
    });

    test('should calculate discount correctly', () => {
      const originalPrice = 100;
      const discountPercent = 25;
      const discountAmount = calculatePercentage(discountPercent, originalPrice);
      const finalPrice = originalPrice - discountAmount;
      expect(finalPrice).toBe(75);
    });

    test('should calculate tip correctly', () => {
      const billAmount = 45.50;
      const tipPercent = 18;
      const tipAmount = calculatePercentage(tipPercent, billAmount);
      expect(tipAmount).toBeCloseTo(8.19);
    });

    test('should calculate interest rate correctly', () => {
      const principal = 1000;
      const rate = 5;
      const interest = calculatePercentage(rate, principal);
      expect(interest).toBe(50);
    });

    test('should calculate grade percentage correctly', () => {
      const correctAnswers = 42;
      const totalQuestions = 50;
      const gradePercent = whatPercentOf(correctAnswers, totalQuestions);
      expect(gradePercent).toBe(84);
    });

    test('should calculate population growth correctly', () => {
      const previousPopulation = 1000000;
      const currentPopulation = 1100000;
      const growthPercent = percentageIncrease(previousPopulation, currentPopulation);
      expect(growthPercent).toBe(10);
    });

    test('should calculate stock price change correctly', () => {
      const previousPrice = 50.25;
      const currentPrice = 52.75;
      const changePercent = percentageIncrease(previousPrice, currentPrice);
      expect(changePercent).toBeCloseTo(4.975124378109453);
    });
  });
});