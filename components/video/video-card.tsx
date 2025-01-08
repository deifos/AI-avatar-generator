import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface VideoCardProps {
  url: string;
  prompt: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function VideoCard({
  url,
  prompt,
  onClick,
  isSelected,
}: VideoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    if (!videoRef.current || !isLoaded) return;

    try {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      console.log("Playback error:", error);
    }
  };

  const handlePause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  };
  return (
    <button
      className={cn(
        "relative w-full aspect-[9/16] overflow-hidden rounded-lg transition-all",
        "hover:ring-2 hover:ring-primary/50",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <video
        src={url}
        ref={videoRef}
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
        className="w-full h-full object-cover"
      >
        <track kind="captions" />
      </video>
    </button>
  );
}
