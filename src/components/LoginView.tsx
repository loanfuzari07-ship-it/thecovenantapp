"use client";

import { useState } from 'react';
import Image from 'next/image';

interface LoginViewProps {
  onLogin: (email: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAccess = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onLogin(email);
  };

  return (
    <div className="min-h-svh bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 sm:p-10 animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-[var(--bg-card)] rounded-2xl mb-4 overflow-hidden shadow-xl border border-[var(--border)]">
        <Image
          src="https://imgur.com/WlFfcnl.png"
          alt="The Covenant App Logo"
          width={80}
          height={80}
          className="object-cover"
        />
      </div>

      <div className="text-center mb-5">
        <span className="text-[14px] font-medium tracking-[0.15em] uppercase text-[var(--gold)] block mb-1">
          The
        </span>
        <h1 className="font-lora text-[28px] font-semibold text-[var(--cream)]">
          Covenant App
        </h1>
      </div>

      <div className="w-[60px] h-[1px] bg-[var(--gold)] opacity-40 mb-5" />

      <p className="text-[13px] text-[var(--text-secondary)] text-center leading-[1.6] mb-8 max-w-[280px]">
        Enter the email address you used at the time of purchase to access your program.
      </p>

      <div className="w-full space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-[var(--bg-card)] border border-[var(--border)] focus:border-[var(--gold)] text-[var(--cream)] rounded-[10px] p-[14px] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors"
        />
        
        {error && <p className="text-[var(--accent)] text-[12px] text-center">{error}</p>}

        <button
          onClick={handleAccess}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold py-[15px] rounded-[10px] text-[14px] transition-colors shadow-lg"
        >
          Access My Program
        </button>
      </div>

      <p className="text-[11px] text-[var(--text-muted)] text-center leading-[1.6] mt-4">
        Use the same email you used at the time of purchase. Your session will remain active for 7 days.
      </p>
    </div>
  );
}
