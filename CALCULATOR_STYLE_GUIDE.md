# RAVN Calculator Style Guide & Component Specification

This document serves as a comprehensive style guide and component specification for implementing consistent calculators across the RAVN Calculator application.

## Table of Contents
1. [Design System](#design-system)
2. [Layout Structure](#layout-structure)
3. [Component Specifications](#component-specifications)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Interactive Elements](#interactive-elements)
7. [Calculator-Specific Components](#calculator-specific-components)
8. [Implementation Patterns](#implementation-patterns)

## Design System

### Theme
- **Light Mode**: Clean, modern interface with subtle gradients
- **Dark Mode**: High contrast with deep backgrounds and accent colors
- **Transitions**: Smooth animations (200-300ms) for all interactive elements
- **Shadows**: Subtle shadow effects for depth and separation

### Spacing System
- **Container Padding**: `px-4 sm:px-6 lg:px-8`
- **Section Spacing**: `mb-8`, `mt-12`, `space-y-6`
- **Component Padding**: `p-6`, `p-8` for main containers
- **Button Padding**: `py-4 px-4` for calculator buttons

## Layout Structure

### 1. Main Layout Wrapper
```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
```

### 2. Header Section
```tsx
<header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      {/* Logo and Title */}
      {/* Navigation */}
    </div>
  </div>
</header>
```

### 3. Main Content Area
```tsx
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  {/* Breadcrumb */}
  {/* Calculator Interface */}
  {/* Feature Sections */}
  {/* Navigation Buttons */}
</main>
```

### 4. Footer Section
```tsx
<footer className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50 mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Footer Content */}
  </div>
</footer>
```

## Component Specifications

### Breadcrumb Navigation
```tsx
<nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
  <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
  <span className="mx-2">›</span>
  <Link href="/calculators" className="hover:text-slate-900 dark:hover:text-white transition-colors">Calculators</Link>
  <span className="mx-2">›</span>
  <span className="text-slate-900 dark:text-white font-medium">Calculator Name</span>
</nav>
```

### Calculator Container
```tsx
<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
  {/* Calculator Display */}
  {/* Calculator Buttons Grid */}
</div>
```

### Calculator Display
```tsx
<div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6 mb-6">
  {/* Header with title and status indicators */}
  {/* Current calculation display */}
  {/* Result display */}
</div>
```

### Calculator Buttons Grid
```tsx
<div className="grid grid-cols-4 gap-3">
  {/* Button components */}
</div>
```

## Color System

### Primary Colors
- **Main Gradient**: `from-blue-500 to-indigo-600`
- **Secondary**: `from-indigo-500 to-indigo-600`
- **Success**: `from-green-500 to-green-600`
- **Warning**: `from-yellow-500 to-orange-600`
- **Error**: `from-red-500 to-red-600`

### Button Color System
- **Operator Buttons**: `bg-gradient-to-r from-blue-500 to-indigo-600`
- **Number Buttons**: `bg-white dark:bg-slate-600`
- **Function Buttons**: `bg-slate-100 dark:bg-slate-700`
- **Equal Button**: `bg-gradient-to-r from-blue-500 to-indigo-600` (special styling)

### Text Colors
- **Primary Text**: `text-slate-900 dark:text-white`
- **Secondary Text**: `text-slate-600 dark:text-slate-300`
- **Muted Text**: `text-slate-500 dark:text-slate-400`
- **Accent Text**: `text-blue-600 dark:text-blue-400`

## Typography

### Font System
- **Primary Font**: System fonts with fallbacks
- **Monospace**: For calculator displays and code-like elements
- **Headings**: Bold weights for calculator titles

### Text Sizes
- **Main Title**: `text-4xl lg:text-5xl font-bold`
- **Section Headers**: `text-lg font-bold`
- **Body Text**: `text-lg` or `text-base`
- **Small Text**: `text-sm` or `text-xs`

## Interactive Elements

### Navigation Buttons
```tsx
<Link
  href="/calculators/math"
  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
>
  ← Back to Math & Number Calculators
</Link>
```

### Secondary Links
```tsx
<Link
  href="/calculators"
  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
>
  All Calculators
</Link>
```

### Feature Tags
```tsx
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded">
  Feature Name
</span>
```

## Calculator-Specific Components

### Calculator Button Component
```tsx
<button
  onClick={handleClick}
  className={`py-4 px-4 rounded-lg font-semibold transition-all shadow-md ${
    isOperator
      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
      : 'bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200'
  } ${isLarge ? 'row-span-2' : ''}`}
>
  {label}
</button>
```

### Status Indicator
```tsx
<div className="flex gap-2">
  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
</div>
```

### History Item
```tsx
<div className="text-sm font-mono text-slate-600 dark:text-slate-300 bg-white/30 dark:bg-slate-700/30 p-2 rounded flex items-center justify-between">
  <span>{calculation}</span>
  <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
    Use Result
  </button>
</div>
```

## Implementation Patterns

### State Management
```tsx
const [displayValue, setDisplayValue] = useState<string>("0");
const [previousValue, setPreviousValue] = useState<number | null>(null);
const [operation, setOperation] = useState<string | null>(null);
const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
const [calculationHistory, setCalculationHistory] = useState<string[]>([]);
```

### Keyboard Event Handling
```tsx
const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;
  
  if (key >= '0' && key <= '9') {
    inputNumber(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (key === '+') {
    performOperation('+');
  }
  // ... other key handlers
};

useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [/* dependencies */]);
```

### Calculator Operations
```tsx
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
    default:
      return secondOperand;
  }
};
```

### Responsive Design
- Use Tailwind's responsive classes (`sm:`, `md:`, `lg:`)
- Calculator grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Container widths: `max-w-md mx-auto` for calculator interface
- Padding adjustments for different screen sizes

### Dark Mode Support
- Always provide both light and dark variants
- Use `dark:` prefix for dark mode styles
- Ensure proper contrast ratios
- Test both themes during development

## File Structure for New Calculators

```
app/calculators/math/
├── page.tsx (category page)
├── [calculator-name]/
│   └── page.tsx (individual calculator)
```

Each calculator should follow the established patterns while implementing calculator-specific functionality and features.

## Testing Checklist

- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Dark mode styling is consistent
- [ ] Keyboard navigation works properly
- [ ] All interactive elements have hover states
- [ ] Calculator logic is mathematically correct
- [ ] Error handling for edge cases (division by zero, etc.)
- [ ] History functionality works as expected
- [ ] Navigation links work correctly
- [ ] Performance is acceptable (no lag in calculations)

This style guide ensures consistency across all calculators while providing flexibility for calculator-specific features and functionality.