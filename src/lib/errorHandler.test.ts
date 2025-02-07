import { errorHandler } from './errorHandler';

describe('errorHandler', () => {
  it('handles null error', () => {
    expect(errorHandler(null)).toBe('unknown error');
  });

  it('handles undefined error', () => {
    expect(errorHandler(undefined)).toBe('unknown error');
  });

  it('handles string error', () => {
    expect(errorHandler('test error')).toBe('test error');
  });

  it('handles Error object', () => {
    const error = new Error('test error message');
    expect(errorHandler(error)).toBe('test error message');
  });

  it('handles other objects by stringifying them', () => {
    const error = { code: 500, message: 'server error' };
    expect(errorHandler(error)).toBe(JSON.stringify(error));
  });

  it('handles arrays by stringifying them', () => {
    const error = ['error1', 'error2'];
    expect(errorHandler(error)).toBe(JSON.stringify(error));
  });
});