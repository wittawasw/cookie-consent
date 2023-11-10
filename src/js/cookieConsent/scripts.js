import { loadGTag } from './scripts/gtag.js';

const GTAG = process.env.GTAG;

// Function to execute scripts when consent is given
export function executeScripts() {
  // Add your scripts here and manage additional files in ./scripts

  // Call the loadGTag function to initialize Google Tag Manager
  // if GTAG is defined with string type
  if (typeof GTAG === 'string') {
    loadGTag(GTAG);
  }
}

