import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  url: string;
  prompt: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function ImageCard({
  url,
  prompt,
  onClick,
  isSelected,
}: ImageCardProps) {
  return (
    <button
      className={cn(
        "relative w-full aspect-[9/16] overflow-hidden rounded-lg transition-all",
        "hover:ring-2 hover:ring-primary/50",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <Image src={url} alt={prompt} fill className="object-cover" />
    </button>
  );
}
