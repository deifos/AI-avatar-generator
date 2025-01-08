// import Link from "next/link";

import { XIcon } from "../XIcon";

export default function Footer() {
  return (
    <footer className="h-16 py-4 text-center text-white/80 bg-slate-950">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-2">
          <span>Built with 🔨 and 💛 by </span>
          <a
            href="https://x.com/deifos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            Vlad
          </a>
          <a
            href="https://x.com/deifos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
