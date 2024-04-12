import { Metadata } from "next";
import React from "react";
import { twMerge } from "tailwind-merge";
import Headline from "./Headline";

export default function PageWrapper({
  children,
  metadata,
  className,
}: {
  children: React.ReactNode;
  metadata: Metadata;
  className?: string;
}) {
  return (
    <>
      <Headline> {metadata?.title}</Headline>
      <div
        className={twMerge(
          "h-[calc(100vh-7rem)] no-scrollbar overflow-y-scroll gap-6 flex flex-col pt-4",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
