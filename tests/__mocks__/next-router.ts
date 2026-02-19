// Mock for Next.js router
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}));

export const useSearchParams = jest.fn(() => new URLSearchParams());

export const usePathname = jest.fn(() => '/');

export const useNavigation = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
}));

export const useSelectedLayoutSegment = jest.fn(() => null);
export const useSelectedLayoutSegments = jest.fn(() => []);
export const useSelectedLayoutTree = jest.fn(() => null);