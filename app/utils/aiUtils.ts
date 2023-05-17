import openai from '@/openai/client';

export type CreateCompletionProps = {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
  questions: number;
  emojis: number;
};

export const createCompletion = async ({
  name,
  positive,
  neutral,
  negative,
  questions,
  emojis,
}: CreateCompletionProps) => {
  return await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Say this is a test',
    max_tokens: 1000,
    temperature: 0.2,
  });
};
