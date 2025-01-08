"use client";

import { create } from "zustand";

interface ApiKeyState {
  apiKey: string | undefined;
  setApiKey: (apiKey: string) => void;
  clearApiKey: () => void;
}

export const useApiKey = create<ApiKeyState>((set) => ({
  apiKey: undefined,
  setApiKey: (apiKey) => set({ apiKey }),
  clearApiKey: () => set({ apiKey: undefined }),
}));
