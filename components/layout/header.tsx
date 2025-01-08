import { Sparkles } from "lucide-react";
import { GitHubCorner } from "./github-corner";
import PopOverInput from "../popover-input";

export function Header() {
  return (
    <header className="border-b relative overflow-hidden">
      <div className="container mx-auto px-4 h-16 flex items-center gap-2">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 ">
            <Sparkles className="h-5 w-5" />
            <h1 className="font-bold">AI Avatar Creator</h1>
          </div>
          <div className="flex">
            <PopOverInput />
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
      <GitHubCorner />
    </header>
  );
}
