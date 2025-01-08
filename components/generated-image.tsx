"use client";

import { Button } from "@/components/ui/button";
import { ImageCard } from "./image-card";
import { ArrowLeft } from "lucide-react";

interface GeneratedImageProps {
  imageUrl: string;
  prompt: string;
  onTryAgain: () => void;
}

export function GeneratedImage({
  imageUrl,
  prompt,
  onTryAgain,
}: GeneratedImageProps) {
  return (
    <div className="space-y-4 p-6 flex flex-col ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Generated Avatar</h2>
        <Button
          variant="ghost"
          onClick={onTryAgain}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Try Again
        </Button>
      </div>
      <div className="flex w-64 mx-auto ">
        <ImageCard url={imageUrl} prompt={prompt} />
      </div>
      <p className="text-sm text-muted-foreground mt-2">{prompt}</p>
    </div>
  );
}
