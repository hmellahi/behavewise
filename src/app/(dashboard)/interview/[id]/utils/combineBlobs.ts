export const combineBlobs = async (recordedChunks: Blob[]) => {
  return new Blob(recordedChunks, { type: "video/webm"});
};
