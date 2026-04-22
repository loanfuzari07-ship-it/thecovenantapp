"use client";

import { useState } from 'react';
import { DEVOTIONALS } from '@/app/lib/content';
import { ChevronDown, CheckCircle2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DevotionalsTabProps {
  completed: number[];
  onToggle: (day: number) => void;
  notes: Record<number, { text: string; timestamp: string }[]>;
  onAddNote: (day: number, text: string) => void;
}

export function DevotionalsTab({ completed, onToggle, notes, onAddNote }: DevotionalsTabProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<Record<number, string>>({});
  const progressPercent = Math.round((completed.length / 21) * 100);

  const handleSaveNote = (day: number) => {
    const text = noteText[day];
    if (text?.trim()) {
      onAddNote(day, text);
      setNoteText(prev => ({ ...prev, [day]: '' }));
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          21-Day Devotionals
        </span>
        <h2 className="font-lora text-[20px] md:text-[22px] font-semibold text-[var(--cream)] leading-tight mb-2">
          Daily Reflections for Your Heart
        </h2>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed">
          Each devotional is designed to complement your daily prayer. Read slowly, reflect deeply, and use the notes section to capture what God is speaking to you.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[12px] text-[var(--text-secondary)]">{completed.length} of 21 devotionals completed</span>
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
        {DEVOTIONALS.map((dev) => {
          const isCompleted = completed.includes(dev.day);
          const isExpanded = expandedDay === dev.day;
          const dayNotes = notes[dev.day] || [];

          return (
            <div key={dev.day} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] md:rounded-[16px] overflow-hidden">
              <div
                onClick={() => setExpandedDay(isExpanded ? null : dev.day)}
                className={cn(
                  "p-4 md:p-[18px_20px] flex items-center gap-3 cursor-pointer transition-colors",
                  isCompleted && "bg-[var(--bg-surface)]"
                )}
              >
                <div className="bg-[var(--bg-surface)] border border-[var(--border-active)] px-3 py-1 rounded-full text-[11px] font-semibold text-[var(--gold)]">
                  Day {dev.day}
                </div>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-[var(--gold)]" />}
                <h4 className="text-[14px] md:text-[16px] font-semibold text-[var(--cream)] flex-1 line-clamp-1">{dev.title}</h4>
                <ChevronDown className={cn("w-4 h-4 text-[var(--text-muted)] transition-transform", isExpanded && "rotate-180")} />
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 md:px-[20px] md:pb-[20px] animate-in slide-in-from-top-2 duration-200">
                  <h3 className="font-lora text-[17px] font-semibold text-[var(--cream)] mb-3 leading-[1.4] md:text-[19px]">
                    {dev.title}
                  </h3>
                  
                  <span className="inline-block bg-[rgba(201,169,110,0.1)] text-[var(--gold)] text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                    {dev.scripture}
                  </span>

                  <div className="bg-[var(--bg-surface)] border-l-[3px] border-[var(--gold)] rounded-r-lg p-3 mb-4">
                    <p className="font-lora text-[13px] italic text-[var(--gold-light)] leading-relaxed md:text-[14px]">
                      {dev.scriptureText}
                    </p>
                  </div>

                  <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-[1.8] mb-6 whitespace-pre-wrap">
                    {dev.reflection}
                  </p>

                  <div className="mb-4">
                    <h5 className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-2">Notes</h5>
                    <textarea
                      value={noteText[dev.day] || ''}
                      onChange={(e) => setNoteText(prev => ({ ...prev, [dev.day]: e.target.value }))}
                      placeholder="Write your reflections here..."
                      className="w-full min-h-[80px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-3 text-[13px] md:text-[14px] text-[var(--cream)] focus:outline-none focus:border-[var(--gold)] resize-y mb-2"
                    />
                    <button
                      onClick={() => handleSaveNote(dev.day)}
                      className="px-4 py-2 border-2 border-[var(--gold)] rounded-lg text-[var(--gold)] text-[12px] md:text-[13px] font-bold bg-transparent hover:bg-[rgba(201,169,110,0.1)] transition-colors flex items-center gap-2"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Note
                    </button>

                    <div className="mt-3 space-y-2">
                      {dayNotes.map((note, idx) => (
                        <div key={idx} className="bg-[var(--bg-surface)] rounded-lg p-3">
                          <p className="text-[12px] md:text-[13px] text-[var(--cream)] leading-relaxed">{note.text}</p>
                          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{note.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {isCompleted ? (
                    <div className="w-full py-2.5 bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)] rounded-lg text-center text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(dev.day);
                      }}
                      className="w-full py-2.5 md:py-[16px] bg-transparent border-2 border-[var(--gold)] rounded-lg text-[var(--gold)] text-[13px] md:text-[14px] font-bold hover:bg-[rgba(201,169,110,0.1)] transition-colors"
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