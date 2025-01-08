"use client";

import { SAMPLE_IMAGES } from "@/lib/constants/sample-images";
import { ImageCard } from "./image-card";
import { ScrollArea } from "./ui/scroll-area";

interface ImageGridProps {
  onPromptSelect: (prompt: string) => void;
  selectedPrompt?: string;
}

export function ImageGrid({ onPromptSelect, selectedPrompt }: ImageGridProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Select a style</h2>
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-md border p-4 ">
          {SAMPLE_IMAGES.map((image) => (
            <ImageCard
              key={image.id}
              url={image.url}
              prompt={image.prompt}
              onClick={() => onPromptSelect(image.prompt)}
              isSelected={selectedPrompt === image.prompt}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
