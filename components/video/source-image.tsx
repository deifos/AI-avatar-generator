"use client";

import Image from "next/image";

interface SourceImageProps {
  url: string;
  prompt: string;
}

export function SourceImage({ url, prompt }: SourceImageProps) {
  return (
    <div className="space-y-4 p-6 text-center">
      <h2 className="text-lg font-semibold">Source Image</h2>
      <div className="relative aspect-[9/16] w-48 max-w-sm mx-auto">
        <Image
          src={url}
          alt={prompt}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
