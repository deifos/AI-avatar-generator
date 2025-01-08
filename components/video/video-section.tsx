"use client";

import { useState, useRef } from "react";
import { PromptForm } from "../prompt-form";
import { GeneratedVideo } from "./generated-video";

import { GenerateVideo } from "@/actions/GenerateVideo";

interface VideoSectionProps {
  onVideoCreated?: (data: { url: string; prompt: string }) => void;
  initialPrompt?: string;
  sourceImage?: string;
  setGeneratingVideo?: (isGenerating: boolean) => void;
}

export const dynamic = "force-dynamic"; //TODO: Remove this when done testing

export function VideoSection({
  onVideoCreated,
  initialPrompt = "",
  sourceImage,
  setGeneratingVideo,
}: VideoSectionProps) {
  const [generatedVideo, setGeneratedVideo] = useState<{
    url: string;
    prompt: string;
  } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (prompt: string) => {
    setGeneratingVideo?.(true);
    // if (!sourceImage) {
    //   alert("Please upload or generate an image first.");
    //   return;
    // }
    // const data = await GenerateVideo(prompt, sourceImage);
    setTimeout(() => {
      setGeneratingVideo?.(false);
      const data = {
        video: {
          url: "https://fal.media/files/penguin/oAWALrFRg642ohxntO1uw_output.mp4",
        },
      }; //TODO: Remove this when done testing
      prompt = "test";
      onVideoCreated?.({ url: data.video.url, prompt });
    }, 2000);
  };

  const handleTryAgain = () => {
    setGeneratedVideo(null);
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="space-y-4 p-6">
      {generatedVideo ? (
        <GeneratedVideo
          videoUrl={generatedVideo.url}
          prompt={generatedVideo.prompt}
          onTryAgain={handleTryAgain}
        />
      ) : (
        <>
          <h2 className="text-lg font-semibold">Create Your Video</h2>
          <PromptForm
            initialPrompt={initialPrompt}
            onSubmit={handleGenerate}
            allowUpload={false}
          />
        </>
      )}
    </div>
  );
}
