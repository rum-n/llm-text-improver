import '@testing-library/jest-dom'

// Mock Web Streams API globally for all tests
const mockReadableStream = {
  getReader: jest.fn(),
  pipeThrough: jest.fn()
};

const mockWritableStream = {
  getWriter: jest.fn()
};

const mockTransformStream = {
  readable: mockReadableStream,
  writable: mockWritableStream,
};

global.TransformStream = jest.fn().mockImplementation(() => mockTransformStream);
global.ReadableStream = jest.fn().mockImplementation(() => mockReadableStream);
global.WritableStream = jest.fn().mockImplementation(() => mockWritableStream);
global.TextDecoder = jest.fn().mockImplementation(() => ({ decode: jest.fn() }));
global.TextEncoder = jest.fn().mockImplementation(() => ({ encode: jest.fn() }));