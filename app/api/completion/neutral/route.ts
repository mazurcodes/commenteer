import { createCompletion as createNeutralCompletion } from '@/utils/aiUtils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const completion = await createNeutralCompletion(data);
  return NextResponse.json(completion.data.choices[0].text);
}