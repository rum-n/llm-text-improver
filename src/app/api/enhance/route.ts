import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a professional text editor. Correct the grammar and improve the style of the following text without changing its meaning.',
    messages,
  });

  return result.toDataStreamResponse();
}