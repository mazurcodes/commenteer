import { CommentType } from '@/data/constants';
import { createJob, getRandomCommentsOfType } from '@/firebase/crudUtils';
import { JobData } from '@/types';
import { prepComments } from '@/utils/commentUtils';
import { Timestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

type CommentsBody = {
  name: string;
  positive: number;
  negative: number;
  neutral: number;
  questions: number;
  amount: number;
  description?: string;
};

export async function POST(request: Request) {
  const body: CommentsBody = await request.json();
  const comments = await getComments(body);
  const preparedComments = prepComments(comments, body.name);
  const jobData = await prepJobData(body, preparedComments);
  const jobId = await createJob(jobData);
  return NextResponse.json(jobId);
}

async function getComments(body: CommentsBody) {
  const { positive, negative, neutral, questions, amount } = body;
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
  body: CommentsBody,
  comments: string
): Promise<JobData> {
  const { name, description, positive, negative, neutral, questions, amount } =
    body;
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
