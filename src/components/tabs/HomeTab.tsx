"use client";

import { useEffect, useState } from 'react';
import { ReflectionAssistant } from '@/components/ReflectionAssistant';

interface HomeTabProps {
  protocolCompleted: number[];
  devotionalCompleted: number[];
  devotionalNotes: Record<number, { text: string }[]>;
  onTabChange: (tab: string) => void;
}

export function HomeTab({ protocolCompleted, devotionalCompleted, devotionalNotes, onTabChange }: HomeTabProps) {
  const totalCompleted = protocolCompleted.length + devotionalCompleted.length;
  const progressPercent = Math.round((totalCompleted / 42) * 100);

  const steps = [
    {
      step: 1,
      title: "Listen to each daily prayer",
      desc: "Each morning or evening find a quiet moment, put your earphones in, and listen to the guided prayer for that day."
    },
    {
      step: 2,
      title: "Complete your daily devotional",
      desc: "After your prayer, open the Devotionals tab and read the reflection for that day. Write your thoughts in the notes section."
    },
    {
      step: 3,
      title: "Show up every day",
      desc: "Consistency is the foundation of this protocol. The shift happens beneath the surface before it becomes visible."
    },
    {
      step: 4,
      title: "Trust the process",
      desc: "This is a spiritual work that unfolds over 21 days. Complete all 21 days before drawing any conclusions."
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          Welcome to your journey
        </span>
        <h2 className="font-lora text-[22px] md:text-[24px] font-semibold text-[var(--cream)] leading-tight mb-2">
          Your Restoration Begins Today.
        </h2>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed">
          You are not alone in this. This is your sacred space to heal, pray, and stand for your covenant.
        </p>
      </div>

      <div className="w-full h-[1px] bg-[var(--border)] mb-6" />

      <h3 className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-4">
        Your Journey Map
      </h3>

      <div className="space-y-[10px] mb-8">
        {steps.map((s) => (
          <div key={s.step} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-[14px] md:p-[18px_20px] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0">
              {s.step}
            </div>
            <div>
              <h4 className="text-[13px] md:text-[14px] font-semibold text-[var(--cream)] mb-0.5">{s.title}</h4>
              <p className="text-[12px] md:text-[13px] text-[var(--text-secondary)] leading-normal">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[12px] text-[var(--text-secondary)]">Your Overall Progress</span>
          <span className="text-[12px] font-semibold text-[var(--gold)]">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => onTabChange('protocol')}
        className="w-full py-[15px] md:py-[18px] bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--bg-primary)] font-bold rounded-xl text-[14px] md:text-[16px] transition-colors shadow-lg"
      >
        Begin My Journey
      </button>

      <ReflectionAssistant devotionalNotes={devotionalNotes} protocolCompletedDays={protocolCompleted} />
    </div>
  );
}