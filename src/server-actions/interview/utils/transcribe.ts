import { IncomingForm } from "formidable";
import { Configuration, OpenAIApi } from "openai";
const fs = require("fs");


const transcribe = async (videoFile:any) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const videoFilePath = videoFile?.filepath;

  const resp = await openai.createTranscription(
    fs.createReadStream(videoFilePath),
    "whisper-1",
    // Uncomment the line below if you would also like to capture filler words:
    "Please include any filler words such as 'um', 'uh', 'er', or other disfluencies in the transcription. Make sure to also capitalize and punctuate properly."
  );

  const transcript = resp?.data?.text;

  // Content moderation check
  const response = await openai.createModeration({
    input: resp?.data?.text,
  });

  if (response?.data?.results[0]?.flagged) {
    // throw new Error("Inappropriate content detected. Please try again.");
  }

  return { transcript };
};

export default transcribe;
