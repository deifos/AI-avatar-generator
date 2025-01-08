"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-lg font-semibold">Create Your Avataddr</h2>
      <div className="space-y-2">
        <Textarea
          placeholder="Describe your avatar or click an example below..."
          className="min-h-[120px] resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-between gap-2">
          <Button className="flex-1">Generate</Button>
          <Button variant="outline" size="icon">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
