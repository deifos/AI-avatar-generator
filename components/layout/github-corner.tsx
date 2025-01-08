"use client";

import { Github } from "lucide-react";
import Link from "next/link";

export function GitHubCorner() {
  return (
    <Link
      href="https://github.com/deifos/AI-avatar-generator"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-0 right-0 z-50"
    >
      <div className="relative">
        <div className="w-[120px] h-[80px] bg-foreground transform rotate-45 translate-x-[40px] translate-y-[-40px]" />
        <Github className="absolute top-[16px] right-[16px] h-6 w-6 text-background transform rotate-45" />
      </div>
    </Link>
  );
}
