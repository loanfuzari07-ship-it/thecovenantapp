"use client";

import { useState } from 'react';
import { PROTOCOL_DAYS } from '@/app/lib/content';
import { ChevronDown, CheckCircle2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomAudioPlayer } from '@/components/CustomAudioPlayer';

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
        <h2 className="font-lora text-[20px] md:text-[22px] font-semibold text-[var(--cream)] leading-tight mb-2">
          Your Daily Prayer Journey
        </h2>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed">
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
            <div key={day.day} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] md:rounded-[16px] overflow-hidden">
              <div
                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                className={cn(
                  "p-4 md:p-[18px_20px] flex items-center gap-3 cursor-pointer transition-colors",
                  isCompleted && "bg-[var(--bg-surface)]"
                )}
              >
                <div className={cn(
                  "bg-[var(--bg-surface)] border border-[var(--border-active)] px-3 py-1 rounded-full text-[11px] font-semibold transition-colors",
                  isCompleted ? "text-[#639922]" : "text-[var(--gold)]"
                )}>
                  Day {day.day}
                </div>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-[#639922]" />}
                <h4 className="text-[14px] md:text-[16px] font-semibold flex-1 line-clamp-1 text-[var(--cream)]">
                  {day.title}
                </h4>
                <ChevronDown className={cn("w-4 h-4 text-[var(--text-muted)] transition-transform", isExpanded && "rotate-180")} />
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 md:px-[20px] md:pb-[20px] animate-in slide-in-from-top-2 duration-200">
                  <h3 className="font-lora text-[17px] md:text-[19px] font-semibold text-[var(--cream)] mb-[12px] leading-[1.4]">
                    {day.title}
                  </h3>
                  <span className="inline-block bg-[rgba(201,169,110,0.1)] text-[var(--gold-dark)] text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full mb-3">
                    {day.phase}
                  </span>
                  <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
                    {day.description}
                  </p>

                  <CustomAudioPlayer src={`/audios/day${day.day}-prayer.MP3`} />

                  <a
                    href={`/pdfs/day${day.day}-guide.pdf`}
                    download
                    className="flex items-center justify-center gap-2 w-full p-[11px_16px] bg-transparent hover:bg-[rgba(201,169,110,0.1)] text-[var(--gold)] border border-[var(--border-active)] rounded-[8px] text-[12px] font-bold font-inter cursor-pointer mb-[10px] no-underline transition-colors"
                  >
                    <Download className="w-[14px] h-[14px]" />
                    Download Prayer Guide
                  </a>

                  {isCompleted ? (
                    <div className="w-full py-2.5 bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)] rounded-lg text-center text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(day.day);
                      }}
                      className="w-full py-2.5 md:py-[16px] bg-[#C9A96E] hover:bg-[#A8854A] border-none text-[#1C1410] rounded-[8px] text-[13px] md:text-[14px] font-bold transition-colors shadow-md"
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
