import openai from '@/openai/client';
// import { createCompletion } from '@/utils/aiUtils';
import { NextResponse } from 'next/server';

export async function GET() {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Say this is a test',
    max_tokens: 1000,
    temperature: 0.2,
  });
  return NextResponse.json(completion.data.choices[0].text);
}
