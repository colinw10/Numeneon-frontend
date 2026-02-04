// Daily Learning Data - Index
// Exports all learning categories for easy importing

import techJargon from "./techJargon.json";
import bigO from "./bigO.json";
import loops from "./loops.json";
import methods from "./methods.json";
import vocabulary from "./vocabulary.json";
import mythology from "./mythology.json";

// Get today's items based on day of year (everyone sees the same word each day)
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Get item for today from a category (cycles through the list)
export const getTodayItem = (category) => {
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % category.length;
  return category[index];
};

// Get all of today's learning items
export const getTodayLearning = () => ({
  techJargon: getTodayItem(techJargon),
  bigO: getTodayItem(bigO),
  loop: getTodayItem(loops),
  method: getTodayItem(methods),
  vocabulary: getTodayItem(vocabulary),
  mythology: getTodayItem(mythology),
});

// Export raw data for the full /learn page
export { techJargon, bigO, loops, methods, vocabulary, mythology };

// Category metadata
export const CATEGORIES = [
  { id: "techJargon", name: "Tech", icon: "💻", data: techJargon },
  { id: "bigO", name: "Big O", icon: "📊", data: bigO },
  { id: "loop", name: "Loop", icon: "🔄", data: loops },
  { id: "method", name: "Method", icon: "⚡", data: methods },
  { id: "vocabulary", name: "Vocab", icon: "📚", data: vocabulary },
  { id: "mythology", name: "Myth", icon: "🏛️", data: mythology },
];
