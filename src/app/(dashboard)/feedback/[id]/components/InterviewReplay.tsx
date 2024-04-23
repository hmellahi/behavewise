"use client";
import Player from "@/components/ui/Player/Player";

export default function InterviewReplay() {
  return (
    <div className="p-6 bg-white rounded-xl">
      <h3 className="text-2xl font-semibold mb-4">Interview Replay</h3>
      <div className="w-[40rem]">
        <Player
          url={
            "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
          }
          light={
            "https://images.unsplash.com/photo-1655601597743-7ddd6fdc2903?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
          }
        />
      </div>
    </div>
  );
}
