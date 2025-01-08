"use server";
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function GenerateImage(prompt: string) {
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
}
