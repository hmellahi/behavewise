// @ts-nocheck
"use server";

import { interviewQuestion } from "@/app/(dashboard)/interview/[id]/types/Interview";
import { prisma } from "@/lib/prisma";
import { s3AwsClient } from "@/lib/s3AwsClient";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Answer, AnswerSchema, Interview } from "@prisma/client";
import { v4 } from "uuid";
import answerService from "./services/answerService";

interface Answer extends AnswerSchema {
  question: interviewQuestion;
  score: number;
}

export const createInterview = async (interviewId): Promise<Interview> => {
  const createdInterview = await prisma.interview.create({
    data: {
      id: interviewId,
      status: "IN_PROGRESS",
      result: JSON.stringify({}),
    },
  });
  return createdInterview;
};

export const fetchInterviewFeedback = async (interviewId: string) => {
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
    },
  });

  if (!interview) return null;
  const result = JSON.parse(interview.result);
  // fetch answers
  let answers = await answerService.fetchAnswers(interviewId);
  // answers.questionId -> value

  return {
    ...interview,
    result,
    answers,
  };
};

export const generateAnswerReplayPresignedUrl = async ({
  interviewId,
  questionId,
}: {
  interviewId: string;
  questionId: string;
}) => {
  const filename = `${questionId}_${v4()}.webm`;
  const filePath = `interviewsReplays/${interviewId}/${filename}`;

  console.log({ filePath });

  const presignedUrl = await getSignedUrl(
    s3AwsClient,
    new PutObjectCommand({
      Bucket: "behavewise",
      Key: filePath,
      ContentType: "video/webm",
    }),
    { expiresIn: 3600 }
  );

  return { presignedUrl, filePath };
};

export const getAnswerReplayUrl = async ({
  interviewId,
  questionId,
}: {
  interviewId: string;
  questionId: string;
}) => {
  // const filename = `${questionId}_${v4()}.webm`;
  // const filePath = `answers/${interviewId}/${filename}`;

  // console.log({ filePath });
  const Key =
    "interviewsReplays/a9bba0f9-c369-46e8-a3e0-bc6ea5ab9c5c/2_614fda08-8117-499a-b809-3b79d129eda4.webm";

  const presignedUrl = await getSignedUrl(
    s3AwsClient,
    new GetObjectCommand({
      Bucket: "behavewise",
      Key,
      ContentType: "video/webm",
    }),
    { expiresIn: 3600 }
  );

  return presignedUrl;
};

// export const stream;
