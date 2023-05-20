import { CommentType } from '@/types';

export const convertListToLines = (text: string) => {
  return text.replace(/\n[\d•]+\.\s/g, '\n');
};

export const extractCommentsToArray = (text: string) => {
  // extract comments from the [] brackets and put them in the array
  // example: [This is a comment]\n[This is a second comment]...
  // pattern: /\[(.*?)\]/g
  // drop the [] brackets: sentence.slice(1, -1)
  return (
    text.match(/\[(.*?)\]/g)?.map((sentence) => sentence.slice(1, -1)) || []
  );
};

export const commentsArrayToObjects = (
  comments: string[],
  type: CommentType
) => {
  return comments.map((text) => ({
    type,
    text,
    createdAt: Date.now(),
    rngOne: Math.floor(Math.random() * 20000),
    rngTwo: Math.floor(Math.random() * 20000),
    rngThree: Math.floor(Math.random() * 20000),
  }));
};
