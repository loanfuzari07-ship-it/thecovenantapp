"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, MessageCircle, HelpCircle, Heart } from "lucide-react";
import { personalizedReflectionAssistant, type PersonalizedReflectionAssistantOutput } from '@/ai/flows/personalized-reflection-assistant';

interface ReflectionAssistantProps {
  devotionalNotes: Record<number, { text: string }[]>;
  protocolCompletedDays: number[];
}

export function ReflectionAssistant({ devotionalNotes, protocolCompletedDays }: ReflectionAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<PersonalizedReflectionAssistantOutput | null>(null);

  async function generateInsights() {
    setLoading(true);
    try {
      const inputNotes: Record<string, string[]> = {};
      Object.entries(devotionalNotes).forEach(([day, notesArr]) => {
        inputNotes[day] = notesArr.map(n => n.text);
      });

      const result = await personalizedReflectionAssistant({
        devotionalNotes: inputNotes,
        protocolCompletedDays
      });
      setInsights(result);
    } catch (error) {
      console.error(error);
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
          className="bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--bg-primary)] font-semibold px-8"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Generate Insights
        </Button>
      </div>

      {insights && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <Card className="bg-[var(--bg-surface)] border-[var(--border)]">
            <CardHeader className="flex flex-row items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[var(--gold)]" />
              <CardTitle className="text-md font-semibold text-[var(--cream)]">Spiritual Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">"{insights.insights}"</p>
            </CardContent>
          </Card>

          <Card className="bg-[var(--bg-surface)] border-[var(--border)]">
            <CardHeader className="flex flex-row items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--gold)]" />
              <CardTitle className="text-md font-semibold text-[var(--cream)]">Reflective Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.reflectiveQuestions.map((q, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex gap-2">
                    <span className="text-[var(--gold)]">•</span> {q}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[var(--bg-surface)] border-[var(--border)]">
            <CardHeader className="flex flex-row items-center gap-2">
              <Heart className="w-5 h-5 text-[var(--accent)]" />
              <CardTitle className="text-md font-semibold text-[var(--cream)]">Custom Prayer Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.prayerPrompts.map((p, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex gap-2">
                    <span className="text-[var(--accent)]">•</span> {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
