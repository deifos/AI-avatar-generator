'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface GeneratedVideoProps {
  videoUrl: string;
  prompt: string;
  onTryAgain: () => void;
}

export function GeneratedVideo({ videoUrl, prompt, onTryAgain }: GeneratedVideoProps) {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Generated Video</h2>
        <Button 
          variant="ghost" 
          onClick={onTryAgain}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Try Again
        </Button>
      </div>
      <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden">
        <Image
          src={videoUrl}
          alt={prompt}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">{prompt}</p>
    </div>
  );
}