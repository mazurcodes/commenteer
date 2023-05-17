import openai from '@/openai/client';

export type CreateCompletionProps = {
  name: string;
  description: string;
  positive: number;
  neutral: number;
  negative: number;
  questions: number;
  emoji: number;
  amount: number;
};

export const createCompletion = async (data: CreateCompletionProps) => {
  const prompt = createPrompt(data);
  return await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    prompt,
    max_tokens: 1000,
    temperature: 0.2,
  });
};

export const createPrompt = (data: CreateCompletionProps) => {
  const {
    name,
    positive,
    neutral,
    negative,
    questions,
    emoji,
    amount,
    description,
  } = data;

  return `I have created a youtube video about crypto project named ${name}.
  ${description && `This video is about ${description}.`}
  Please generate ${amount} random viewer comments on the video.
  I need ${positive}% of the comments to be positive.
  Another ${neutral}% of the comments to be neutral.
  Another ${negative}% of the comments to be negative.
  Another ${questions}% of the comments to be questions.
  In ${emoji}% of the comments you can use emojis.
  In your response every comment should be in the new line.
  Lines should not be numbered or formatted.`;
};
