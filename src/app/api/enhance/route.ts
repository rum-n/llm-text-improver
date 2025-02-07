import { errorHandler } from '@/lib/errorHandler';
import { openai } from '@ai-sdk/openai';
import { Redis } from '@upstash/redis';
import { formatDataStreamPart, streamText } from 'ai';

export const maxDuration = 30;

const redis = new Redis({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      throw new Error('No prompt provided');
    }

    // Create a cache key based on the prompt
    const key = `enhance:${prompt}`;

    // Check if we have a cached response
    const cached = await redis.get(key);
    if (cached) {
      return new Response(formatDataStreamPart('text', cached as string), {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const result = await streamText({
      model: openai('gpt-3.5-turbo-instruct'),
      system: 'You are a professional text editor. Correct the grammar and improve the style of the following text without changing its meaning.',
      prompt,
      async onFinish({ text }) {
        // Cache the response text for 1 hour
        await redis.set(key, text);
        await redis.expire(key, 60 * 60); // 1 hour expiration
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process text', details: errorHandler(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}