"use client";

import { Button } from "@/components/ui/button";
import { ImageCard } from "./image-card";
import { ArrowLeft, Download } from "lucide-react";

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
  const handleDownload = async () => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const timeStamp = new Date().getTime();
      const fileName = `generated-image-${timeStamp}.png`;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

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
      <Button onClick={handleDownload} className="flex items-center gap-2 mt-4">
        <Download className="h-4 w-4" />
        Download Image
      </Button>
    </div>
  );
}
