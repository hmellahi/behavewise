import { ffmpeg } from "@/plugins/ffmpeg";
import { uuid } from "uuidv4";

export const convertRecordingToVideo = async () => {
  return null;
    // if (!recordedChunksInterview.current.length) {
    //   return;
    // }
    // const file = new Blob(recordedChunksInterview.current, {
    //   type: `video/webm`,
    // });
    // const unique_id = uuid();
    // // This checks if ffmpeg is loaded
    // if (!ffmpeg.isLoaded()) {
    //   await ffmpeg.load();
    // }
    // // This writes the file to memory, removes the video, and converts the audio to mp3
    // ffmpeg.FS("writeFile", `${unique_id}.webm`, await fetchFile(file));
    // await ffmpeg.run(
    //   "-i",
    //   `${unique_id}.webm`,
    //   "-ss",
    //   "00:00:01.000",
    //   "-frames:v",
    //   "1",
    //   `${unique_id}.png`
    // );
    // const data = ffmpeg.FS("readFile", `${unique_id}.png`);
    // const blob = new Blob([data.buffer], { type: "image/png" });
  }