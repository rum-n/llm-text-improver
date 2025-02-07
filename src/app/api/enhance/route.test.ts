import { POST } from './route';
import { streamText } from 'ai';

global.Request = jest.fn().mockImplementation((url, options) => ({
  url,
  json: async () => JSON.parse(options.body),
  ...options,
})) as unknown as typeof Request;

global.Response = jest.fn().mockImplementation((body, options) => ({
  body,
  ...options,
})) as unknown as typeof Response;

jest.mock('ai', () => ({
  streamText: jest.fn(),
  StreamingTextResponse: jest.fn()
}));

jest.mock('@ai-sdk/openai', () => ({
  openai: jest.fn().mockReturnValue('gpt-4')
}));

describe('POST /api/enhance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('processes text enhancement request correctly', async () => {
    const mockStreamResponse = {
      toDataStreamResponse: jest.fn().mockReturnValue('mocked response'),
    };

    (streamText as jest.Mock).mockReturnValue(mockStreamResponse);

    const request = new Request('http://localhost:3000/api/enhance', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'test text' }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response = await POST(request);
    expect(streamText).toHaveBeenCalledWith({
      model: 'gpt-4',
      system: expect.any(String),
      prompt: 'test text'
    });
    expect(mockStreamResponse.toDataStreamResponse).toHaveBeenCalled();
    expect(response).toBe('mocked response');
  });

  it('handles missing prompt', async () => {
    const request = new Request('http://localhost:3000/api/enhance', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });
});