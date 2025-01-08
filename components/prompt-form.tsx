"use client";

import { LoaderCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PromptFormProps {
  initialPrompt?: string;
  onSubmit?: (prompt: string) => Promise<void>;
  onPromptChange?: (prompt: string) => void;
  onUpload?: () => void;
  allowUpload?: boolean;
}

export function PromptForm({
  initialPrompt = "",
  onSubmit,
  onPromptChange,
  onUpload,
  allowUpload,
}: PromptFormProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    onPromptChange?.(value);
  };

  const handleSubmit = () => {
    if (!prompt.trim() || !onSubmit) return;
    startTransition(async () => {
      await onSubmit(prompt);
    });
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Describe your avatar or click an example below..."
        className="min-h-[120px] resize-none"
        value={prompt}
        onChange={(e) => handlePromptChange(e.target.value)}
      />
      <div className="flex justify-between gap-2">
        <Button
          className="flex-1 gap-2"
          onClick={handleSubmit}
          disabled={isPending || !prompt.trim()}
        >
          {isPending ? "Generating..." : "Generate"}
          <LoaderCircle
            aria-label="Submitting"
            className={cn(
              isPending ? "visible" : "invisible",
              "size-5 animate-spin transition-opacity [grid-area:stack]"
            )}
          />
        </Button>
        {allowUpload && (
          <Button
            variant="outline"
            size="icon"
            onClick={onUpload}
            disabled={isPending}
          >
            <Upload className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
