'use server';
/**
 * @fileOverview An AI agent that analyzes user's devotional notes and protocol progress to provide personalized insights.
 *
 * - personalizedReflectionAssistant - A function that handles the personalized reflection generation process.
 * - PersonalizedReflectionAssistantInput - The input type for the personalizedReflectionAssistant function.
 * - PersonalizedReflectionAssistantOutput - The return type for the personalizedReflectionAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedReflectionAssistantInputSchema = z.object({
  devotionalNotes: z
    .record(z.array(z.string()))
    .describe("An object where keys are day numbers (as strings) and values are arrays of devotional notes for that day."),
  protocolCompletedDays: z
    .array(z.number())
    .describe("An array of numbers representing the day numbers of completed protocol prayers."),
});
export type PersonalizedReflectionAssistantInput = z.infer<typeof PersonalizedReflectionAssistantInputSchema>;

const PersonalizedReflectionAssistantOutputSchema = z.object({
  insights: z.string().describe("Personalized insights derived from the user's notes and progress."),
  reflectiveQuestions: z.array(z.string()).describe("A list of reflective questions to deepen engagement."),
  prayerPrompts: z.array(z.string()).describe("A list of custom prayer prompts tailored to the user's journey."),
});
export type PersonalizedReflectionAssistantOutput = z.infer<typeof PersonalizedReflectionAssistantOutputSchema>;

export async function personalizedReflectionAssistant(
  input: PersonalizedReflectionAssistantInput
): Promise<PersonalizedReflectionAssistantOutput> {
  return personalizedReflectionAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedReflectionAssistantPrompt',
  input: { schema: PersonalizedReflectionAssistantInputSchema },
  output: { schema: PersonalizedReflectionAssistantOutputSchema },
  prompt: `You are a compassionate and insightful spiritual guide within 'The Covenant App'.
Your task is to analyze a user's devotional notes and their progress through the 21-day marriage restoration protocol.
Based on this information, provide personalized insights, thought-provoking reflective questions, and custom prayer prompts to help the user deepen their spiritual journey and engagement with the program.

Here are the user's devotional notes:
{{#each devotionalNotes}}
Day {{ @key }}:
{{#each this}}
- {{{this}}}
{{/each}}
{{/each}}

Here are the protocol days the user has completed: {{#if protocolCompletedDays}}{{protocolCompletedDays}}{{else}}None yet.{{/if}}

Consider the themes, emotions, and progress indicated in the notes and completed days. Your output should be encouraging and tailored to their journey. Focus on helping them reflect further, connect with God, and stay committed to their covenant.`,
});

const personalizedReflectionAssistantFlow = ai.defineFlow(
  {
    name: 'personalizedReflectionAssistantFlow',
    inputSchema: PersonalizedReflectionAssistantInputSchema,
    outputSchema: PersonalizedReflectionAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
