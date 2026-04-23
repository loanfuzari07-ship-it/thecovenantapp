"use client";

import { LogOut } from "lucide-react";

interface AppHeaderProps {
  onLogout?: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-[600px] h-[56px] md:h-[64px] bg-[var(--bg-primary)] border-b border-[var(--border)] flex items-center justify-between z-[100] px-4">
      <div className="w-8" /> {/* Spacer for centering title */}
      <h1 className="font-lora text-[17px] md:text-[19px] font-semibold text-[var(--gold)]">
        The Covenant App
      </h1>
      {onLogout ? (
        <button 
          onClick={onLogout}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-8" />
      )}
    </header>
  );
}
