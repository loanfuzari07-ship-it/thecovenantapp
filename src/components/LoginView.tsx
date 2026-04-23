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
          src="https://imgur.com/nkvXAmb.png"
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
        <h1 className="font-lora text-[28px] md:text-[30px] font-semibold text-[var(--cream)]">
          Covenant App
        </h1>
      </div>

      <div className="w-[60px] h-[1px] bg-[var(--gold)] opacity-40 mb-8" />

      <div className="w-full max-w-[320px] space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-[var(--bg-card)] border border-[var(--border)] focus:border-[var(--gold)] text-[var(--cream)] rounded-[10px] p-[14px] text-[16px] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors"
        />
        
        {error && <p className="text-[var(--accent)] text-[12px] text-center">{error}</p>}

        <button
          onClick={handleAccess}
          className="w-full bg-[#C9A96E] text-[#1C1410] font-bold py-[15px] md:py-[18px] rounded-[10px] text-[14px] md:text-[15px] border-none transition-colors shadow-lg"
        >
          Access My Program
        </button>

        <p className="text-[12px] text-[var(--text-muted)] text-center leading-[1.6] mt-4">
          Enter the email address you used at the time of purchase to access your program.
        </p>
      </div>
    </div>
  );
}
