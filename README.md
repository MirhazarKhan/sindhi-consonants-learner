# Sindhi Consonants Learner — Interactive Language Stage 📖🎙️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![Language Preservation](https://img.shields.io/badge/Cultural%20Preservation-Sindhi%20Language-green.svg)]()
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()

> **Interactive digital language preservation & phonetics learning platform for Sindhi consonants.**  
> Built with Next.js, featuring mapped audio pronunciation tiles, high-fidelity Arabic-script typography, keyboard navigation, and interactive auditory feedback to teach native Sindhi consonant phonetics.

---

## ✨ Features

- **Phonetic Audio Mapping:** Synchronized native audio pronunciation for each Sindhi consonant and its contextual vocabulary tiles.
- **Interactive Keyboard Controls:**
  - `←` `→` : Navigate previous/next consonants
  - `↑` `↓` : Select vocabulary tiles
  - `Space` : Play full consonant lesson with audio
  - `Esc` : Stop audio playback
  - `1`–`0` : Direct jump to specific lesson tiles
- **Rich Typography & UI:** Custom styling optimized for high-legibility Nastaliq / Naskh Arabic script with smooth audio playback state indicators.
- **Audio Mapping Engine:** Built-in auditing and mapping tools (`audio-mapper.html`, `auditor.html`, `tile-editor.html`) for linguistic dataset curation.

---

## 📁 Repository Structure

```text
sindhi-consonants-learner/
├── app/
│   ├── page.tsx             # Interactive lesson stage container
│   ├── layout.tsx           # Global HTML shell & fonts
│   └── globals.css          # Core styles
├── public/
│   ├── stage-experience.css # Stage visual styles & ambient orbs
│   └── extracted_audio/     # Audio phonetic assets
├── scripts/                 # Audio extraction & parsing utilities
├── src/data/                # Phonetic dictionaries & mapping indices
├── package.json             # Project dependencies
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

---

## 🚀 Quickstart

### 1. Installation

```bash
git clone https://github.com/MirhazarKhan/sindhi-consonants-learner.git
cd sindhi-consonants-learner

# Install dependencies
npm install
```

### 2. Development

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 👨‍💻 Author

**Mirhazar Khan**  
*Senior 3D & Creative Web Engineer | AI Systems & Procedural Graphics Researcher*  
- **GitHub:** [@MirhazarKhan](https://github.com/MirhazarKhan)  
- **Website:** [mirhazarkhan.com](https://mirhazarkhan.com)
