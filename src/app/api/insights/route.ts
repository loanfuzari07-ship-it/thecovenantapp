import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { notes, progress } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const notesContent = notes && Object.keys(notes).length > 0 
      ? JSON.stringify(notes) 
      : `The user has not written any journal notes yet but has completed ${progress}% of the protocol.`;

    const promptText = `The user has completed ${progress}% of their 21-day marriage restoration protocol. Here are their journal notes from their devotionals: ${notesContent}. Please provide personalized spiritual insights based on their journey.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a compassionate spiritual guide for The Covenant App, a 21-day marriage restoration program. Analyze the user's journal notes and progress and provide warm, faith-based, personalized spiritual insights in 3 to 4 short paragraphs. Be encouraging, specific to what they shared, and grounded in hope and restoration. Speak directly to the user in second person."
            }
          ]
        },
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error('Failed to fetch insights');
    }

    const data = await response.json();
    const insights = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!insights) {
      throw new Error('No content returned from Gemini');
    }

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Insights API Error:', error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}
