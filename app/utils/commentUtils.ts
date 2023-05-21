import { Comment } from '@/types';

export function injectProjectName(comment: Comment, name: string): Comment {
  const textWithProject = comment.text.replace('__', name);
  return { ...comment, text: textWithProject };
}

export function shuffleComments(comments: Comment[]): Comment[] {
  for (let i = comments.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [comments[i], comments[j]] = [comments[j], comments[i]];
  }
  return comments;
}

export function prepComments(comments: Comment[], projName: string): Comment[] {
  const prepared = comments.map((comment) =>
    injectProjectName(comment, projName)
  );
  const shuffled = shuffleComments(prepared);
  return shuffled;
}
