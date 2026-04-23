"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface ReflectionAssistantProps {
  devotionalNotes: Record<number, { text: string }[]>;
  protocolCompletedDays: number[];
}

export function ReflectionAssistant({ devotionalNotes, protocolCompletedDays }: ReflectionAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generateInsights() {
    setLoading(true);
    setError(null);
    setInsights(null);

    const progress = Math.round(((protocolCompletedDays.length) / 21) * 100);

    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          notes: devotionalNotes,
          progress 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate insights');

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setInsights(data.insights);
    } catch (err) {
      console.error(err);
      setError("We're having trouble connecting right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col items-center text-center p-6 border border-[var(--border-active)] rounded-xl bg-[var(--bg-card)]">
        <Sparkles className="w-8 h-8 text-[var(--gold)] mb-3" />
        <h3 className="font-lora text-lg font-semibold text-[var(--cream)] mb-2">Personalized Reflection Guide</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          Our AI assistant can analyze your journal entries and progress to provide spiritual insights tailored to your journey.
        </p>
        <Button 
          onClick={generateInsights} 
          disabled={loading}
          className="bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--bg-primary)] font-bold px-8 py-[15px] h-auto rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating your insights...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Insights
            </>
          )}
        </Button>
      </div>

      {(insights || error) && (
        <div className="animate-in fade-in duration-500">
          <div className="bg-[var(--bg-surface)] border-l-[3px] border-[var(--gold)] rounded-[0_12px_12px_0] p-4 mt-4">
            {error ? (
              <p className="font-inter text-[13px] text-[var(--text-muted)] leading-relaxed">{error}</p>
            ) : (
              <div className="font-inter text-[13px] text-[var(--cream)] whitespace-pre-wrap leading-[1.8]">
                {insights}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
