#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Process a file to make its components use async/await with params.lang
 * @param {string} filePath - Path to the file to process
 * @returns {boolean} - Whether the file was modified
 */
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if the file contains params.lang
    if (content.includes('params.lang') && !content.includes('await params.lang')) {
      console.log(`Processing ${filePath}`);
      
      // Fix generateMetadata function
      if (content.includes('export async function generateMetadata')) {
        const metadataRegex = /export async function generateMetadata\([^)]*\)\s*\{[^}]*?\s+(\w+)\s*=\s*params\.lang/g;
        if (metadataRegex.test(content)) {
          content = content.replace(
            /(\w+)\s*=\s*params\.lang/g,
            '$1 = await params.lang'
          );
          modified = true;
        }
      }
      
      // Fix component function declaration
      if (content.includes('export default function') && content.includes('params.lang')) {
        content = content.replace(
          /export default function (\w+)/g,
          'export default async function $1'
        );
        
        content = content.replace(
          /(\w+)\s*=\s*params\.lang/g,
          '$1 = await params.lang'
        );
        modified = true;
      }
      
      // Fix already async component function
      if (content.includes('export default async function') && content.includes('params.lang')) {
        content = content.replace(
          /(\w+)\s*=\s*params\.lang/g,
          '$1 = await params.lang'
        );
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${filePath}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

/**
 * Fix API route that uses params incorrectly
 * @param {string} filePath - Path to the file to process
 * @returns {boolean} - Whether the file was modified
 */
function processApiRoute(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if this is an API route using params incorrectly
    if (content.includes('params.filename') && !content.includes('await params.filename')) {
      console.log(`Processing API route ${filePath}`);
      
      // Make destructuring use await
      content = content.replace(
        /const\s*\{\s*filename\s*\}\s*=\s*params/g,
        'const { filename } = await params'
      );
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed API route ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing API route ${filePath}:`, error);
    return false;
  }
}

/**
 * Create fallback for DeepInfra API in the create route
 */
function fixCreateGameApiRoute() {
  const filePath = path.join(process.cwd(), 'app/api/games/create/route.ts');
  
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // Check if there's an issue with the error handling
      if (content.includes('content.indexOf') && !content.includes('if (!content)')) {
        console.log('Fixing create game API route');
        
        // Add proper null check before accessing content
        content = content.replace(
          /try\s*\{\s*const jsonStart\s*=\s*content\.indexOf/,
          'try {\n      // Add null check to prevent errors\n      if (!content) {\n        throw new Error("No content returned from API");\n      }\n      const jsonStart = content.indexOf'
        );
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed create game API route');
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error fixing create game API route:', error);
    return false;
  }
}

/**
 * Main function to find and process all files
 */
async function main() {
  const pagePattern = 'app/[lang]/**/page.tsx';
  const layoutPattern = 'app/[lang]/**/layout.tsx';
  const apiRoutePattern = 'app/api/**/**/route.ts';
  
  const pageFiles = glob.sync(pagePattern);
  const layoutFiles = glob.sync(layoutPattern);
  const apiRouteFiles = glob.sync(apiRoutePattern);
  
  let fixedFiles = 0;
  
  // Process page components
  for (const file of pageFiles.concat(layoutFiles)) {
    if (processFile(file)) {
      fixedFiles++;
    }
  }
  
  // Process API routes
  for (const file of apiRouteFiles) {
    if (processApiRoute(file)) {
      fixedFiles++;
    }
  }
  
  // Fix create game API route specifically
  if (fixCreateGameApiRoute()) {
    fixedFiles++;
  }
  
  console.log(`Done! Fixed params.lang warnings in ${fixedFiles} files.`);
}

main().catch(console.error); 