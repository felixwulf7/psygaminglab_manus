import { NextResponse } from 'next/server';

export async function GET() {
  // List of available models for DeepInfra
  const models = [
    { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B (Recommended)' },
    { id: 'meta-llama/Llama-2-70b-chat-hf', name: 'Llama 2 70B' },
    { id: 'meta-llama/Meta-Llama-3-8B-Instruct', name: 'Meta Llama 3 8B' }
  ];
  
  return NextResponse.json({ models });
} 