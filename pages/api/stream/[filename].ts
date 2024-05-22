import { s3AwsClient } from "@/lib/s3AwsClient";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { createWriteStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  // get filename param
  const {
    query: { filename },
  } = request;
    res.status(200).json({ re : filename});
  return filename;
  
  try {
    // console.log(s3AwsClient);
    const s3Options = {
      Bucket: "behavewise",
      Key: "interviewsReplays/a9bba0f9-c369-46e8-a3e0-bc6ea5ab9c5c/2_614fda08-8117-499a-b809-3b79d129eda4.webm", // key to your object in s3AwsClient
    };
    // #3
    const { ContentLength } = await s3AwsClient.send(
      new HeadObjectCommand(s3Options)
    );
    const videoSize = ContentLength || 0;

    // #4
    const FILE_PORTION_SIZE = 5000000; //bytes = 5MB
    const requestedRange = request.headers.range || "";
    const start = Number(requestedRange.replace(/\D/g, ""));
    const end = Math.min(start + FILE_PORTION_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    console.log({contentLength})

    // #5
    res.status(206);
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "video/webm")
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Range", `bytes ${start}-${end}/${videoSize}`);
    res.setHeader("Content-Length", contentLength);

    // #6
    const streamRange = `bytes=${start}-${end}`;

    const s3Object = await s3AwsClient.send(
      new GetObjectCommand({
        ...s3Options,
        Range: streamRange,
      })
    );

    const file = s3Object.Body?.transformToWebStream();
    if (!s3Object) {
      throw new Error("couldn't stream");
    }

   (s3Object.Body as Readable)?.pipe(res);

    // console.log(stream)

    // res.pipe(stream)
    // #7
    // res.status(200).json({
    //   result,
    // });
    // console.log(s3AwsClient)
    // const readableObject = s3AwsClient.getObject(downloadParams).createReadStream();

    // res.setHeader("Content-Type", `image/${imageFormat}`);
    // res.setHeader("Content-Disposition", `attachment; filename=${imageKey}`);
    // readableObject.pipe(res);
    // res.status(500).json({ re : s3AwsClient});
  } catch (error) {
    res.status(500).json({ error });
  }
}
