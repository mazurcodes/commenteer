import { CommentType } from '@/data/constants';
import { createJob, getRandomCommentsOfType } from '@/firebase/crudUtils';
import { JobData } from '@/types';
import { prepComments } from '@/utils/commentUtils';
import { Timestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name } = await request.json();
  const comments = await getComments(request);
  const preparedComments = prepComments(comments, name);
  const jobData = await prepJobData(request, preparedComments);
  const jobId = await createJob(jobData);
  return NextResponse.json(jobId);
}

async function getComments(request: Request) {
  const { positive, negative, neutral, questions, amount } =
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

  return [
    ...positiveComments,
    ...negativeComments,
    ...neutralComments,
    ...questionComments,
  ];
}

async function prepJobData(
  request: Request,
  comments: string
): Promise<JobData> {
  const { name, description, positive, negative, neutral, questions, amount } =
    await request.json();
  return {
    name,
    description,
    settings: {
      positive,
      negative,
      neutral,
      questions,
    },
    amount,
    comments,
    createdAt: Timestamp.now(),
  };
}

function calculateAmount(amount: number, typeProcentage: number) {
  return Math.round(amount * (typeProcentage / 100));
}
