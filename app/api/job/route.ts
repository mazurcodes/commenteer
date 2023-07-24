import { CommentType } from '@/data/constants';
import { createJob, getRandomCommentsOfType } from '@/firebase/crudUtils';
import { prepComments } from '@/utils/commentUtils';
import { NextResponse } from 'next/server';

type CommentsBody = {
  ownerId: string;
  name: string;
  positive: number;
  negative: number;
  neutral: number;
  questions: number;
  amount: number;
  cost: number;
  description?: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const bodyWithNumbers = convertSettingsStringsToNumbers(body);
  const validatedBody = validateSettings(bodyWithNumbers);
  const comments = await getComments(validatedBody);
  const preparedComments = prepComments(comments, validatedBody.name);
  const jobData = prepJobData(validatedBody, preparedComments);
  const jobId = await createJob(jobData);
  return NextResponse.json(jobId);
}

function convertSettingsStringsToNumbers(body: CommentsBody) {
  const { positive, negative, neutral, questions, amount } = body;
  return {
    ...body,
    positive: +positive,
    negative: +negative,
    neutral: +neutral,
    questions: +questions,
    amount: +amount,
  };
}

function validateSettings(body: CommentsBody) {
  const { positive, negative, neutral, questions } = body;

  if (positive + negative + neutral + questions !== 100) {
    return adjustSettingsTo100(body);
  }
  return body;
}

function adjustSettingsTo100(body: CommentsBody) {
  const { positive, negative, neutral, questions } = body;
  const diff = 100 - (positive + negative + neutral + questions);
  return { ...body, positive: positive + diff };
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

function prepJobData(body: CommentsBody, comments: string) {
  const {
    ownerId,
    name,
    description,
    positive,
    negative,
    neutral,
    questions,
    amount,
    cost,
  } = body;
  return {
    ownerId,
    name,
    description: description || '',
    settings: {
      positive: positive,
      negative: negative,
      neutral: neutral,
      questions: questions,
    },
    amount: amount,
    cost: +cost * -100, // to cents and negative
    comments,
    createdAt: Date.now(),
  };
}

function calculateAmount(amount: number, typeProcentage: number) {
  return Math.round(amount * (typeProcentage / 100));
}
