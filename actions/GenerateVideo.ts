"use server";
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function GenerateVideo(prompt: string, imageUrl: string) {
  const result = await fal.subscribe(
    "fal-ai/kling-video/v1.6/pro/image-to-video",
    {
      input: {
        prompt,
        image_url: imageUrl,
        aspect_ratio: "9:16",
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("queue update", update);
      },
    }
  );

  return result.data;
}
