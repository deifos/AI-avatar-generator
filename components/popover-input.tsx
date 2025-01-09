"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/components/prismui/popover";
import { Input } from "./ui/input";
import { useApiKey } from "@/hooks/useApiKey";
import { useState } from "react";

export default function PopOverInputField() {
  const [inputValue, setInputValue] = useState("");
  const setApiKey = useApiKey((state) => state.setApiKey);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    console.log(inputValue);
    setApiKey(inputValue);
    setInputValue("");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData("text");
    console.log(pastedValue);
    setInputValue(pastedValue);
    e.preventDefault();
  };

  return (
    <PopoverRoot>
      <PopoverTrigger>Enter your FalAI API key</PopoverTrigger>
      <PopoverContent className="h-[200px] w-[364px]">
        <PopoverForm onSubmit={handleSubmit}>
          <PopoverLabel>
            Paste your FALAI api key, please do not use this on a public
            computer
          </PopoverLabel>
          <Input
            type="password"
            className="w-4/5 mx-auto my-2"
            autoSave="false"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPaste={handlePaste}
            placeholder="Enter your API key"
            autoComplete="off"
          />
          <PopoverFooter>
            <PopoverCloseButton />
            <PopoverSubmitButton>Save API key Locally</PopoverSubmitButton>
          </PopoverFooter>
        </PopoverForm>
      </PopoverContent>
    </PopoverRoot>
  );
}
