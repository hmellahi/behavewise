import { ffmpeg } from "@/plugins/ffmpeg";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { useState } from "react";
import { uuid } from "uuidv4";
import { interviewQuestion } from "../types/Interview";

const useEvaluateAnswer = () => {
  const [status, setStatus] = useState("Processing");

  const evaluateAnswer = async ({
    recordedChunks,
    question,
    interviewId,
  }: {
    recordedChunks: Blob[];
    question: interviewQuestion;
    interviewId: string;
  }) => {
    if (!recordedChunks.length) {
      return;
    }

    setStatus("Processing");

    const file = new Blob(recordedChunks, {
      type: `video/webm`,
    });

    const unique_id = uuid();

    // This checks if ffmpeg is loaded
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // This writes the file to memory, removes the video, and converts the audio to mp3
    ffmpeg.FS("writeFile", `${unique_id}.webm`, await fetchFile(file));
    await ffmpeg.run(
      "-i",
      `${unique_id}.webm`,
      "-vn",
      "-acodec",
      "libmp3lame",
      "-ac",
      "1",
      "-ar",
      "16000",
      "-f",
      "mp3",
      `${unique_id}.mp3`
    );

    // This reads the converted file from the file system
    const fileData = ffmpeg.FS("readFile", `${unique_id}.mp3`);
    // This creates a new file from the raw data
    const output = new File([fileData.buffer], `${unique_id}.mp3`, {
      type: "audio/mp3",
    });

    const formData = new FormData();
    formData.append("file", output, `${unique_id}.mp3`);
    formData.append("model", "whisper-1");
    formData.append("questionId", question.id.toString());
    formData.append("interviewId", interviewId);

    setStatus("Transcribing");

    fetch(`/api/submit-answer`, {
      method: "POST",
      body: formData,
    });

    // const results = await upload.json();
    // console.log({ r: results });
  };

  return { evaluateAnswer, status, setStatus };
};

export default useEvaluateAnswer;
