"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/layout/header";
import { PromptSection } from "@/components/prompt-section";
import { ImageGrid } from "@/components/image-grid";
import { VideoSection } from "@/components/video/video-section";
import { VideoGrid } from "@/components/video/video-grid";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle, Video, Shirt } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Alert } from "@/components/ui/alert";
import { TryOnSection } from "@/components/try-on-section";

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
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [tryOnImage, setTryOnImage] = useState<{
    url: string;
    prompt: string;
  } | null>(null);
  const [isTryOnEnabled, setIsTryOnEnabled] = useState(false);
  const [isTryOnLoading, setIsTryOnLoading] = useState(false);

  const scrollToTryOn = () => {
    setTimeout(() => {
      const tryOnSection = document.getElementById('try-on-section');
      if (tryOnSection) {
        tryOnSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const scrollToVideo = () => {
    setShowVideo(true);
    setTimeout(() => {
      const videoSection = document.getElementById('video-section');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleImageCreated = (data: { url: string; prompt: string } | null) => {
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

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (!videoData?.url) {
        throw new Error("Video URL is undefined");
      }
      const response = await fetch(videoData.url);
      const blob = await response.blob();

      const timestamp = new Date().getTime();
      const filename = `generated-video-${timestamp}.mp4`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download video:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* IMAGE SECTION */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-card rounded-lg shadow-sm border">
            <div className="px-6 pt-6">
              <h2 className="text-lg font-semibold ">
                Generate or upload the image for your avatar
              </h2>
              <span>Image generations are using Flux-Ultra1.1</span>
            </div>
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
            onClick={scrollToTryOn}
            className="gap-2"
            disabled={!hasImage || !imageData}
          >
            <Shirt className="h-4 w-4" />
            Go to Try-On Section
          </Button>
        </div>

        {/* TRY ON SECTION */}
        {imageData && (
          <div id="try-on-section" className="mt-16">
            <div className="bg-card rounded-lg shadow-sm border">
              <div className="px-6 pt-6">
                <h2 className="text-lg font-semibold">
                  Try-On Section (Optional)
                </h2>
                <span>Upload a clothing item to try on your avatar</span>
              </div>
              <TryOnSection
                modelImage={imageData.url}
                onTryOnComplete={(data) => {
                  setTryOnImage(data);
                  setIsTryOnLoading(false);
                }}
                onTryOnStart={() => setIsTryOnLoading(true)}
              />
            </div>
          </div>
        )}
        {/* Go to Video Section Button */}
        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            onClick={scrollToVideo}
            className="gap-2"
            disabled={!hasImage}
          >
            <Video className="h-4 w-4" />
            Go to Video Section
          </Button>
        </div>

        {/* VIDEO SECTION */}
        {showVideo && imageData && (
          <div id="video-section" className="mt-16 space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="bg-card rounded-lg shadow-sm border">
                <VideoSection
                  initialPrompt={videoPromptSelected}
                  sourceImage={tryOnImage ? tryOnImage.url : imageData.url}
                  onVideoCreated={handleVideoCreated}
                  setIsGeneratingVideo={setIsGeneratingVideo}
                />
                {/* GENERATED OR UPLOADED IMAGE */}
                <div className="relative">
                  <div className="space-y-4 p-2 text-center">
                    {isGeneratingVideo && (
                      <Alert className="text-center bg-yellow-200 ">
                        Video generation could take up to 6 minutes - do not
                        close this page.
                      </Alert>
                    )}
                    <h2 className="text-lg font-semibold">Source Image</h2>
                    <div className="relative aspect-[9/16] w-48 max-w-sm mx-auto">
                      <Image
                        src={tryOnImage ? tryOnImage.url : imageData.url}
                        alt={tryOnImage ? tryOnImage.prompt : imageData.prompt}
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
                  loop
                  autoPlay={true}
                  playsInline
                  onLoadedData={() => setIsLoaded(true)}
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
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 mx-auto"
              disabled={isDownloading || !videoData?.url}
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download Video"}
            </Button>
            {/* {videoPromptSelected} */}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
