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
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2000,
    temperature: 1.0,
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
  Wherever you would use name of the project use '__' instead. 
  In your response every comment should be in the new line.
  Encapsulate every comment in [] brackets.
  DON'T REPEAT COMMENTS`;
};

// ************************* Positive completion ************************

export type CreatePositiveCompletionProps = {
  name: string;
  emoji: number;
  amount: number;
};

export const createPositiveCompletion = async (
  data: CreatePositiveCompletionProps
) => {
  const prompt = createPositivePrompt(data);
  return await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2000,
    temperature: 1.0,
  });
};

export const createPositivePrompt = (data: CreatePositiveCompletionProps) => {
  const { name, emoji, amount } = data;

  return `I have created a youtube video about crypto project named ${name}.
  Please generate ${amount} positive viewer comments on the video.
  In ${emoji}% of the comments you can use emojis.
  Wherever you would use name of the project use '__' instead. 
  In your response every comment should be in the new line.
  Encapsulate every comment in [] brackets.
  DON'T REPEAT COMMENTS`;
};

// ************************* Neutral completion ************************

export const createNeutralCompletion = async (
  data: CreatePositiveCompletionProps
) => {
  const prompt = createPositivePrompt(data);
  return await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2000,
    temperature: 1.0,
  });
};

export const createNeutralPrompt = (data: CreatePositiveCompletionProps) => {
  const { name, emoji, amount } = data;

  return `I have created a youtube video about crypto project named ${name}.
  Please generate ${amount} random viewer comments on the video.
  I need 100% of the comments to be neutral.
  In ${emoji}% of the comments you can use emojis.
  Wherever you would use name of the project use '__' instead. 
  In your response every comment should be in the new line.
  Encapsulate every comment in [] brackets.
  DON'T REPEAT COMMENTS`;
};

// ************************* Negative completion ************************

export const createNegativeCompletion = async (
  data: CreatePositiveCompletionProps
) => {
  const prompt = createPositivePrompt(data);
  return await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2000,
    temperature: 1.0,
  });
};

export const createNegativePrompt = (data: CreatePositiveCompletionProps) => {
  const { name, emoji, amount } = data;

  return `I have created a youtube video about crypto project named ${name}.
  Please generate ${amount} negative viewer comments on the video.
  I need 100% of the comments to be negative.
  In ${emoji}% of the comments you can use emojis.
  Wherever you would use name of the project use '__' instead. 
  In your response every comment should be in the new line.
  Encapsulate every comment in [] brackets.
  DON'T REPEAT COMMENTS`;
};

// ************************* Questions completion ************************

export const createQuestionCompletion = async (
  data: CreatePositiveCompletionProps
) => {
  const prompt = createPositivePrompt(data);
  return await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2000,
    temperature: 1.0,
  });
};

export const createQuestionPrompt = (data: CreatePositiveCompletionProps) => {
  const { name, amount } = data;

  return `I have created a youtube video about crypto project named ${name}.
  Please generate ${amount} viewer questions on the video.
  Wherever you would use name of the project use '__' instead. 
  In your response every question should be in the new line.
  Encapsulate every question in [] brackets.
  DON'T REPEAT QUESTIONS`;
};
