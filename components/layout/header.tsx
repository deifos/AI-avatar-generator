import { Sparkles } from 'lucide-react';
import { GitHubCorner } from './github-corner';

export function Header() {
  return (
    <header className="border-b relative overflow-hidden">
      <div className="container mx-auto px-4 h-16 flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <h1 className="font-bold">AI Avatar Creator</h1>
      </div>
      <GitHubCorner />
    </header>
  );
}