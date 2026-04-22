"use client";

import { useState } from 'react';
import { PROTOCOL_DAYS } from '@/app/lib/content';
import { ChevronDown, CheckCircle2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProtocolTabProps {
  completed: number[];
  onToggle: (day: number) => void;
}

export function ProtocolTab({ completed, onToggle }: ProtocolTabProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const progressPercent = Math.round((completed.length / 21) * 100);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          21-Day Covenant Protocol
        </span>
        <h2 className="font-lora text-[20px] font-semibold text-[var(--cream)] leading-tight mb-2">
          Your Daily Prayer Journey
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
          Each day contains a guided prayer audio designed to address a specific spiritual root of disconnection in your marriage. Listen with your eyes closed and your heart open.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[12px] text-[var(--text-secondary)]">{completed.length} of 21 days completed</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--gold)] transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[var(--border)] mb-6" />

      <div className="space-y-3 pb-8">
        {PROTOCOL_DAYS.map((day) => {
          const isCompleted = completed.includes(day.day);
          const isExpanded = expandedDay === day.day;

          return (
            <div key={day.day} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] overflow-hidden">
              <div
                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                className={cn(
                  "p-4 flex items-center gap-3 cursor-pointer transition-colors",
                  isCompleted && "bg-[var(--bg-surface)]"
                )}
              >
                <div className="bg-[var(--bg-surface)] border border-[var(--border-active)] px-3 py-1 rounded-full text-[11px] font-semibold text-[var(--gold)]">
                  Day {day.day}
                </div>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-[var(--gold)]" />}
                <h4 className="text-[14px] font-semibold text-[var(--cream)] flex-1 line-clamp-1">{day.title}</h4>
                <ChevronDown className={cn("w-4 h-4 text-[var(--text-muted)] transition-transform", isExpanded && "rotate-180")} />
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                  <span className="inline-block bg-[rgba(201,169,110,0.1)] text-[var(--gold-dark)] text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full mb-3">
                    {day.phase}
                  </span>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
                    {day.description}
                  </p>

                  <div className="audio-placeholder rounded-xl p-4 flex items-center gap-3 mb-4">
                    <button 
                      onClick={() => alert('Audio coming soon. Upload your audio file to activate this player.')}
                      className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0"
                    >
                      <Play className="w-[14px] h-[14px] text-white fill-white ml-0.5" />
                    </button>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-[var(--cream)]">Day {day.day} Prayer Audio</div>
                      <div className="text-[11px] text-[var(--text-muted)]">Tap to play</div>
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">~8 min</div>
                  </div>

                  {isCompleted ? (
                    <div className="w-full py-2.5 bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)] rounded-lg text-center text-[13px] font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(day.day);
                      }}
                      className="w-full py-2.5 border border-[var(--border-active)] rounded-lg text-[var(--gold)] text-[13px] font-semibold hover:bg-[var(--bg-surface)] transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
