# PsyGamingLab with Custom Games Integration

This repository contains the integrated version of the PsyGamingLab website and the Custom Games application. The integration allows users to create personalized therapeutic games directly from the main website.

## Features

- Single application running on port 3000
- Unified navigation with "Create Your Custom Game" link in the header
- Multilingual support (English and German)
- AI-powered game generation using the DeepInfra API
- Responsive design for both desktop and mobile

## Technical Overview

The integration merges the Flask-based custom games application into the Next.js website:

1. **API Routes**: The Flask backend has been converted to Next.js API routes under `/app/api/games/`
2. **Game Creation Interface**: A new page has been added at `/app/[lang]/games/create/` 
3. **Game Files**: Generated game HTML files are stored in `/public/games/`
4. **Middleware**: A custom middleware handles serving the game HTML files

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Navigate to http://localhost:3000 in your browser

## Project Structure

- `/app/[lang]/games/create/` - The custom game creation interface
- `/app/api/games/` - API routes for game creation and management
- `/public/templates/` - Game template files
- `/public/games/` - Generated game files (created at runtime)

## API Endpoints

- **POST /api/games/create** - Creates a new custom game
  - Request body: `{ userInput: string, model?: string }`
  - Response: `{ success: boolean, filename: string, url: string }`

- **GET /api/games/models** - Gets available AI models
  - Response: `{ models: Array<{ id: string, name: string }> }`

- **GET /games/{filename}.html** - Serves the generated game HTML file

## Environment Variables

The application uses the following environment variables:

- `DEEPINFRA_API_KEY` - API key for DeepInfra (default is provided but you can use your own)

## Building for Production

To build the application for production:

```bash
npm run build
```

Then, to start the production server:

```bash
npm start
```

## Customization

You can customize the AI model used for game generation by modifying the `DEFAULT_MODEL` constant in `/app/api/games/create/route.ts`.

## Troubleshooting

If you encounter any issues:

1. Make sure the `/public/games/` directory exists and is writable
2. Check that the template file exists in `/public/templates/`
3. Verify that the DeepInfra API key is valid

## License

This project is licensed under the MIT License - see the LICENSE file for details. 