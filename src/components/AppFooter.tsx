"use client";

import { Home, PlayCircle, BookOpen, Gift, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppFooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'protocol', label: 'Protocol', icon: PlayCircle },
  { id: 'devotionals', label: 'Devotionals', icon: BookOpen },
  { id: 'bonus', label: 'Bonus', icon: Gift },
  { id: 'support', label: 'Support', icon: Headphones },
];

export function AppFooter({ activeTab, onTabChange }: AppFooterProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[64px] bg-[var(--bg-primary)] border-t border-[var(--border)] flex items-center z-[100]">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <Icon
              className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-[var(--gold)]" : "text-[var(--text-muted)]"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium tracking-wider uppercase transition-colors",
                isActive ? "text-[var(--gold)]" : "text-[var(--text-muted)]"
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
