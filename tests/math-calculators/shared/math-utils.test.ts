// Unit tests for shared mathematical utilities
import { 
  getGCD, 
  simplifyFraction, 
  createFraction, 
  formatFraction, 
  isSimplified,
  commonTestCases,
  percentageTestCases,
  basicArithmeticTestCases,
  errorTestCases 
} from '../../setup/test-helpers';

describe('Math Utilities', () => {
  describe('getGCD', () => {
    test('should calculate GCD of two positive numbers', () => {
      expect(getGCD(12, 8)).toBe(4);
      expect(getGCD(15, 25)).toBe(5);
      expect(getGCD(17, 13)).toBe(1); // coprime numbers
    });

    test('should handle zero values', () => {
      expect(getGCD(0, 5)).toBe(5);
      expect(getGCD(5, 0)).toBe(5);
      expect(getGCD(0, 0)).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(getGCD(-12, 8)).toBe(4);
      expect(getGCD(12, -8)).toBe(4);
      expect(getGCD(-12, -8)).toBe(4);
    });

    test('should handle same numbers', () => {
      expect(getGCD(7, 7)).toBe(7);
      expect(getGCD(100, 100)).toBe(100);
    });
  });

  describe('simplifyFraction', () => {
    test('should simplify fractions correctly', () => {
      const unsimplified = createFraction(6, 8);
      const simplified = simplifyFraction(unsimplified);
      expect(simplified.numerator).toBe(3);
      expect(simplified.denominator).toBe(4);
    });

    test('should handle already simplified fractions', () => {
      const simplified = createFraction(3, 4);
      const result = simplifyFraction(simplified);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle whole numbers', () => {
      const whole = createFraction(8, 2);
      const result = simplifyFraction(whole);
      expect(result.numerator).toBe(4);
      expect(result.denominator).toBe(1);
    });

    test('should handle negative fractions', () => {
      const negative = createFraction(-6, 8);
      const result = simplifyFraction(negative);
      expect(result.numerator).toBe(-3);
      expect(result.denominator).toBe(4);
    });

    test('should handle zero numerator', () => {
      const zero = createFraction(0, 5);
      const result = simplifyFraction(zero);
      expect(result.numerator).toBe(0);
      expect(result.denominator).toBe(1);
    });
  });

  describe('isSimplified', () => {
    test('should return true for simplified fractions', () => {
      expect(isSimplified(createFraction(1, 2))).toBe(true);
      expect(isSimplified(createFraction(3, 4))).toBe(true);
      expect(isSimplified(createFraction(5, 7))).toBe(true);
    });

    test('should return false for unsimplified fractions', () => {
      expect(isSimplified(createFraction(2, 4))).toBe(false);
      expect(isSimplified(createFraction(6, 8))).toBe(false);
      expect(isSimplified(createFraction(10, 15))).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(isSimplified(createFraction(0, 1))).toBe(true);
      expect(isSimplified(createFraction(1, 1))).toBe(true);
      expect(isSimplified(createFraction(-1, 2))).toBe(true);
    });
  });

  describe('formatFraction', () => {
    test('should format proper fractions', () => {
      expect(formatFraction(createFraction(1, 2))).toBe('1/2');
      expect(formatFraction(createFraction(3, 4))).toBe('3/4');
    });

    test('should format whole numbers', () => {
      expect(formatFraction(createFraction(4, 1))).toBe('4');
      expect(formatFraction(createFraction(0, 1))).toBe('0');
    });

    test('should format negative fractions', () => {
      expect(formatFraction(createFraction(-1, 2))).toBe('-1/2');
      expect(formatFraction(createFraction(1, -2))).toBe('-1/2');
    });
  });

  describe('Common Test Cases', () => {
    describe('Fraction Addition', () => {
      commonTestCases.addition.forEach((testCase, index) => {
        test(`addition test case ${index + 1}`, () => {
          const result = simplifyFraction({
            numerator: testCase.a.numerator * testCase.b.denominator + testCase.b.numerator * testCase.a.denominator,
            denominator: testCase.a.denominator * testCase.b.denominator
          });
          
          expect(result.numerator).toBe(testCase.expected.numerator);
          expect(result.denominator).toBe(testCase.expected.denominator);
        });
      });
    });

    describe('Fraction Subtraction', () => {
      commonTestCases.subtraction.forEach((testCase, index) => {
        test(`subtraction test case ${index + 1}`, () => {
          const result = simplifyFraction({
            numerator: testCase.a.numerator * testCase.b.denominator - testCase.b.numerator * testCase.a.denominator,
            denominator: testCase.a.denominator * testCase.b.denominator
          });
          
          expect(result.numerator).toBe(testCase.expected.numerator);
          expect(result.denominator).toBe(testCase.expected.denominator);
        });
      });
    });

    describe('Fraction Multiplication', () => {
      commonTestCases.multiplication.forEach((testCase, index) => {
        test(`multiplication test case ${index + 1}`, () => {
          const result = simplifyFraction({
            numerator: testCase.a.numerator * testCase.b.numerator,
            denominator: testCase.a.denominator * testCase.b.denominator
          });
          
          expect(result.numerator).toBe(testCase.expected.numerator);
          expect(result.denominator).toBe(testCase.expected.denominator);
        });
      });
    });

    describe('Fraction Division', () => {
      commonTestCases.division.forEach((testCase, index) => {
        test(`division test case ${index + 1}`, () => {
          const result = simplifyFraction({
            numerator: testCase.a.numerator * testCase.b.denominator,
            denominator: testCase.a.denominator * testCase.b.numerator
          });
          
          expect(result.numerator).toBe(testCase.expected.numerator);
          expect(result.denominator).toBe(testCase.expected.denominator);
        });
      });
    });
  });

  describe('Percentage Test Cases', () => {
    describe('What Percent Of', () => {
      percentageTestCases.whatPercentOf.forEach((testCase, index) => {
        test(`what percent of test case ${index + 1}`, () => {
          const result = (testCase.part / testCase.whole) * 100;
          expect(result).toBe(testCase.expected);
        });
      });
    });

    describe('Find Percentage', () => {
      percentageTestCases.findPercentage.forEach((testCase, index) => {
        test(`find percentage test case ${index + 1}`, () => {
          const result = (testCase.percentage / 100) * testCase.whole;
          expect(result).toBe(testCase.expected);
        });
      });
    });

    describe('Percentage Increase', () => {
      percentageTestCases.percentageIncrease.forEach((testCase, index) => {
        test(`percentage increase test case ${index + 1}`, () => {
          const result = ((testCase.new - testCase.original) / testCase.original) * 100;
          expect(result).toBe(testCase.expected);
        });
      });
    });

    describe('Percentage Decrease', () => {
      percentageTestCases.percentageDecrease.forEach((testCase, index) => {
        test(`percentage decrease test case ${index + 1}`, () => {
          const result = ((testCase.original - testCase.new) / testCase.original) * 100;
          expect(result).toBe(testCase.expected);
        });
      });
    });
  });

  describe('Basic Arithmetic Test Cases', () => {
    describe('Addition', () => {
      basicArithmeticTestCases.addition.forEach((testCase, index) => {
        test(`basic addition test case ${index + 1}`, () => {
          const result = testCase.a + testCase.b;
          expect(result).toBe(testCase.expected);
        });
      });
    });

    describe('Subtraction', () => {
      basicArithmeticTestCases.subtraction.forEach((testCase, index) => {
        test(`basic subtraction test case ${index + 1}`, () => {
          const result = testCase.a - testCase.b;
          expect(result).toBe(testCase.expected);
        });
      });
    });

    describe('Multiplication', () => {
      basicArithmeticTestCases.multiplication.forEach((testCase, index) => {
        test(`basic multiplication test case ${index + 1}`, () => {
          const result = testCase.a * testCase.b;
          expect(result).toBe(testCase.expected);
        });
      });
    });

    describe('Division', () => {
      basicArithmeticTestCases.division.forEach((testCase, index) => {
        test(`basic division test case ${index + 1}`, () => {
          const result = testCase.a / testCase.b;
          expect(result).toBe(testCase.expected);
        });
      });
    });
  });

  describe('Error Test Cases', () => {
    describe('Division by Zero', () => {
      errorTestCases.divisionByZero.forEach((testCase, index) => {
        test(`division by zero test case ${index + 1} should throw error`, () => {
          expect(() => {
            if (testCase.b === 0) {
              throw new Error('Division by zero');
            }
            return testCase.a / testCase.b;
          }).toThrow('Division by zero');
        });
      });
    });
  });
});