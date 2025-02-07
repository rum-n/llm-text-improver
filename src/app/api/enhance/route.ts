import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      throw new Error('No prompt provided');
    }

    const result = await streamText({
      model: openai('gpt-3.5-turbo-instruct'),
      system: 'You are a professional text editor. Correct the grammar and improve the style of the following text without changing its meaning.',
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process text' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}