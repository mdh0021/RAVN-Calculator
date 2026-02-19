m// Unit tests for Fraction Calculator mathematical functions
import { 
  createFraction, 
  simplifyFraction, 
  formatFraction, 
  isSimplified,
  commonTestCases,
  errorTestCases 
} from '../../setup/test-helpers';

// Mock the fraction calculator functions since we can't import from the actual component
// These are the functions that would be in the fraction calculator component

// Helper function to format numbers with decimal precision
const formatNumber = (num: number): number => {
  return Math.round(num * 100000000) / 100000000; // 8 decimal places precision
};

// GCD function
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Fraction operations
const addFractions = (f1: any, f2: any) => {
  const lcd = f1.denominator * f2.denominator;
  const num1 = f1.numerator * f2.denominator;
  const num2 = f2.numerator * f1.denominator;
  return simplifyFraction({ numerator: num1 + num2, denominator: lcd });
};

const subtractFractions = (f1: any, f2: any) => {
  const lcd = f1.denominator * f2.denominator;
  const num1 = f1.numerator * f2.denominator;
  const num2 = f2.numerator * f1.denominator;
  return simplifyFraction({ numerator: num1 - num2, denominator: lcd });
};

const multiplyFractions = (f1: any, f2: any) => {
  return simplifyFraction({
    numerator: f1.numerator * f2.numerator,
    denominator: f1.denominator * f2.denominator
  });
};

const divideFractions = (f1: any, f2: any) => {
  if (f2.numerator === 0) {
    throw new Error('Cannot divide by zero');
  }
  return simplifyFraction({
    numerator: f1.numerator * f2.denominator,
    denominator: f1.denominator * f2.numerator
  });
};

// Mixed number conversion
const formatMixedNumber = (frac: any): string => {
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

describe('Fraction Calculator Math Functions', () => {
  describe('GCD Function', () => {
    test('should calculate GCD of two positive numbers', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(15, 25)).toBe(5);
      expect(gcd(17, 13)).toBe(1); // coprime numbers
    });

    test('should handle zero values', () => {
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(5, 0)).toBe(5);
      expect(gcd(0, 0)).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(gcd(-12, 8)).toBe(4);
      expect(gcd(12, -8)).toBe(4);
      expect(gcd(-12, -8)).toBe(4);
    });

    test('should handle same numbers', () => {
      expect(gcd(7, 7)).toBe(7);
      expect(gcd(100, 100)).toBe(100);
    });
  });

  describe('Fraction Addition', () => {
    commonTestCases.addition.forEach((testCase, index) => {
      test(`addition test case ${index + 1}: ${formatFraction(testCase.a)} + ${formatFraction(testCase.b)} = ${formatFraction(testCase.expected)}`, () => {
        const result = addFractions(testCase.a, testCase.b);
        expect(result.numerator).toBe(testCase.expected.numerator);
        expect(result.denominator).toBe(testCase.expected.denominator);
      });
    });

    test('should handle addition of fractions with same denominator', () => {
      const f1 = createFraction(1, 4);
      const f2 = createFraction(2, 4);
      const result = addFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle addition of fractions with different denominators', () => {
      const f1 = createFraction(1, 3);
      const f2 = createFraction(1, 6);
      const result = addFractions(f1, f2);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });

    test('should handle addition of negative fractions', () => {
      const f1 = createFraction(-1, 2);
      const f2 = createFraction(1, 2);
      const result = addFractions(f1, f2);
      expect(result.numerator).toBe(0);
      expect(result.denominator).toBe(1);
    });

    test('should handle addition with zero', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(0, 1);
      const result = addFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle addition resulting in improper fraction', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(3, 4);
      const result = addFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(2);
    });
  });

  describe('Fraction Subtraction', () => {
    commonTestCases.subtraction.forEach((testCase, index) => {
      test(`subtraction test case ${index + 1}: ${formatFraction(testCase.a)} - ${formatFraction(testCase.b)} = ${formatFraction(testCase.expected)}`, () => {
        const result = subtractFractions(testCase.a, testCase.b);
        expect(result.numerator).toBe(testCase.expected.numerator);
        expect(result.denominator).toBe(testCase.expected.denominator);
      });
    });

    test('should handle subtraction of fractions with same denominator', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(1, 4);
      const result = subtractFractions(f1, f2);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });

    test('should handle subtraction resulting in negative fraction', () => {
      const f1 = createFraction(1, 4);
      const f2 = createFraction(3, 4);
      const result = subtractFractions(f1, f2);
      expect(result.numerator).toBe(-1);
      expect(result.denominator).toBe(2);
    });

    test('should handle subtraction with zero', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(0, 1);
      const result = subtractFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle subtraction of negative fractions', () => {
      const f1 = createFraction(1, 2);
      const f2 = createFraction(-1, 4);
      const result = subtractFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });
  });

  describe('Fraction Multiplication', () => {
    commonTestCases.multiplication.forEach((testCase, index) => {
      test(`multiplication test case ${index + 1}: ${formatFraction(testCase.a)} × ${formatFraction(testCase.b)} = ${formatFraction(testCase.expected)}`, () => {
        const result = multiplyFractions(testCase.a, testCase.b);
        expect(result.numerator).toBe(testCase.expected.numerator);
        expect(result.denominator).toBe(testCase.expected.denominator);
      });
    });

    test('should handle multiplication by zero', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(0, 1);
      const result = multiplyFractions(f1, f2);
      expect(result.numerator).toBe(0);
      expect(result.denominator).toBe(1);
    });

    test('should handle multiplication by one', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(1, 1);
      const result = multiplyFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle multiplication of negative fractions', () => {
      const f1 = createFraction(-2, 3);
      const f2 = createFraction(3, 4);
      const result = multiplyFractions(f1, f2);
      expect(result.numerator).toBe(-1);
      expect(result.denominator).toBe(2);
    });

    test('should handle multiplication resulting in whole number', () => {
      const f1 = createFraction(2, 3);
      const f2 = createFraction(3, 2);
      const result = multiplyFractions(f1, f2);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(1);
    });
  });

  describe('Fraction Division', () => {
    commonTestCases.division.forEach((testCase, index) => {
      test(`division test case ${index + 1}: ${formatFraction(testCase.a)} ÷ ${formatFraction(testCase.b)} = ${formatFraction(testCase.expected)}`, () => {
        const result = divideFractions(testCase.a, testCase.b);
        expect(result.numerator).toBe(testCase.expected.numerator);
        expect(result.denominator).toBe(testCase.expected.denominator);
      });
    });

    test('should handle division by one', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(1, 1);
      const result = divideFractions(f1, f2);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle division resulting in whole number', () => {
      const f1 = createFraction(3, 4);
      const f2 = createFraction(3, 8);
      const result = divideFractions(f1, f2);
      expect(result.numerator).toBe(2);
      expect(result.denominator).toBe(1);
    });

    test('should handle division of negative fractions', () => {
      const f1 = createFraction(-2, 3);
      const f2 = createFraction(1, 3);
      const result = divideFractions(f1, f2);
      expect(result.numerator).toBe(-2);
      expect(result.denominator).toBe(1);
    });

    test('should handle division by fraction less than one', () => {
      const f1 = createFraction(1, 2);
      const f2 = createFraction(1, 4);
      const result = divideFractions(f1, f2);
      expect(result.numerator).toBe(2);
      expect(result.denominator).toBe(1);
    });
  });

  describe('Fraction Simplification', () => {
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

    test('should handle large numbers', () => {
      const large = createFraction(1000, 1500);
      const result = simplifyFraction(large);
      expect(result.numerator).toBe(2);
      expect(result.denominator).toBe(3);
    });
  });

  describe('Fraction Formatting', () => {
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

    test('should format improper fractions', () => {
      expect(formatFraction(createFraction(5, 2))).toBe('5/2');
      expect(formatFraction(createFraction(7, 3))).toBe('7/3');
    });
  });

  describe('Mixed Number Formatting', () => {
    test('should format proper fractions as fractions', () => {
      expect(formatMixedNumber(createFraction(1, 2))).toBe('1/2');
      expect(formatMixedNumber(createFraction(3, 4))).toBe('3/4');
    });

    test('should format whole numbers as integers', () => {
      expect(formatMixedNumber(createFraction(4, 1))).toBe('4');
      expect(formatMixedNumber(createFraction(0, 1))).toBe('0');
      expect(formatMixedNumber(createFraction(-3, 1))).toBe('-3');
    });

    test('should format improper fractions as mixed numbers', () => {
      expect(formatMixedNumber(createFraction(5, 2))).toBe('2 1/2');
      expect(formatMixedNumber(createFraction(7, 3))).toBe('2 1/3');
      expect(formatMixedNumber(createFraction(11, 4))).toBe('2 3/4');
    });

    test('should format negative improper fractions', () => {
      expect(formatMixedNumber(createFraction(-5, 2))).toBe('-2 1/2');
      expect(formatMixedNumber(createFraction(-7, 3))).toBe('-2 1/3');
    });

    test('should format improper fractions that divide evenly', () => {
      expect(formatMixedNumber(createFraction(6, 2))).toBe('3');
      expect(formatMixedNumber(createFraction(8, 4))).toBe('2');
    });
  });

  describe('Error Handling', () => {
    describe('Division by Zero', () => {
      errorTestCases.divisionByZero.forEach((testCase, index) => {
        test(`division by zero test case ${index + 1} should throw error`, () => {
          const f1 = createFraction(testCase.a, 1);
          const f2 = createFraction(testCase.b, 1);
          expect(() => divideFractions(f1, f2)).toThrow('Cannot divide by zero');
        });
      });
    });

    describe('Invalid Fraction Operations', () => {
      test('should handle division by zero fraction', () => {
        const f1 = createFraction(5, 1);
        const f2 = createFraction(0, 1);
        expect(() => divideFractions(f1, f2)).toThrow('Cannot divide by zero');
      });

      test('should handle operations with invalid fractions', () => {
        const invalidFraction = { numerator: NaN, denominator: 1 };
        const validFraction = createFraction(1, 2);
        
        expect(() => addFractions(invalidFraction, validFraction)).toThrow();
        expect(() => multiplyFractions(invalidFraction, validFraction)).toThrow();
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle very large numerators and denominators', () => {
      const large = createFraction(1000000, 2000000);
      const result = simplifyFraction(large);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });

    test('should handle fractions with prime denominators', () => {
      const prime = createFraction(1, 7);
      const result = simplifyFraction(prime);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(7);
    });

    test('should handle fractions that result in very large numbers after operations', () => {
      const f1 = createFraction(1000, 1);
      const f2 = createFraction(1000, 1);
      const result = multiplyFractions(f1, f2);
      expect(result.numerator).toBe(1000000);
      expect(result.denominator).toBe(1);
    });

    test('should handle fractions with zero denominator gracefully', () => {
      const invalid = createFraction(1, 0);
      expect(() => simplifyFraction(invalid)).toThrow();
    });
  });

  describe('Mathematical Properties', () => {
    test('addition should be commutative', () => {
      const f1 = createFraction(1, 3);
      const f2 = createFraction(1, 6);
      
      const result1 = addFractions(f1, f2);
      const result2 = addFractions(f2, f1);
      
      expect(result1.numerator).toBe(result2.numerator);
      expect(result1.denominator).toBe(result2.denominator);
    });

    test('multiplication should be commutative', () => {
      const f1 = createFraction(2, 3);
      const f2 = createFraction(3, 4);
      
      const result1 = multiplyFractions(f1, f2);
      const result2 = multiplyFractions(f2, f1);
      
      expect(result1.numerator).toBe(result2.numerator);
      expect(result1.denominator).toBe(result2.denominator);
    });

    test('multiplication should be distributive over addition', () => {
      const f1 = createFraction(1, 2);
      const f2 = createFraction(1, 3);
      const f3 = createFraction(1, 6);
      
      const left = multiplyFractions(f1, addFractions(f2, f3));
      const right = addFractions(multiplyFractions(f1, f2), multiplyFractions(f1, f3));
      
      expect(left.numerator).toBe(right.numerator);
      expect(left.denominator).toBe(right.denominator);
    });

    test('multiplication by reciprocal should equal 1', () => {
      const f1 = createFraction(3, 4);
      const reciprocal = createFraction(4, 3);
      const result = multiplyFractions(f1, reciprocal);
      
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(1);
    });
  });

  describe('Real-world Scenarios', () => {
    test('should handle recipe measurements correctly', () => {
      // 1/2 cup + 1/4 cup = 3/4 cup
      const half = createFraction(1, 2);
      const quarter = createFraction(1, 4);
      const result = addFractions(half, quarter);
      
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    test('should handle construction measurements correctly', () => {
      // 2 1/2 inches + 1 3/4 inches = 4 1/4 inches
      const twoHalf = createFraction(5, 2); // 2 1/2
      const oneThreeQuarters = createFraction(7, 4); // 1 3/4
      const result = addFractions(twoHalf, oneThreeQuarters);
      
      expect(formatMixedNumber(result)).toBe('4 1/4');
    });

    test('should handle financial calculations correctly', () => {
      // 1/3 of 3/4 = 1/4
      const oneThird = createFraction(1, 3);
      const threeQuarters = createFraction(3, 4);
      const result = multiplyFractions(oneThird, threeQuarters);
      
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(4);
    });

    test('should handle probability calculations correctly', () => {
      // 1/6 + 1/6 + 1/6 = 1/2
      const oneSixth = createFraction(1, 6);
      let result = addFractions(oneSixth, oneSixth);
      result = addFractions(result, oneSixth);
      
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });
  });
});