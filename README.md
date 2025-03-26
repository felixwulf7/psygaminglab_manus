# PsyGamingLab - Integrated Web Platform

This repository contains the integrated PsyGamingLab website with the custom games application. The platform provides therapeutic gaming experiences and allows users to create personalized therapeutic games.

## Features

- Responsive, multilingual website (English and German)
- Showcase of pre-made therapeutic games
- Custom game creation functionality
- AI-powered game content generation
- Single application running on port 3000

## Prerequisites

Before running this application, you need to have the following installed:

- Node.js (version 16.x or higher)
- npm (usually comes with Node.js)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/felixwulf7/psygaminglab_costum.git
   cd psygaminglab_costum
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the necessary directories:
   ```bash
   mkdir -p public/games
   ```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the application on [http://localhost:3000](http://localhost:3000).

### Production Mode

To build and run the application in production mode:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The application will be available on [http://localhost:3000](http://localhost:3000).

## Project Structure

- `/app`: Main application code
  - `/[lang]`: Language-specific routes (en, de)
  - `/api`: API routes
  - `/components`: Reusable React components
  - `/config`: Configuration files
  - `/utils`: Utility functions
- `/public`: Static assets
  - `/games`: Generated game HTML files
  - `/templates`: Game templates
  - `/images`: Image assets

## Custom Games Integration

The custom games functionality is integrated into the main website. Users can:

1. Access the custom game creation page at `/[lang]/games/create`
2. Enter the challenge or situation they're struggling with
3. The system will generate a personalized therapeutic game
4. The generated game is saved and can be played immediately

## API Endpoints

- `POST /api/games/create`: Creates a custom game based on user input
- `GET /api/games/models`: Returns a list of available AI models
- `GET /games/{filename}.html`: Serves a generated game file

## Environment Configuration

The application uses the following environment variables:

- `DEEPINFRA_API_KEY`: API key for DeepInfra (for AI-powered game content generation)

## Troubleshooting

If you encounter any issues:

1. Make sure the `/public/games/` directory exists and is writable
2. Check that the template file exists in `/public/templates/`
3. Verify that your Node.js version is compatible

## License

This project is licensed under the MIT License.

## Acknowledgments

- PsyGamingLab team for the original website and custom games application
- Next.js team for the framework
- DeepInfra for the AI capabilities 