const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

// Helper function to process a file
async function processFile(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    let content = await fs.readFile(filePath, 'utf8');
    
    // Check if file needs to be modified
    if (content.includes('params.lang') && !content.includes('await params.lang')) {
      let modified = false;
      
      // Fix generateMetadata function
      if (content.includes('export async function generateMetadata')) {
        // Already async, just need to add await
        content = content.replace(
          /if\s*\(\s*!isValidLanguage\s*\(\s*params\.lang\s*\)\s*\)/g,
          match => {
            modified = true;
            return `const lang = await params.lang;\nif (!isValidLanguage(lang))`;
          }
        );
        
        // Replace other references to params.lang in the metadata function
        content = content.replace(
          /params\.lang\s+as\s+Language/g,
          match => {
            modified = true;
            return `lang as Language`;
          }
        );
        
        content = content.replace(
          /const\s+lang\s*=\s*params\.lang\s+as\s+Language/g,
          match => {
            modified = true;
            return `const lang = await params.lang;\n  const langCode = lang as Language`;
          }
        );
      }
      
      // Fix page component function - make it async and add await
      content = content.replace(
        /export\s+default\s+function\s+(\w+)\s*\(\s*{\s*params\s*}\s*:[^)]+\)\s*{/g,
        match => {
          modified = true;
          return match.replace('function', 'async function');
        }
      );
      
      // Add await for params.lang in the page component
      content = content.replace(
        /if\s*\(\s*!isValidLanguage\s*\(\s*params\.lang\s*\)\s*\)\s*{/g,
        match => {
          modified = true;
          return `const lang = await params.lang;\n  if (!isValidLanguage(lang)) {`;
        }
      );
      
      // Replace other references to params.lang in the component
      content = content.replace(
        /const\s+lang\s*=\s*params\.lang\s+as\s+Language/g,
        match => {
          modified = true;
          return `const langCode = lang as Language`;
        }
      );
      
      // Replace lang with langCode in the JSX
      if (modified) {
        content = content.replace(/lang\s*===/g, 'langCode ===');
        content = content.replace(/\${lang}/g, '${langCode}');
        content = content.replace(/lang={lang}/g, 'lang={langCode}');
        content = content.replace(/\/${lang}\//g, '/${langCode}/');
      }
      
      // If modifications were made, write the file back
      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`  ✓ Fixed warnings in ${filePath}`);
        return true;
      } else {
        console.log(`  ✓ No warnings to fix in ${filePath}`);
        return false;
      }
    } else {
      console.log(`  ✓ File already correct or doesn't need fixing: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function to find and process all page components
async function main() {
  try {
    // Find all page components
    const files = glob.sync('app/[lang]/**/page.tsx');
    
    let fixedCount = 0;
    for (const file of files) {
      const fixed = await processFile(file);
      if (fixed) fixedCount++;
    }
    
    console.log(`\nDone! Fixed params.lang warnings in ${fixedCount} files.`);
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

main(); 