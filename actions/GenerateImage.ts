"use server";
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function GenerateImage(prompt: string, apiKey?: string) {
  const effectiveApiKey = process.env.FAL_KEY || apiKey;

  if (!effectiveApiKey) {
    throw new Error("No API key provided");
  }

  // THIS IS DONE JUST BECAUSE WE ARE USING THE API FROM THE CLIENT OTHERWISE THIS IS NOT NEED IT
  // THE CONFIG UP THERE WILL DO EVERYTHING AS LONG AS YOU HAVE FAL_KEY IN YOUR ENV.
  fal.config({
    credentials: effectiveApiKey,
  });

  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt,
        // image_size: "portrait_16_9",
        aspect_ratio: "9:16",
      },
      pollInterval: 5000,
      logs: true,
      onQueueUpdate(update) {
        console.log("queue update", update);
      },
    });

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate image: ${error.message}`);
    } else {
      throw new Error(
        "Failed to genenerate image because something is broken, fix it brah!"
      );
    }
  }
}
