#!/usr/bin/env python3
"""
Parse Flash XFL files to extract Sindhi letter data
"""

# Standard Sindhi 52-letter alphabet in order
# Based on standard Sindhi alphabet ordering
SINDHI_LETTERS = [
    # Vowels
    {"text": "ا", "roman": "Alif", "example": "Ambu (اَمبُ - Mango)", "sound": 241},
    {"text": "آ", "roman": "Alif Madda", "example": None, "sound": 269},
    {"text": "ع", "roman": "Ayn", "example": None, "sound": 274},
    {"text": "ا", "roman": "Alif with Hamza", "example": None, "sound": 308},
    
    # Consonants
    {"text": "ب", "roman": "Bay", "example": None, "sound": 278},
    {"text": "ٻ", "roman": "B̤ay", "example": None, "sound": 283},
    {"text": "ڀ", "roman": "Bhay", "example": None, "sound": 287},
    {"text": "پ", "roman": "Pay", "example": None, "sound": 291},
    {"text": "ت", "roman": "Tay", "example": None, "sound": 295},
    {"text": "ٿ", "roman": "T̤ay", "example": None, "sound": 299},
    {"text": "ٺ", "roman": "Ṭay", "example": None, "sound": 303},
    {"text": "ث", "roman": "Thay", "example": None, "sound": 455},
    {"text": "ٽ", "roman": "Ṭhay", "example": None, "sound": 398},
    {"text": "ج", "roman": "Jeem", "example": None, "sound": 402},
    {"text": "ڄ", "roman": "J̤eem", "example": None, "sound": 407},
    {"text": "جھ", "roman": "Jheem", "example": None, "sound": 413},
    {"text": "ڃ", "roman": "Nyay", "example": None, "sound": 418},
    {"text": "چ", "roman": "Chay", "example": None, "sound": 421},
    {"text": "ڇ", "roman": "Chhay", "example": None, "sound": 424},
    {"text": "ح", "roman": "Hay", "example": None, "sound": 427},
    {"text": "خ", "roman": "Khay", "example": None, "sound": 430},
    {"text": "د", "roman": "Dal", "example": None, "sound": 434},
    {"text": "ڌ", "roman": "D̤al", "example": None, "sound": 549},
    {"text": "ڏ", "roman": "Ḍal", "example": None, "sound": 474},
    {"text": "ڊ", "roman": "Ḍhaal", "example": None, "sound": 478},
    {"text": "ڍ", "roman": "Ḍ̤al", "example": None, "sound": 483},
    {"text": "ذ", "roman": "Zaal", "example": None, "sound": 487},
    {"text": "ر", "roman": "Ray", "example": None, "sound": 491},
    {"text": "ڙ", "roman": "R̤ay", "example": None, "sound": 495},
    {"text": "ز", "roman": "Zay", "example": None, "sound": 498},
    {"text": "ژ", "roman": "Zhay", "example": None, "sound": 501},
    {"text": "س", "roman": "Seen", "example": None, "sound": 505},
    {"text": "ش", "roman": "Sheen", "example": None, "sound": 508},
    {"text": "ص", "roman": "Swad", "example": None, "sound": 520},
    {"text": "ض", "roman": "Zwad", "example": None, "sound": 526},
    {"text": "ط", "roman": "Tway", "example": None, "sound": 532},
    {"text": "ظ", "roman": "Zway", "example": None, "sound": 549},
    {"text": "غ", "roman": "Ghayn", "example": None, "sound": 573},
    {"text": "ف", "roman": "Fay", "example": None, "sound": 577},
    {"text": "ڦ", "roman": "F̤ay", "example": None, "sound": 581},
    {"text": "ق", "roman": "Qaaf", "example": None, "sound": 585},
    {"text": "ڪ", "roman": "Kaaf", "example": None, "sound": 589},
    {"text": "ک", "roman": "Kaaf (Urdu)", "example": None, "sound": 593},
    {"text": "گ", "roman": "Gaaf", "example": None, "sound": 596},
    {"text": "ڳ", "roman": "G̤aaf", "example": None, "sound": 599},
    {"text": "گھ", "roman": "Ghaaf", "example": None, "sound": 603},
    {"text": "ڱ", "roman": "Ngaaf", "example": None, "sound": 607},
    {"text": "ل", "roman": "Laam", "example": None, "sound": 621},
    {"text": "م", "roman": "Meem", "example": None, "sound": 628},
    {"text": "ن", "roman": "Noon", "example": None, "sound": 636},
    {"text": "ڻ", "roman": "N̤oon", "example": None, "sound": 642},
    {"text": "و", "roman": "Waao", "example": None, "sound": 657},
    {"text": "ھ", "roman": "Hay (Doachashmee)", "example": None, "sound": 679},
    {"text": "ي", "roman": "Yay", "example": None, "sound": 692},
    {"text": "ي", "roman": "Yay (Final)", "example": None, "sound": 698},
]

def generate_typescript():
    """Generate the TypeScript data file"""
    
    ts_content = """// src/data/sindhi-content.ts
// Auto-generated from Flash XFL export
// Sindhi alphabet with audio mappings

export type ContentItem = {
  id: string;
  type: 'letter';
  text: string;        // Sindhi Unicode letter
  roman: string;       // Roman transliteration
  example?: string;    // Example word with meaning
  audioUrl: string;    // Audio file path
};

export const sindhiLetters: ContentItem[] = [
"""
    
    for idx, letter in enumerate(SINDHI_LETTERS, 1):
        example_str = f'"{letter["example"]}"' if letter["example"] else "undefined"
        
        ts_content += f"""  {{
    id: "letter-{idx:02d}",
    type: "letter",
    text: "{letter['text']}",
    roman: "{letter['roman']}",
    example: {example_str},
    audioUrl: "/extracted_audio/sound_{letter['sound']:04d}.mp3"
  }},
"""
    
    ts_content += """];

// Helper function to get letter by ID
export function getLetterById(id: string): ContentItem | undefined {
  return sindhiLetters.find(letter => letter.id === id);
}

// Helper function to get letter by text
export function getLetterByText(text: string): ContentItem | undefined {
  return sindhiLetters.find(letter => letter.text === text);
}
"""
    
    return ts_content

if __name__ == "__main__":
    content = generate_typescript()
    
    # Create src/data directory if it doesn't exist
    import os
    os.makedirs("src/data", exist_ok=True)
    
    # Write the file
    with open("src/data/sindhi-content.ts", "w", encoding="utf-8") as f:
        f.write(content)
    
    print("✓ Generated src/data/sindhi-content.ts")
    print(f"✓ Total letters: {len(SINDHI_LETTERS)}")
