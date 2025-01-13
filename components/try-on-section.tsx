"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import { fileToDataUrl } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { fal } from "@fal-ai/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

interface TryOnSectionProps {
  modelImage: string;
  onTryOnComplete: (data: { url: string; prompt: string } | null) => void;
  onTryOnStart: () => void;
}

export function TryOnSection({
  modelImage,
  onTryOnComplete,
  onTryOnStart,
}: TryOnSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("tops");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataUrl(file);
      setGarmentImage(dataUrl);
    }
  };

  const handleTryOn = async () => {
    if (!garmentImage) {
      toast({
        variant: "destructive",
        title: "No Image",
        description: "Please upload a garment image first",
      });
      return;
    }

    setIsGenerating(true);
    onTryOnStart();

    try {
      const result = await fal.subscribe("fashn/tryon", {
        input: {
          model_image: modelImage,
          garment_image: garmentImage,
          category: category,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      if (!result.data.images?.[0]?.url) {
        throw new Error("No image received from try-on API");
      }

      const imageUrl = result.data.images[0].url;
      setResultImage(imageUrl);
      onTryOnComplete({
        url: imageUrl,
        prompt: `Try-on with ${category}`,
      });

      toast({
        title: "Success",
        description: "Try-on completed successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        variant: "destructive",
        title: "Try-on Failed",
        description: errorMessage,
      });
      onTryOnComplete(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;

    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();

      const timeStamp = new Date().getTime();
      const fileName = `try-on-image-${timeStamp}.png`;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download image:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download the image",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {/* Original Image */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Your Avatar</h3>
          <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto">
            <Image
              src={modelImage}
              alt="Your avatar"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Try-on Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Upload Clothing</h3>
          <div className="space-y-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tops">Top</SelectItem>
                <SelectItem value="bottoms">Bottom</SelectItem>
                <SelectItem value="one-pieces">One Piece</SelectItem>
              </SelectContent>
            </Select>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Garment
            </Button>
            {garmentImage && (
              <>
                <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto">
                  <Image
                    src={garmentImage}
                    alt="Uploaded garment"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleTryOn}
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Try On"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Try-On Result</h3>
          <div className="relative aspect-[9/16] w-full max-w-[200px] mx-auto">
            {resultImage ? (
              <>
                <Image
                  src={resultImage}
                  alt="Try-on result"
                  fill
                  className={`object-cover rounded-lg ${
                    isGenerating ? "opacity-50" : "opacity-100"
                  }`}
                />
                {isGenerating && (
                  <div className="absolute inset-0 m-auto animate-spin">
                    <svg className="size-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 6 12 6z"
                      />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground p-4">
                Try on clothing to see result
              </div>
            )}
          </div>
          {resultImage && !isGenerating && (
            <Button
              onClick={handleDownload}
              className="w-full gap-2"
              variant="outline"
            >
              <Download className="h-4 w-4" />
              Download Result
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
