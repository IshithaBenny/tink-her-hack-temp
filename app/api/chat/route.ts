import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing message or API key' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation context
    const chat = model.startChat({
      history: conversationHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    const systemPrompt = `You are a helpful assistant for CampusFind, a lost and found app for college students. 
You help students report lost items, find found items, and answer questions about how the app works.
- Help users understand the process: Report → Smart Scan to match items → Answer security questions
- Be friendly and supportive
- If questions are not related to CampusFind or the lost/found process, politely redirect to the app's purpose
- Keep responses concise and helpful`;

    const result = await chat.sendMessage(
      `${systemPrompt}\n\nUser question: ${message}`
    );

    const reply = result.response.text();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
