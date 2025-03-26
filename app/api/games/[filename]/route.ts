import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
  
  if (!filename || !filename.endsWith('.html')) {
    return new Response('Invalid filename', { status: 400 });
  }
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'games', filename);
    const content = await readFile(filePath, 'utf-8');
    
    return new Response(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error reading game file:', error);
    return new Response('Game not found', { status: 404 });
  }
} 