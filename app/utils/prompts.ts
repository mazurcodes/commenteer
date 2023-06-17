import { CreateCompletionProps } from './aiUtils';

export const createPrompt1 = (data: CreateCompletionProps) => {
  const { name, positive, neutral, negative, questions, amount, description } =
    data;

  return `I have created a youtube video about crypto project named ${name}.
    ${description && `This video is about ${description}.`}
    Please generate ${amount} random viewer comments on the video.
    I need ${positive}% of the comments to be positive.
    Another ${neutral}% of the comments to be neutral.
    Another ${negative}% of the comments to be negative.
    Another ${questions}% of the comments to be questions.
    In 2% of the comments you can use emojis.
    In your response every comment should be in the new line.
    Encapsulate every comment in [] brackets.
    DON'T REPEAT COMMENTS`;
};
