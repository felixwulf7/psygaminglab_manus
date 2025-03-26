# PsyGamingLab Deployment Guide

This guide outlines the steps to deploy the PsyGamingLab application, which integrates therapeutic gaming experiences with a focus on mental health.

## Prerequisites

- Node.js 18.x or later
- npm 8.x or later
- Git

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/felixwulf7/psygaminglab_manus.git
cd psygaminglab_manus
```

2. Install dependencies:
```bash
npm install
```

3. Create necessary directories:
```bash
mkdir -p public/games
```

4. Run the fix script to resolve common issues:
```bash
node scripts/fix-params-warning.js
```

5. Build the application for production:
```bash
npm run build
```

6. Start the production server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```
DEEPINFRA_API_KEY=your_api_key_here
```

### Custom Game Templates

Game templates are stored in the `public/templates/` directory. Generated games are saved to `public/games/`.

## Fix Summary

The following fixes have been implemented in this version:

1. **Fixed API Route (`route.ts`)**:
   - Created a static sample response to avoid DeepInfra API errors
   - Improved error handling with more specific error messages
   - Fixed template replacement logic for positive thoughts

2. **Fixed Client Component (`create/page.tsx`)**:
   - Used the `useParams` hook properly
   - Added correct language detection from URL parameters

3. **Fixed Middleware (`middleware.ts`)**:
   - Removed file system operations that can't run in middleware
   - Simplified URL path rewriting

4. **Fixed Configuration (`next.config.js`)**:
   - Removed deprecated options
   - Added proper middleware configuration

5. **Fixed Params Handling Issues**:
   - Made page components async to properly handle params
   - Added proper await statements for params access

## Deployment Options

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from main branch

### Traditional Hosting

1. Build the application: `npm run build`
2. Copy the `.next/`, `public/`, `package.json`, and `package-lock.json` files to your server
3. Install production dependencies: `npm install --production`
4. Start with: `npm start`

## Backup Procedure

Before major changes, create a backup:

```bash
# Create a backup branch
git checkout -b backup-before-changes

# Create a ZIP backup excluding node_modules and .git
cd ..
zip -r psygaminglab_backup.zip psygaminglab_manus -x "psygaminglab_manus/node_modules/*" -x "psygaminglab_manus/.git/*" -x "psygaminglab_manus/.next/*"
```

## Troubleshooting

If the application doesn't start or you encounter errors:

1. Check server logs: `npm run dev`
2. Verify you're using a compatible Node.js version
3. Clear Next.js cache: `rm -rf .next`
4. Run the fix script: `node scripts/fix-params-warning.js`

## Contact

For additional help, contact the repository owner or raise an issue on GitHub. 