#!/usr/bin/env python3
"""
Script to add Spanish translations to vocabulary.json
"""

import json
import time
from pathlib import Path
from deep_translator import GoogleTranslator

# Part of speech translations
POS_TRANSLATIONS = {
    "noun": "sustantivo",
    "verb": "verbo",
    "adjective": "adjetivo",
    "adverb": "adverbio",
    "pronoun": "pronombre",
    "preposition": "preposición",
    "conjunction": "conjunción",
    "interjection": "interjección",
    "article": "artículo",
    "determiner": "determinante",
    "participle": "participio",
    "phrase": "frase",
    "idiom": "modismo",
    "prefix": "prefijo",
    "suffix": "sufijo"
}

def translate_text(text, translator):
    """Translate text to Spanish with error handling."""
    if not text or text.strip() == "":
        return ""
    try:
        # Clean up text - remove incomplete sentences
        text = text.strip()
        # Add small delay to avoid rate limiting
        time.sleep(0.1)
        result = translator.translate(text)
        return result if result else text
    except Exception as e:
        print(f"Translation error for '{text[:50]}...': {e}")
        return text

def translate_part_of_speech(pos):
    """Translate part of speech using fixed dictionary."""
    pos_lower = pos.lower().strip()
    return POS_TRANSLATIONS.get(pos_lower, pos)

def process_vocabulary():
    """Main function to process vocabulary and add Spanish translations."""
    vocab_path = Path("frontend/src/data/dailyLearning/vocabulary.json")
    
    print(f"Reading vocabulary from {vocab_path}...")
    with open(vocab_path, "r", encoding="utf-8") as f:
        vocabulary = json.load(f)
    
    print(f"Found {len(vocabulary)} vocabulary entries")
    
    # Initialize translator
    translator = GoogleTranslator(source='en', target='es')
    
    translated_count = 0
    already_translated = 0
    errors = 0
    
    for i, entry in enumerate(vocabulary):
        entry_id = entry.get('id', i + 1)
        term = entry.get('term', 'unknown')
        
        # Check if already has Spanish translations
        has_pos_es = 'partOfSpeech_es' in entry
        has_def_es = 'definition_es' in entry
        
        if has_pos_es and has_def_es:
            already_translated += 1
            if (i + 1) % 100 == 0:
                print(f"Progress: {i + 1}/{len(vocabulary)} - '{term}' already translated")
            continue
        
        try:
            # Translate part of speech
            if not has_pos_es and 'partOfSpeech' in entry:
                entry['partOfSpeech_es'] = translate_part_of_speech(entry['partOfSpeech'])
            
            # Translate definition
            if not has_def_es and 'definition' in entry:
                definition = entry['definition']
                # Clean up truncated definitions
                if definition.endswith('(') or definition.endswith(' ('):
                    definition = definition.rstrip(' (')
                entry['definition_es'] = translate_text(definition, translator)
            
            # Translate etymology if present
            if 'etymology' in entry and 'etymology_es' not in entry:
                entry['etymology_es'] = translate_text(entry['etymology'], translator)
            
            translated_count += 1
            
            if (i + 1) % 50 == 0:
                print(f"Progress: {i + 1}/{len(vocabulary)} - Translated '{term}'")
                # Save intermediate progress
                with open(vocab_path, "w", encoding="utf-8") as f:
                    json.dump(vocabulary, f, ensure_ascii=False, indent=2)
                print(f"  Saved progress...")
                
        except Exception as e:
            print(f"Error processing entry {entry_id} '{term}': {e}")
            errors += 1
    
    # Final save
    print(f"\nSaving final results to {vocab_path}...")
    with open(vocab_path, "w", encoding="utf-8") as f:
        json.dump(vocabulary, f, ensure_ascii=False, indent=2)
    
    print(f"\n=== TRANSLATION COMPLETE ===")
    print(f"Total entries: {len(vocabulary)}")
    print(f"Already translated: {already_translated}")
    print(f"Newly translated: {translated_count}")
    print(f"Errors: {errors}")
    print(f"Total with Spanish: {already_translated + translated_count}")

if __name__ == "__main__":
    process_vocabulary()
