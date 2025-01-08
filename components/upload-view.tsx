"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UploadViewProps {
  imageUrl: string;
  onCancel: () => void;
}

export function UploadView({ imageUrl, onCancel }: UploadViewProps) {
  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
      <div className="relative aspect-[9/16] w-80 max-w-sm mx-auto overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt="Uploaded image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
