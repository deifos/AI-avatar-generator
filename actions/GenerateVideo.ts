"use server";
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GenerateVideo(
  prompt: string,
  imageUrl: string,
  apiKey?: string
) {
  const effectiveApiKey = process.env.FAL_KEY || apiKey;

  if (!effectiveApiKey) {
    throw new Error("No API key provided");
  }

  fal.config({
    credentials: effectiveApiKey,
  });

  await delay(4000);

  try {
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed generating video: ${error.message}`);
    } else {
      throw new Error(
        "Failed to genenerate video because something is broken, get to work!"
      );
    }
  }
}
