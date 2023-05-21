import { CommentType } from '@/data/constants';
import { getRandomCommentsOfType } from '@/firebase/crudUtils';
import { prepComments } from '@/utils/commentUtils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, positive, negative, neutral, questions, amount } =
    await request.json();

  const positiveComments = await getRandomCommentsOfType(
    CommentType.POSITIVE,
    calculateAmount(amount, positive)
  );
  const negativeComments = await getRandomCommentsOfType(
    CommentType.NEGATIVE,
    calculateAmount(amount, negative)
  );
  const neutralComments = await getRandomCommentsOfType(
    CommentType.NEUTRAL,
    calculateAmount(amount, neutral)
  );
  const questionComments = await getRandomCommentsOfType(
    CommentType.QUESTION,
    calculateAmount(amount, questions)
  );

  const comments = prepComments(
    [
      ...positiveComments,
      ...negativeComments,
      ...neutralComments,
      ...questionComments,
    ],
    name
  );
  return NextResponse.json(comments);
}

function calculateAmount(amount: number, typeProcentage: number) {
  return Math.round(amount * (typeProcentage / 100));
}
