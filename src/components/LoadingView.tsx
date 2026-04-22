"use client";

import Image from 'next/image';

export function LoadingView() {
  return (
    <div id="view-loading" className="fixed inset-0 bg-[var(--bg-primary)] flex flex-col items-center justify-center min-h-screen gap-[20px] z-[1000]">
      <div className="w-[64px] h-[64px] rounded-[12px] overflow-hidden opacity-90">
        <Image
          src="https://imgur.com/WlFfcnl.png"
          alt="The Covenant App Logo"
          width={64}
          height={64}
          className="object-cover"
        />
      </div>

      <div className="w-[36px] h-[36px] rounded-full border-2 border-[rgba(201,169,110,0.15)] border-top-2 border-t-[var(--gold)] animate-spin" />

      <p className="font-body text-[13px] text-[var(--text-muted)] tracking-[0.04em]">
        Preparing your sacred space...
      </p>
    </div>
  );
}
