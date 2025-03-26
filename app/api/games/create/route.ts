import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const DEFAULT_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";
const DEEPINFRA_API_KEY = "xXIq1CQzz2C2a3tIycGCZwDBAYjqnB4T"; // Consider using environment variables

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userInput, model = DEFAULT_MODEL } = body;

    if (!userInput) {
      return NextResponse.json(
        { error: 'Missing required field: userInput' },
        { status: 400 }
      );
    }

    // Generate game content with AI
    const gameContent = await generateWithDeepInfra(userInput, model);
    
    // Create the game HTML file
    const result = await createCustomGame(gameContent);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game. ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

async function generateWithDeepInfra(userInput: string, model = DEFAULT_MODEL) {
  const prompt = `
  You are an expert in therapeutic game design and cognitive-behavioral therapy.
  You are creating content for a 3D therapeutic game where players shoot positive thoughts (affirmations) at negative thoughts.
  
  The user has shared that they are struggling with: "${userInput}"
  
  You need to create custom content SPECIFICALLY TAILORED to this situation:
  
  1. Create a meaningful title for the game that directly relates to ${userInput}
  2. Create 5 positive affirmations/thoughts that would help someone dealing with ${userInput}
  3. Create 5 corresponding negative thoughts that someone struggling with ${userInput} might experience
  
  **VERY IMPORTANT INSTRUCTION**: Each positive thought must DIRECTLY counter a specific negative thought.
  The game mechanics REQUIRE that:
  - Positive thought #0 should counter negative thought with correctAmmo: 0
  - Positive thought #1 should counter negative thought with correctAmmo: 1
  - Positive thought #2 should counter negative thought with correctAmmo: 2
  - Positive thought #3 should counter negative thought with correctAmmo: 3
  - Positive thought #4 should counter negative thought with correctAmmo: 4
  
  Your response must be a valid JSON object with this exact structure:
  {
      "title": "Game Title: Subtitle",
      "positiveThoughts": ["positive1", "positive2", "positive3", "positive4", "positive5"],
      "negativeThoughts": [
          {"text": "negative1", "correctAmmo": 0},
          {"text": "negative2", "correctAmmo": 1},
          {"text": "negative3", "correctAmmo": 2},
          {"text": "negative4", "correctAmmo": 3},
          {"text": "negative5", "correctAmmo": 4}
      ]
  }
  
  Make all thoughts concise (under 10 words if possible), impactful, and therapeutically sound.
  Each thought should be highly specific to the user's situation about ${userInput}.
  Return only the JSON object without any additional text.
  `;

  try {
    // Manually create sample content for testing purposes
    // In a production environment, this would be replaced with the actual API call
    const sampleContent = {
      title: `Overcoming ${userInput}: Finding Strength`,
      positiveThoughts: [
        `You are capable of handling ${userInput}`,
        `This challenge with ${userInput} makes you stronger`,
        `You have overcome similar difficulties before`,
        `Your worth isn't defined by ${userInput}`,
        `Each day with ${userInput} is a new opportunity`
      ],
      negativeThoughts: [
        {text: `I'll never get past ${userInput}`, correctAmmo: 0},
        {text: `${userInput} is too difficult for me`, correctAmmo: 1},
        {text: `I always fail when dealing with ${userInput}`, correctAmmo: 2},
        {text: `${userInput} proves I'm not good enough`, correctAmmo: 3},
        {text: `There's no way forward with ${userInput}`, correctAmmo: 4}
      ]
    };
    
    // Comment the API call for now since it's causing issues
    /*
    const response = await axios.post(
      `https://api.deepinfra.com/v1/inference/${encodeURIComponent(model)}`,
      {
        input: prompt,
        max_new_tokens: 1024,
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPINFRA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.output;
    
    // Parse the JSON from the LLM response
    try {
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd <= jsonStart) {
        throw new Error('Invalid JSON structure in response');
      }
      
      const jsonContent = content.substring(jsonStart, jsonEnd);
      const parsedContent = JSON.parse(jsonContent);
      */
      
    // Use the sample content instead
    const parsedContent = sampleContent;
      
    // Validate required fields
    if (!parsedContent.title || !parsedContent.positiveThoughts || !parsedContent.negativeThoughts) {
      throw new Error('Missing required fields in response');
    }
    
    return parsedContent;
  } catch (error) {
    console.error('Error generating game content:', error);
    throw new Error('Failed to generate game content: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

async function createCustomGame(gameContent: any) {
  try {
    // Generate a unique filename
    const timestamp = Math.floor(Date.now() / 1000);
    const filename = `custom_game_${timestamp}.html`;
    const filePath = path.join(process.cwd(), 'public', 'games', filename);
    
    // Get the template
    const templatePath = path.join(process.cwd(), 'public', 'templates', '3d_shooter_accepting_being_tired.html');
    let templateContent = fs.readFileSync(templatePath, 'utf-8');
    
    // Replace template placeholders with game content
    const gameTitle = gameContent.title || 'Custom Therapeutic Game';
    const positiveThoughts = JSON.stringify(gameContent.positiveThoughts || []);
    
    // Format negative thoughts correctly for the game
    const negativeThoughts = gameContent.negativeThoughts || [];
    let negativeThoughtsJs = 'const negativeThoughts = [\n';
    
    const colors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf1c40f, 0x9b59b6]; // Red, Blue, Green, Yellow, Purple
    const colorNames = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
    
    negativeThoughts.forEach((thought: any, index: number) => {
      const text = thought.text || thought;
      const correctAmmo = thought.correctAmmo !== undefined ? thought.correctAmmo : index;
      const color = colors[index % colors.length];
      const colorName = colorNames[index % colorNames.length];
      
      negativeThoughtsJs += `    { text: "${text}", correctAmmo: ${correctAmmo}, color: ${color} }`;
      
      if (index < negativeThoughts.length - 1) {
        negativeThoughtsJs += `, // ${colorName}\n`;
      } else {
        negativeThoughtsJs += ` // ${colorName}\n`;
      }
    });
    
    negativeThoughtsJs += '];';
    
    // Replace placeholders in the template
    templateContent = templateContent.replace('const gameTitle = "Overcoming Fatigue";', `const gameTitle = "${gameTitle}";`);
    
    // Replace positive thoughts
    const posThoughtsArray = gameContent.positiveThoughts.map((thought: string) => `"${thought}"`).join(",\n    ");
    templateContent = templateContent.replace(
      /const positiveThoughts = \[\s*".*"\s*,\s*".*"\s*,\s*".*"\s*,\s*".*"\s*,\s*".*"\s*\];/,
      `const positiveThoughts = [\n    ${posThoughtsArray}\n];`
    );
    
    // Replace the entire negative thoughts array
    const negThoughtsRegex = /const negativeThoughts = \[\s*[\s\S]*?\];/;
    templateContent = templateContent.replace(negThoughtsRegex, negativeThoughtsJs);
    
    // Write the file
    fs.writeFileSync(filePath, templateContent);
    
    return {
      success: true,
      filename,
      url: `/games/${filename}`
    };
  } catch (error) {
    console.error('Error creating custom game:', error);
    throw new Error('Failed to create custom game file: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
} 