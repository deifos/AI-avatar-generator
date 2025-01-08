"use client";

import { SAMPLE_VIDEOS } from "@/lib/constants/sample-videos";
import { VideoCard } from "./video-card";
import { ScrollArea } from "../ui/scroll-area";

interface VideoGridProps {
  onPromptSelect: (prompt: string) => void;
  selectedPrompt?: string;
}

export function VideoGrid({ onPromptSelect, selectedPrompt }: VideoGridProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Example Video Styles</h2>
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-md border p-4 ">
          {SAMPLE_VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              url={video.url}
              prompt={video.prompt}
              onClick={() => {
                onPromptSelect(video.prompt);
              }}
              isSelected={selectedPrompt === video.prompt}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
