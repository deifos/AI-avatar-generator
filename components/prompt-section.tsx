"use client";

import { PromptForm } from "./prompt-form";
import { GeneratedImage } from "./generated-image";
import { UploadView } from "./upload-view";
import { useState, useRef } from "react";
import { on } from "events";
import { GenerateImage } from "@/actions/GenerateImage";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { fileToDataUrl } from "@/lib/utils";

interface PromptSectionProps {
  onImageCreated?: (data: { url: string; prompt: string }) => void;
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

  const handleGenerate = async (prompt: string) => {
    const data = await GenerateImage(prompt);
    setGeneratedImage({ url: data.images[0].url, prompt });
    onImageCreated?.({ url: data.images[0].url, prompt });
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
      <h2 className="text-lg font-semibold">Create Your Avatar</h2>

      <PromptForm
        initialPrompt={selectedPrompt}
        onSubmit={handleGenerate}
        onUpload={handleUploadClick}
        allowUpload={allowUpload}
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
