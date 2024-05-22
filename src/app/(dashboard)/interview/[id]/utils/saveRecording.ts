// @ts-ignore
import { generateAnswerReplayPresignedUrl } from "@/server-actions/interview/interview.actions";
import axios from "axios";
import fixWebmDuration from "fix-webm-duration";
import { combineBlobs } from "./combineBlobs";

const FixWebm = async (blob: Blob, duration: number) => {
  return new Promise((resolve) => {
    fixWebmDuration(blob, duration, (seekableBlob) => {
      resolve(seekableBlob);
    });
  });
};

const saveRecording = async ({
  recordedChunks,
  interviewId,
  questionId,
  duration,
}: {
  recordedChunks: Blob[];
  interviewId: string;
  questionId: string;
  duration: number;
}) => {
  // Convert to video
  const video = await combineBlobs(recordedChunks);

  // Compress [TODO]
  // const videoWithMetadata = await injectMetadata(video);
  // Get cloudflare presigned url
  const { presignedUrl, filePath } = await generateAnswerReplayPresignedUrl({
    interviewId,
    questionId,
  });

  const seekableBlob = await FixWebm(video, duration);

  // Upload to Cloudflare
  await axios.put(presignedUrl, seekableBlob, {
    headers: { "Content-Type": "video/webm" },
  });

  // Save VideoUrl -> Answer
  return { filePath };
};

export default saveRecording;
