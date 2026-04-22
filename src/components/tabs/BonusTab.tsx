"use client";

import { FREQUENCIES, TEXTS } from '@/app/lib/content';
import { Play, AlertTriangle } from 'lucide-react';

export function BonusTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          Bonus Content
        </span>
        <h2 className="font-lora text-[20px] font-semibold text-[var(--cream)] leading-tight mb-2">
          Your Complete Restoration Toolkit
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
          These bonuses are designed to complement your daily protocol and deepen your restoration journey.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
          <h3 className="font-lora text-[18px] font-semibold text-[var(--cream)]">
            Sacred Frequency Audio Series
          </h3>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
          Each frequency has been carefully selected for its association with specific areas of emotional and spiritual healing. Listen with headphones for the best experience.
        </p>

        <div className="space-y-4">
          {FREQUENCIES.map((freq) => (
            <div key={freq.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] p-4">
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
                Frequency {freq.id}
              </span>
              <h4 className="font-lora text-[16px] font-semibold text-[var(--cream)] mb-1">{freq.title}</h4>
              <span className="inline-block bg-[rgba(201,169,110,0.1)] text-[var(--gold-dark)] text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-3">
                {freq.value}
              </span>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">
                {freq.description}
              </p>
              
              <div className="bg-[var(--bg-surface)] rounded-lg p-3 mb-4">
                <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--gold)] mb-1 block">How to use</span>
                <p className="text-[12px] text-[var(--cream)] leading-relaxed">{freq.usage}</p>
              </div>

              <div className="audio-placeholder rounded-xl p-4 flex items-center gap-3">
                <button 
                  onClick={() => alert('Audio coming soon. Upload your frequency audio to activate.')}
                  className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0"
                >
                  <Play className="w-[14px] h-[14px] text-white fill-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[var(--cream)]">Frequency Audio</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Tap to play</div>
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">~10 min</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[var(--border)] mb-8" />

      <div>
        <h3 className="font-lora text-[18px] font-semibold text-[var(--cream)] mb-2">
          Three Texts That Reopen His Heart
        </h3>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5">
          These three messages are not manipulation. They are carefully crafted invitations that create space for connection without pressure.
        </p>

        <div className="bg-[rgba(216,90,48,0.1)] border border-[rgba(216,90,48,0.3)] rounded-xl p-4 mb-6 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
          <p className="text-[13px] text-[var(--accent-light)] leading-relaxed">
            <strong>Important:</strong> Do not send these texts before you are ready. Read the guidance for each one completely. Timing matters more than the words themselves.
          </p>
        </div>

        <div className="space-y-4">
          {TEXTS.map((text) => (
            <div key={text.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] overflow-hidden">
              <div className="bg-[var(--bg-surface)] p-4 border-b border-[var(--border)]">
                <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-0.5 block">Text {text.id}</span>
                <h4 className="font-lora text-[16px] font-semibold text-[var(--cream)]">{text.title}</h4>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1.5 block">When to send</span>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{text.when}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1.5 block">The message</span>
                  <div className="bg-[var(--bg-surface)] border-l-[3px] border-[var(--gold)] rounded-r-xl p-4">
                    <p className="font-lora text-[14px] italic text-[var(--cream)] leading-relaxed">"{text.message}"</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1.5 block">Why it works</span>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{text.why}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--accent)] mb-1.5 block">What not to do</span>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{text.notToDo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
