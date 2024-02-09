import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

const windowMock = {
  scrollTo: vi.fn(),
};
Object.assign(global, global, windowMock);
