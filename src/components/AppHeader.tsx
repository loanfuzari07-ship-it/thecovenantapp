"use client";

import { LogOut } from "lucide-react";
import Image from 'next/image';

interface AppHeaderProps {
  onLogout?: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-[600px] h-[56px] md:h-[64px] bg-[var(--bg-primary)] border-b border-[var(--border)] flex items-center justify-between z-[100] px-4">
      {/* Logo container with the same style pattern as Login screen */}
      <div className="flex items-center">
        <div className="w-9 h-9 bg-[var(--bg-card)] rounded-[8px] overflow-hidden shadow-lg border border-[var(--border)] relative flex-shrink-0">
          <Image
            src="https://imgur.com/nkvXAmb.png"
            alt="The Covenant App Logo"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <h1 className="font-lora text-[17px] md:text-[19px] font-semibold text-[var(--gold)] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
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
        <div className="w-9" />
      )}
    </header>
  );
}
