"use client";

import { PromptForm } from "./prompt-form";
import { GeneratedImage } from "./generated-image";
import { UploadView } from "./upload-view";
import { useState, useRef } from "react";
import { fileToDataUrl } from "@/lib/utils";
import { useApiKey } from "@/hooks/useApiKey";
import { useToast } from "@/hooks/use-toast";
import { fal } from "@fal-ai/client";

interface PromptSectionProps {
  onImageCreated?: (data: { url: string; prompt: string } | null) => void;
  selectedPrompt?: string;
  allowUpload?: boolean;
}

export const dynamic = "force-dynamic"; //TODO: Remove this when done testing

export function PromptSection({
  onImageCreated,
  selectedPrompt = "",
  allowUpload,
}: PromptSectionProps) {
  const [generatedImage, setGeneratedImage] = useState<{
    url: string;
    prompt: string;
  } | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { toast } = useToast();
  const apiKey = useApiKey((state) => state.apiKey);

  fal.config(apiKey ? { credentials: apiKey } : { proxyUrl: "/api/fal/proxy" });

  const handleGenerate = async (prompt: string) => {
    setIsGeneratingImage(true);

    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Prompt",
        description: "Please enter a prompt first",
      });
      setIsGeneratingImage(false);
      return;
    }

    try {
      //LETS MAKE THE MODEL AND ASPECT_RATIO DYNAMIC
      const result = await fal.subscribe("broken", {
        // const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
        input: {
          prompt,
          aspect_ratio: "9:16",
        },
        pollInterval: 5000,
        logs: false,
        // onQueueUpdate(update) {
        //   console.log("queue update", update);
        // },
      });

      setGeneratedImage({ url: result.data.images[0].url, prompt });
      onImageCreated?.({ url: result.data.images[0].url, prompt });

      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: errorMessage,
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataUrl(file);
      const data = {
        url: dataUrl,
        prompt: "",
      };
      setUploadedImage(dataUrl);
      onImageCreated?.(data);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (uploadedImage) {
    return (
      <div className="p-6">
        <UploadView
          imageUrl={uploadedImage}
          onCancel={() => {
            setUploadedImage(null);
            onImageCreated?.(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      </div>
    );
  }

  if (generatedImage) {
    return (
      <GeneratedImage
        imageUrl={generatedImage.url}
        prompt={generatedImage.prompt}
        onTryAgain={() => setGeneratedImage(null)}
      />
    );
  }

  return (
    <div className="space-y-4 p-6">
      <PromptForm
        initialPrompt={selectedPrompt}
        onSubmit={handleGenerate}
        onUpload={handleUploadClick}
        allowUpload={allowUpload}
        isPending={isGeneratingImage}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
