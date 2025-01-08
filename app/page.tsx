"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/layout/header";
import { PromptSection } from "@/components/prompt-section";
import { ImageGrid } from "@/components/image-grid";
import { VideoSection } from "@/components/video/video-section";
import { VideoGrid } from "@/components/video/video-grid";
// import { SourceImage } from "@/components/video/source-image";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Video } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Alert } from "@/components/ui/alert";

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [videoPromptSelected, setVideoPromptSelected] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [imageData, setImageData] = useState<{
    url: string;
    prompt: string;
  } | null>(null);
  const [videoData, setVideoData] = useState<{
    url: string;
    prompt: string;
  } | null>(null);

  const videoGeneratedTitleRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingVideo, setGeneratingVideo] = useState(false);

  const scrollToVideo = () => {
    setShowVideo(true);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  const handleImageCreated = (data: { url: string; prompt: string }) => {
    setHasImage(true);
    setImageData(data);
  };

  const handleVideoCreated = (data: { url: string; prompt: string }) => {
    setVideoData(data);
    setTimeout(() => {
      scrollTargetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

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
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* IMAGE SECTION */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-card rounded-lg shadow-sm border">
            <PromptSection
              onImageCreated={handleImageCreated}
              selectedPrompt={selectedPrompt}
              allowUpload={true}
            />
          </div>
          <div className="bg-card rounded-lg shadow-sm border">
            <ImageGrid
              onPromptSelect={setSelectedPrompt}
              selectedPrompt={selectedPrompt}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            onClick={scrollToVideo}
            className="gap-2"
            disabled={!hasImage}
          >
            <Video className="h-4 w-4" />
            Go to Generate Video
          </Button>
        </div>

        {showVideo && imageData && (
          <div className="mt-16 space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="bg-card rounded-lg shadow-sm border">
                <VideoSection
                  initialPrompt={videoPromptSelected}
                  sourceImage={imageData.url}
                  onVideoCreated={handleVideoCreated}
                  setGeneratingVideo={setGeneratingVideo}
                />
                {/* GENERATED OR UPLOADED IMAGE */}
                <div className="relative">
                  {/* <SourceImage url={imageData.url} prompt={imageData.prompt} /> */}
                  <div className="space-y-4 p-2 text-center">
                    {isGeneratingVideo && (
                      <Alert className="text-center bg-yellow-200 ">
                        Video generation could take up to 6 minutes...
                      </Alert>
                    )}
                    <h2 className="text-lg font-semibold">Source Image</h2>
                    <div className="relative aspect-[9/16] w-48 max-w-sm mx-auto">
                      <Image
                        src={imageData.url}
                        alt={imageData.prompt}
                        fill
                        className={cn(
                          "object-cover rounded-lg",
                          isGeneratingVideo ? "opacity-50" : "opacity-100"
                        )}
                      />
                      <LoaderCircle
                        aria-label="Submitting"
                        className={cn(
                          isGeneratingVideo ? "visible" : "invisible",
                          "absolute inset-0 m-auto size-5 animate-spin transition-opacity",
                          "flex items-center justify-center"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-sm border">
                <VideoGrid
                  onPromptSelect={setVideoPromptSelected}
                  selectedPrompt={selectedPrompt}
                />
              </div>
            </div>
            <h2
              className="text-lg font-semibold mb-4 text-center"
              ref={videoGeneratedTitleRef}
            >
              Generated video
            </h2>
            <div className="bg-card rounded-lg shadow-sm border max-w-sm mx-auto">
              <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg transition-all">
                <video
                  src={videoData?.url}
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
                {isGeneratingVideo && !isLoaded && (
                  <LoaderCircle
                    aria-label="Submitting"
                    className="absolute inset-0 m-auto size-5 animate-spin transition-opacity"
                  />
                )}
                <div ref={scrollTargetRef}></div>
              </div>
            </div>
            {/* {videoPromptSelected} */}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
