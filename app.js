const deckDefinitions = {
  shapes: {
    label: 'Shapes',
    blurb: 'Geometry cards with sourced Sindhi labels.',
    items: [
      {
        id: 'shape-square',
        title: 'Square',
        english: 'Square',
        script: 'چورس',
        detail: 'Practice matching the English shape name to the Sindhi label from the official Basic Shapes lesson.',
        practice: 'Look around you and name one square object before moving to the next card.',
        color: '#7c8cff',
        shapeClass: 'shape-square',
        pills: ['Basic Shapes', 'Geometry'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes'
      },
      {
        id: 'shape-circle',
        title: 'Circle',
        english: 'Circle',
        script: 'گول',
        detail: 'Build quick recognition between round visuals and the sourced Sindhi shape label.',
        practice: 'Find something round nearby and say the English and Sindhi labels back to back.',
        color: '#2dc8ff',
        shapeClass: 'shape-circle',
        pills: ['Basic Shapes', 'Visual recognition'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes'
      },
      {
        id: 'shape-rectangle',
        title: 'Rectangle',
        english: 'Rectangle',
        script: 'مستطيل',
        detail: 'Use this card to distinguish rectangles from squares while keeping the Sindhi label in view.',
        practice: 'Compare a door, a book, and your screen. Which are closer to a rectangle?',
        color: '#ff8e63',
        shapeClass: 'shape-rectangle',
        pills: ['Basic Shapes', 'Compare forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes'
      },
      {
        id: 'shape-triangle',
        title: 'Triangle',
        english: 'Triangle',
        script: 'ٽڪنڊو',
        detail: 'This sourced Sindhi label is useful for introducing edges, points, and basic geometry vocabulary.',
        practice: 'Count the triangle corners aloud, then say the Sindhi label once more.',
        color: '#ffd34f',
        shapeClass: 'shape-triangle',
        pills: ['Basic Shapes', 'Corners'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes'
      },
      {
        id: 'shape-oval',
        title: 'Oval',
        english: 'Oval',
        script: 'بيضوي',
        detail: 'Use the oval card to notice how the lesson separates stretched curves from perfect circles.',
        practice: 'Think of an egg, mirror, or frame shape that feels oval and say the label aloud.',
        color: '#72dd9c',
        shapeClass: 'shape-oval',
        pills: ['Basic Shapes', 'Curved form'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes'
      },
      {
        id: 'shape-pentagon',
        title: 'Pentagon',
        english: 'Pentagon',
        script: 'پنج ڪنڊو',
        detail: 'This card captures the advanced shape item exposed on the public Basic Shapes page.',
        practice: 'Count five corners on the icon before you mark this card learned.',
        color: '#c082ff',
        shapeClass: 'shape-pentagon',
        pills: ['Basic Shapes', 'Five corners'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes'
      }
    ]
  },
  colors: {
    label: 'Colors',
    blurb: 'Swatch-based drills from the recovered course sequence.',
    items: [
      {
        id: 'color-red',
        title: 'Red',
        english: 'Red',
        detail: 'The original Recognize Colors lesson lists this swatch as one of the core basics sequence items.',
        practice: 'Point to a red object and say the color name before moving forward.',
        color: '#ff4d67',
        pills: ['Recognize Colors', '#FF4D67'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-green',
        title: 'Green',
        english: 'Green',
        detail: 'Use this color card for fast visual recognition and swatch recall.',
        practice: 'Name three green things around you as quickly as possible.',
        color: '#29d391',
        pills: ['Recognize Colors', '#29D391'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-blue',
        title: 'Blue',
        english: 'Blue',
        detail: 'This swatch keeps the learner moving through the same order exposed on the public course page.',
        practice: 'Hold the blue swatch in mind, then find something with a similar shade nearby.',
        color: '#3a7bff',
        pills: ['Recognize Colors', '#3A7BFF'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-yellow',
        title: 'Yellow',
        english: 'Yellow',
        detail: 'Bright contrast makes yellow ideal for quick recognition practice.',
        practice: 'Think of one fruit, one object, and one symbol that are yellow.',
        color: '#ffd84a',
        pills: ['Recognize Colors', '#FFD84A'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-orange',
        title: 'Orange',
        english: 'Orange',
        detail: 'Keep this card as a bridge between yellow and red during color sorting drills.',
        practice: 'Group orange with nearby warm colors in your head before revealing the next card.',
        color: '#ff9340',
        pills: ['Recognize Colors', '#FF9340'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-cyan',
        title: 'Cyan',
        english: 'Cyan',
        detail: 'The public lesson exposes cyan as part of the same early color ladder.',
        practice: 'Compare cyan with blue and green. Which one feels closer today?',
        color: '#18d7df',
        pills: ['Recognize Colors', '#18D7DF'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-purple',
        title: 'Purple',
        english: 'Purple',
        detail: 'Purple adds contrast variety to the legacy color sequence and works well in recognition games.',
        practice: 'Imagine a purple notebook, flower, or cloth while you study the swatch.',
        color: '#9352ff',
        pills: ['Recognize Colors', '#9352FF'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-gray',
        title: 'Gray',
        english: 'Gray',
        detail: 'Gray helps learners distinguish colorful objects from neutral ones during observation drills.',
        practice: 'Find two neutral-colored objects and compare them with this swatch.',
        color: '#8792a8',
        pills: ['Recognize Colors', '#8792A8'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-white',
        title: 'White',
        english: 'White',
        detail: 'This swatch closes out the visible color set from the public page before black continues the sequence.',
        practice: 'Look for bright or white surfaces and test how quickly you notice them.',
        color: '#f5f8ff',
        pills: ['Recognize Colors', '#F5F8FF'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      },
      {
        id: 'color-black',
        title: 'Black',
        english: 'Black',
        detail: 'Black appears as the next lesson item after white in the recovered public sequence.',
        practice: 'Use black as the final stop in a light-to-dark sorting challenge.',
        color: '#121723',
        pills: ['Recognize Colors', '#121723'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors'
      }
    ]
  },
  letters: {
    label: 'Letters',
    blurb: 'Recovered forms from the public Letters and Words page.',
    items: [
      {
        id: 'letter-meem',
        title: 'Letter م',
        english: 'Meem family',
        script: 'م',
        forms: ['مَ', 'مَنۡ', 'مَو', 'مو', 'مَي', 'مي'],
        detail: 'These forms were exposed on the public consonants page and are useful for early pattern recognition.',
        practice: 'Glance through the forms, then cover them and try to recall at least two variants.',
        pills: ['Letters & Words', '6 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      },
      {
        id: 'letter-laam',
        title: 'Letter ل',
        english: 'Laam family',
        script: 'ل',
        forms: ['لُو', 'لُ', 'لِي', 'لِ', 'لَا', 'لَ', 'لَنۡ', 'لَو', 'لو', 'لَي', 'لي'],
        detail: 'Use this recovered letter family to connect one base consonant with many reading forms.',
        practice: 'Scan the forms from right to left and see whether you can spot the repeating base shape.',
        pills: ['Letters & Words', '11 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      },
      {
        id: 'letter-nga',
        title: 'Letter ڱ',
        english: 'Nga family',
        script: 'ڱ',
        forms: ['ڱُو', 'ڱُ', 'ڱِي', 'ڱِ', 'ڱَا', 'ڱَ', 'ڱَنۡ', 'ڱَو', 'ڱو', 'ڱَي', 'ڱي'],
        detail: 'Recovered directly from the public page, this family is ideal for visual discrimination practice.',
        practice: 'Compare this base letter with the next card to notice how closely related shapes can differ.',
        pills: ['Letters & Words', '11 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      },
      {
        id: 'letter-ghe',
        title: 'Letter گھ',
        english: 'Ghe family',
        script: 'گھ',
        forms: ['گھُو', 'گھُه', 'گھِي', 'گھِه', 'گھَا', 'گھَ', 'گھَنۡ', 'گھَو', 'گھو', 'گھَي', 'گھي'],
        detail: 'This recovered cluster gives you a strong example of how one consonant expands across multiple forms.',
        practice: 'Pick your favourite form and copy its visual rhythm into your notebook.',
        pills: ['Letters & Words', '11 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      },
      {
        id: 'letter-ge',
        title: 'Letter ڳ',
        english: 'Ge family',
        script: 'ڳ',
        forms: ['ڳُو', 'ڳُ', 'ڳِي', 'ڳِ', 'ڳَا', 'ڳَ', 'ڳَنۡ', 'ڳَو', 'ڳو', 'ڳَي', 'ڳي'],
        detail: 'Use this set to strengthen recognition of similar-looking Sindhi letters and their written variants.',
        practice: 'Slow down on the dot and stroke differences before moving ahead to the next family.',
        pills: ['Letters & Words', '11 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      },
      {
        id: 'letter-gaaf',
        title: 'Letter گ',
        english: 'Gaaf family',
        script: 'گ',
        forms: ['گُو', 'گُ', 'گِي', 'گِ', 'گَا', 'گَ', 'گَنۡ', 'گَو', 'گو', 'گَي', 'گي'],
        detail: 'This card keeps the learner anchored on one consonant while changing the associated forms around it.',
        practice: 'Try to recall the base letter after reading only the variant forms.',
        pills: ['Letters & Words', '11 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      },
      {
        id: 'letter-kaaf',
        title: 'Letter ک',
        english: 'Kaaf family',
        script: 'ک',
        forms: ['کُو', 'کُ', 'کِي', 'کِ', 'کَا', 'کَ', 'کَنۡ', 'کَو', 'کو', 'کَي', 'کي'],
        detail: 'This family from the public page is useful for recognition drills and side-by-side comparison with گ.',
        practice: 'Compare this family with the previous one and name the most visible difference you notice.',
        pills: ['Letters & Words', '11 forms'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words'
      }
    ]
  },
  sentences: {
    label: 'Sentence themes',
    blurb: 'Scenario prompts recovered from the public Basic Sentences page.',
    items: [
      {
        id: 'sentence-who-are-you',
        title: 'Who are you',
        english: 'Who are you',
        script: 'تون ڪير آهين',
        detail: 'Use this scenario to practice introductions, names, and identity questions.',
        practice: 'Say the line, then answer it with your own name in English or Sindhi.',
        pills: ['Basic Sentences', 'Conversation'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      },
      {
        id: 'sentence-in-the-park',
        title: 'In the Park',
        english: 'In the Park',
        script: 'پارڪ ۾',
        detail: 'This theme works well for describing places, actions, and who is present in a scene.',
        practice: 'Imagine a park scene and say what you can see, even if only in simple English.',
        pills: ['Basic Sentences', 'Place-based'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      },
      {
        id: 'sentence-school-time',
        title: 'School Time',
        english: 'School Time',
        script: 'اسڪول ٽائيم',
        detail: 'This recovered topic is good for routines, classroom objects, and daily schedules.',
        practice: 'List three school-related words you already know or want to learn next.',
        pills: ['Basic Sentences', 'Routine'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      },
      {
        id: 'sentence-homework',
        title: 'Home-work',
        english: 'Home-work',
        script: 'هوم ورڪ',
        detail: 'Study this theme when you want to practice daily tasks and responsibility-based vocabulary.',
        practice: 'Turn this topic into a mini sentence about what you need to finish today.',
        pills: ['Basic Sentences', 'Tasks'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      },
      {
        id: 'sentence-birthday',
        title: 'Birthday',
        english: 'Birthday',
        script: 'سالگره',
        detail: 'A friendly topic for greetings, dates, celebration vocabulary, and short conversations.',
        practice: 'Try naming a birthday item or event connected to this theme.',
        pills: ['Basic Sentences', 'Celebration'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      },
      {
        id: 'sentence-funny-story',
        title: 'Funny Story',
        english: 'Funny Story',
        script: 'مزاحيه آکاڻي',
        detail: 'This topic can help you practice storytelling rhythm and simple narrative prompts.',
        practice: 'Think of a short funny moment and describe it in one line.',
        pills: ['Basic Sentences', 'Storytelling'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      },
      {
        id: 'sentence-darkness',
        title: 'Darkness',
        english: 'Darkness',
        script: 'اونداهه',
        detail: 'This scenario offers a mood-based topic for descriptive language and observation.',
        practice: 'Describe a dark room, night sky, or power outage in a simple phrase.',
        pills: ['Basic Sentences', 'Description'],
        sourceUrl: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences'
      }
    ]
  }
};

const roadmapSections = [
  {
    title: 'Alphabets',
    description: 'Move from basic symbols into forms, vowels, and words.',
    lessons: [
      { label: 'Basic Alphabets', url: 'http://learn.sindhila.edu.pk/index.php/alphabets/basic-alphabets' },
      { label: 'IPA / International Phonetic Alphabet', url: 'http://learn.sindhila.edu.pk/index.php/alphabets/ipl' },
      { label: 'Letters and Words', url: 'http://learn.sindhila.edu.pk/index.php/alphabets/letters-and-words' },
      { label: 'Vowels', url: 'http://learn.sindhila.edu.pk/index.php/alphabets/vowels' }
    ]
  },
  {
    title: 'Sentences',
    description: 'Practice simple topics, scene-based prompts, and dialogue entry points.',
    lessons: [
      { label: 'Basic Sentences', url: 'http://learn.sindhila.edu.pk/index.php/sentences/basic-sentences' },
      { label: 'Conversation', url: 'http://learn.sindhila.edu.pk/index.php/sentences/conversation' }
    ]
  },
  {
    title: 'Colors, Counting, and Shapes',
    description: 'Study visual recognition, shape naming, and number awareness in one cluster.',
    lessons: [
      { label: 'Recognize Colors', url: 'http://learn.sindhila.edu.pk/index.php/counting/recognize-colors' },
      { label: 'Colors & Counting', url: 'http://learn.sindhila.edu.pk/index.php/counting/colors-and-counting' },
      { label: 'Basic Shapes', url: 'http://learn.sindhila.edu.pk/index.php/counting/basic-shapes' },
      { label: 'Learn Counting', url: 'http://learn.sindhila.edu.pk/index.php/counting/learn-counting' }
    ]
  },
  {
    title: 'Grammar',
    description: 'Extend the basics with structure-focused lessons after you finish the visual drills.',
    lessons: [
      { label: 'Parts of Speech', url: 'http://learn.sindhila.edu.pk/index.php/grammar/parts-of-speech' },
      { label: 'Tenses', url: 'http://learn.sindhila.edu.pk/index.php/grammar/tenses' }
    ]
  },
  {
    title: 'Vocabulary',
    description: 'Expand your word bank through thematic and meaning-based practice.',
    lessons: [
      { label: 'Vocabulary', url: 'http://learn.sindhila.edu.pk/index.php/vocabulary/vocabulary' },
      { label: 'Synonyms', url: 'http://learn.sindhila.edu.pk/index.php/vocabulary/synonyms' },
      { label: 'Antonyms', url: 'http://learn.sindhila.edu.pk/index.php/vocabulary/antonyms' },
    ]
  }
];

const officialLinkGroups = [
  {
    title: 'Local source files',
    description: 'Everything needed for this rebuild lives beside the SWF in this workspace.',
    links: [
      { label: 'Original SWF file', url: 'Learn%20Sindhi%20Language%20-%20Basics.swf' },
      { label: 'Modern HTML dashboard', url: 'index.html' },
      { label: 'Application logic', url: 'app.js' },
      { label: 'Stage logic', url: 'stage.js' }
    ]
  },
  {
    title: 'Extracted audio assets',
    description: 'Embedded MP3s extracted directly from the SWF for local playback.',
    links: [
      { label: 'Audio manifest', url: 'extracted_audio/index.tsv' },
      { label: 'Alif lesson example audio', url: 'extracted_audio/sound_0241.mp3' },
      { label: 'First tile audio', url: 'extracted_audio/sound_0269.mp3' }
    ]
  },
  {
    title: 'Local app files',
    description: 'Use these local files to keep expanding the rebuild without leaving the project.',
    links: [
      { label: 'Stylesheet', url: 'styles.css' },
      { label: 'Extracted audio folder index', url: 'extracted_audio/index.tsv' },
      { label: 'Original SWF player page', url: 'index.html#legacyPlayerSection' }
    ]
  }
];

const legacyStats = [
  { value: '16,790', label: 'frames detected' },
  { value: '1,507', label: 'embedded sounds' },
  { value: '70', label: 'image tags' },
  { value: '2,146', label: 'button definitions' }
];

const storageKeys = {
  learned: 'sindhi-modern-learned',
  favorites: 'sindhi-modern-favorites',
  notes: 'sindhi-modern-notes',
  activeDeck: 'sindhi-modern-active-deck',
  quizDeck: 'sindhi-modern-quiz-deck'
};

const deckKeys = Object.keys(deckDefinitions);
const itemLookup = new Map();
const dom = {};
const state = {
  activeDeck: readValue(storageKeys.activeDeck, deckKeys[0]),
  quizDeck: readValue(storageKeys.quizDeck, deckKeys[0]),
  searchTerm: '',
  showFavoritesOnly: false,
  learned: new Set(readArray(storageKeys.learned)),
  favorites: new Set(readArray(storageKeys.favorites)),
  notes: readValue(storageKeys.notes, ''),
  focus: null,
  quizQuestion: null,
  legacyLoaded: false
};

function readArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readValue(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw;
  } catch {
    return fallback;
  }
}

function writeValue(key, value) {
  localStorage.setItem(key, value);
}

function writeArray(key, values) {
  localStorage.setItem(key, JSON.stringify(values));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugText(value) {
  return String(value ?? '').toLowerCase();
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function buildItemLookup() {
  deckKeys.forEach((deckKey) => {
    deckDefinitions[deckKey].items.forEach((item) => {
      itemLookup.set(item.id, { deckKey, item });
    });
  });
}

function getDeckItems(deckKey) {
  return deckDefinitions[deckKey]?.items ?? [];
}

function getAllItems() {
  return deckKeys.flatMap((deckKey) => getDeckItems(deckKey).map((item) => ({ deckKey, item })));
}

function getSearchHaystack(item) {
  return slugText([
    item.title,
    item.english,
    item.script,
    item.detail,
    item.practice,
    ...(item.forms || []),
    ...(item.pills || [])
  ].join(' '));
}

function getVisibleDeckItems(deckKey) {
  let items = getDeckItems(deckKey);
  if (state.showFavoritesOnly) {
    items = items.filter((item) => state.favorites.has(item.id));
  }
  if (state.searchTerm) {
    const query = slugText(state.searchTerm);
    items = items.filter((item) => getSearchHaystack(item).includes(query));
  }
  return items;
}

function countLearned(deckKey) {
  return getDeckItems(deckKey).filter((item) => state.learned.has(item.id)).length;
}

function countFavorites(deckKey) {
  return getDeckItems(deckKey).filter((item) => state.favorites.has(item.id)).length;
}

function persistSets() {
  writeArray(storageKeys.learned, [...state.learned]);
  writeArray(storageKeys.favorites, [...state.favorites]);
}

function createVisualMarkup(item, deckKey, compact = false) {
  const compactClass = compact ? ' mini-visual' : '';
  if (deckKey === 'shapes') {
    return `<div class="shape-figure ${escapeHtml(item.shapeClass)}${compactClass}" style="--visual-color:${escapeHtml(item.color)};"></div>`;
  }
  if (deckKey === 'colors') {
    return `<div class="color-chip${compactClass}" style="--chip-color:${escapeHtml(item.color)};"></div>`;
  }
  if (deckKey === 'letters') {
    return `<div class="letter-visual${compactClass}">${escapeHtml(item.script)}</div>`;
  }
  return `<div class="sentence-visual${compactClass}">${escapeHtml(item.script)}</div>`;
}

function createCardDisclosure(item, deckKey) {
  if (deckKey === 'letters') {
    return `
      <details class="card-disclosure">
        <summary>Recovered forms</summary>
        <div class="forms-grid">
          ${item.forms.map((form) => `<span class="form-chip">${escapeHtml(form)}</span>`).join('')}
        </div>
      </details>
    `;
  }
  return `
    <details class="card-disclosure">
      <summary>${deckKey === 'sentences' ? 'Conversation cue' : 'Practice idea'}</summary>
      <p class="card-detail">${escapeHtml(item.practice)}</p>
    </details>
  `;
}

function createCardMarkup(item, deckKey) {
  const isLearned = state.learned.has(item.id);
  const isFavorite = state.favorites.has(item.id);
  const showScript = deckKey === 'shapes';
  return `
    <article class="study-card ${isLearned ? 'is-learned' : ''} ${isFavorite ? 'is-favorite' : ''}">
      <div class="card-head">
        <div>
          <span class="card-label">${escapeHtml(deckDefinitions[deckKey].label)}</span>
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
        </div>
        <button class="card-icon-button ${isFavorite ? 'is-active' : ''}" type="button" data-action="toggle-favorite" data-id="${escapeHtml(item.id)}" aria-label="${isFavorite ? 'Remove favourite' : 'Save favourite'}">★</button>
      </div>
      <div class="visual-shell">
        ${createVisualMarkup(item, deckKey)}
      </div>
      ${showScript ? `<p class="card-script">${escapeHtml(item.script)}</p>` : ''}
      <p class="card-detail">${escapeHtml(item.detail)}</p>
      <div class="card-pills">
        ${(item.pills || []).map((pill) => `<span class="card-pill">${escapeHtml(pill)}</span>`).join('')}
      </div>
      ${createCardDisclosure(item, deckKey)}
      <div class="card-actions">
        <button class="button ${isLearned ? 'button-secondary' : 'button-primary'}" type="button" data-action="toggle-learned" data-id="${escapeHtml(item.id)}">${isLearned ? 'Learned' : 'Mark learned'}</button>
        <span class="button button-ghost">Local rebuild item</span>
      </div>
    </article>
  `;
}

function renderDeckTabs() {
  dom.deckTabs.innerHTML = deckKeys.map((deckKey) => {
    const deck = deckDefinitions[deckKey];
    const count = getDeckItems(deckKey).length;
    return `
      <button class="deck-tab ${state.activeDeck === deckKey ? 'is-active' : ''}" type="button" data-deck="${deckKey}">
        <strong>${escapeHtml(deck.label)}</strong>
        <span>${count} items</span>
      </button>
    `;
  }).join('');
}

function renderStudyDeck() {
  const items = getVisibleDeckItems(state.activeDeck);
  if (!items.length) {
    dom.studyDeck.innerHTML = `
      <div class="empty-state">
        <div>
          <strong>No cards match this view.</strong>
          <p>Try clearing the search term or turning off favourites-only mode.</p>
        </div>
      </div>
    `;
    return;
  }
  dom.studyDeck.innerHTML = items.map((item) => createCardMarkup(item, state.activeDeck)).join('');
}

function renderHeroMetrics() {
  const totalCards = getAllItems().length;
  const learnedCards = state.learned.size;
  const favoriteCards = state.favorites.size;
  const activeDeckCount = getVisibleDeckItems(state.activeDeck).length;
  const metrics = [
    { value: totalCards, label: 'interactive cards' },
    { value: learnedCards, label: 'cards marked learned' },
    { value: favoriteCards, label: 'saved favourites' },
    { value: activeDeckCount, label: 'cards in current view' }
  ];
  dom.heroMetrics.innerHTML = metrics.map((metric) => `
    <article class="metric-card">
      <span class="metric-value">${escapeHtml(metric.value)}</span>
      <span class="metric-label">${escapeHtml(metric.label)}</span>
    </article>
  `).join('');
}

function renderLegacyStats() {
  dom.legacyStats.innerHTML = legacyStats.map((entry) => `
    <article class="stat-pill">
      <strong>${escapeHtml(entry.value)}</strong>
      <span>${escapeHtml(entry.label)}</span>
    </article>
  `).join('');
}

function chooseFocus(deckKey = state.activeDeck) {
  const items = getDeckItems(deckKey);
  if (!items.length) {
    return;
  }
  const item = randomItem(items);
  state.focus = { deckKey, itemId: item.id };
}

function renderFocusCard() {
  if (!state.focus) {
    chooseFocus(state.activeDeck);
  }
  const resolved = state.focus ? itemLookup.get(state.focus.itemId) : null;
  if (!resolved) {
    chooseFocus(state.activeDeck);
  }
  const focusEntry = state.focus ? itemLookup.get(state.focus.itemId) : null;
  if (!focusEntry) {
    dom.focusCard.innerHTML = '<p class="focus-copy">Pick a deck to begin.</p>';
    return;
  }
  const { deckKey, item } = focusEntry;
  dom.focusCard.innerHTML = `
    <span class="focus-deck">${escapeHtml(deckDefinitions[deckKey].label)}</span>
    <div class="visual-shell">
      ${createVisualMarkup(item, deckKey)}
    </div>
    <strong class="focus-title">${escapeHtml(item.title)}</strong>
    ${item.script && deckKey !== 'shapes' ? `<div class="focus-script">${escapeHtml(item.script)}</div>` : ''}
    <p class="focus-copy">${escapeHtml(item.detail)}</p>
  `;
}

function renderProgressSummary() {
  const total = getAllItems().length;
  const learned = state.learned.size;
  const overallPercent = total ? Math.round((learned / total) * 100) : 0;
  dom.progressSummary.innerHTML = `
    <div class="summary-total">
      <strong>${learned}/${total}</strong>
      <span>cards marked learned</span>
      <span class="progress-copy">Your progress is saved locally in this browser.</span>
    </div>
    ${deckKeys.map((deckKey) => {
    const learnedCount = countLearned(deckKey);
    const totalCount = getDeckItems(deckKey).length;
    const percent = totalCount ? Math.round((learnedCount / totalCount) * 100) : 0;
    return `
        <div class="progress-row">
          <div class="progress-row-head">
            <strong>${escapeHtml(deckDefinitions[deckKey].label)}</strong>
            <span>${learnedCount}/${totalCount} · ${percent}%</span>
          </div>
          <div class="progress-track"><span style="width:${percent}%;"></span></div>
        </div>
      `;
  }).join('')}
    <div class="progress-row">
      <div class="progress-row-head">
        <strong>Saved favourites</strong>
        <span>${state.favorites.size}</span>
      </div>
      <div class="progress-track"><span style="width:${Math.min(100, state.favorites.size * 10)}%;"></span></div>
    </div>
    <div class="progress-row">
      <div class="progress-row-head">
        <strong>Overall completion</strong>
        <span>${overallPercent}%</span>
      </div>
      <div class="progress-track"><span style="width:${overallPercent}%;"></span></div>
    </div>
  `;
}

function renderRoadmap() {
  dom.roadmap.innerHTML = roadmapSections.map((section) => `
    <article class="roadmap-card">
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.description)}</p>
      <div class="lesson-list">
        ${section.lessons.map((lesson) => `
          <div class="lesson-link">
            <span>${escapeHtml(lesson.label)}</span>
            <span>Included</span>
          </div>
        `).join('')}
      </div>
    </article>
  `).join('');
}

function renderOfficialLinks() {
  dom.officialLinks.innerHTML = officialLinkGroups.map((group) => `
    <article class="link-group">
      <h3>${escapeHtml(group.title)}</h3>
      <p>${escapeHtml(group.description)}</p>
      <div class="resource-list">
        ${group.links.map((link) => `
          <a class="resource-link" href="${escapeHtml(link.url)}" ${link.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>
            <span>${escapeHtml(link.label)}</span>
            <span>Open</span>
          </a>
        `).join('')}
      </div>
    </article>
  `).join('');
}

function renderQuizDeckOptions() {
  dom.quizDeckSelect.innerHTML = deckKeys.map((deckKey) => `
    <option value="${deckKey}">${escapeHtml(deckDefinitions[deckKey].label)}</option>
  `).join('');
  if (!deckDefinitions[state.quizDeck]) {
    state.quizDeck = state.activeDeck;
  }
  dom.quizDeckSelect.value = state.quizDeck;
}

function buildOptions(correct, pool, limit = 4) {
  const uniquePool = [...new Set(pool.filter(Boolean))].filter((value) => value !== correct);
  return shuffle([correct, ...shuffle(uniquePool).slice(0, Math.max(0, limit - 1))]);
}

function createQuizQuestion(deckKey) {
  const items = getDeckItems(deckKey);
  if (items.length < 2) {
    return null;
  }
  if (deckKey === 'shapes') {
    const item = randomItem(items);
    return {
      deckKey,
      prompt: `Which Sindhi label matches ${item.english}?`,
      correct: item.script,
      options: buildOptions(item.script, items.map((entry) => entry.script)),
      visual: `<div class="visual-shell">${createVisualMarkup(item, deckKey, true)}</div>`,
      explanation: `${item.english} matches ${item.script}.`,
      formatOption: (value) => `<span class="script-inline">${escapeHtml(value)}</span>`
    };
  }
  if (deckKey === 'colors') {
    const item = randomItem(items);
    return {
      deckKey,
      prompt: 'Which color matches this swatch?',
      correct: item.english,
      options: buildOptions(item.english, items.map((entry) => entry.english)),
      visual: `<div class="visual-shell">${createVisualMarkup(item, deckKey, true)}</div>`,
      explanation: `This swatch is ${item.english}.`,
      formatOption: (value) => escapeHtml(value)
    };
  }
  if (deckKey === 'letters') {
    const item = randomItem(items);
    const form = randomItem(item.forms);
    return {
      deckKey,
      prompt: 'Which base letter matches this recovered form?',
      correct: item.script,
      options: buildOptions(item.script, items.map((entry) => entry.script)),
      visual: `<div class="visual-shell"><div class="script-option" style="font-size:3.2rem;">${escapeHtml(form)}</div></div>`,
      explanation: `${form} belongs to the ${item.script} family.`,
      formatOption: (value) => `<span class="script-inline">${escapeHtml(value)}</span>`
    };
  }
  const item = randomItem(items);
  return {
    deckKey,
    prompt: `Which English topic matches ${item.script}?`,
    correct: item.english,
    options: buildOptions(item.english, items.map((entry) => entry.english)),
    visual: `<div class="visual-shell"><div class="sentence-visual mini-visual">${escapeHtml(item.script)}</div></div>`,
    explanation: `${item.script} refers to ${item.english}.`,
    formatOption: (value) => escapeHtml(value)
  };
}

function setNewQuiz() {
  state.quizQuestion = createQuizQuestion(state.quizDeck);
}

function renderQuizCard() {
  if (!state.quizQuestion) {
    dom.quizCard.innerHTML = '<div class="empty-state"><div><strong>No quiz available yet.</strong><p>Choose another deck to continue.</p></div></div>';
    return;
  }
  const question = state.quizQuestion;
  const answered = Boolean(question.userChoice);
  const isCorrect = answered && question.userChoice === question.correct;
  dom.quizCard.innerHTML = `
    <div class="quiz-meta">
      <span>Source: ${escapeHtml(deckDefinitions[question.deckKey].label)}</span>
      <span>${question.options.length} options</span>
    </div>
    <h3 class="quiz-prompt">${escapeHtml(question.prompt)}</h3>
    <div class="quiz-visual">${question.visual}</div>
    <div class="quiz-options">
      ${question.options.map((option) => {
    const selected = answered && option === question.userChoice;
    const correct = answered && option === question.correct;
    const classes = ['quiz-option'];
    if (correct) {
      classes.push('is-correct');
    } else if (selected && !correct) {
      classes.push('is-wrong');
    }
    return `
          <button class="${classes.join(' ')}" type="button" data-option="${escapeHtml(option)}" ${answered ? 'disabled' : ''}>
            ${question.formatOption(option)}
          </button>
        `;
  }).join('')}
    </div>
    ${answered ? `<div class="quiz-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}">${isCorrect ? 'Correct.' : 'Not quite.'} ${escapeHtml(question.explanation)}</div>` : ''}
  `;
}

function toggleLearned(itemId) {
  if (state.learned.has(itemId)) {
    state.learned.delete(itemId);
  } else {
    state.learned.add(itemId);
  }
  persistSets();
}

function toggleFavorite(itemId) {
  if (state.favorites.has(itemId)) {
    state.favorites.delete(itemId);
  } else {
    state.favorites.add(itemId);
  }
  persistSets();
}

function updateFavoriteToggle() {
  dom.toggleFavoritesBtn.classList.toggle('is-active', state.showFavoritesOnly);
  dom.toggleFavoritesBtn.textContent = state.showFavoritesOnly ? 'Showing favourites' : 'Show favourites';
}

function handleDeckClick(event) {
  const button = event.target.closest('[data-deck]');
  if (!button) {
    return;
  }
  const deckKey = button.dataset.deck;
  if (!deckDefinitions[deckKey]) {
    return;
  }
  state.activeDeck = deckKey;
  state.quizDeck = deckKey;
  writeValue(storageKeys.activeDeck, deckKey);
  writeValue(storageKeys.quizDeck, deckKey);
  renderDeckTabs();
  renderHeroMetrics();
  renderStudyDeck();
  renderQuizDeckOptions();
  chooseFocus(deckKey);
  renderFocusCard();
  setNewQuiz();
  renderQuizCard();
}

function handleStudyDeckClick(event) {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) {
    return;
  }
  const action = actionButton.dataset.action;
  const itemId = actionButton.dataset.id;
  if (!itemLookup.has(itemId)) {
    return;
  }
  if (action === 'toggle-learned') {
    toggleLearned(itemId);
  }
  if (action === 'toggle-favorite') {
    toggleFavorite(itemId);
  }
  renderStudyDeck();
  renderHeroMetrics();
  renderProgressSummary();
}

function handleQuizClick(event) {
  const button = event.target.closest('[data-option]');
  if (!button || !state.quizQuestion || state.quizQuestion.userChoice) {
    return;
  }
  state.quizQuestion = {
    ...state.quizQuestion,
    userChoice: button.dataset.option
  };
  renderQuizCard();
}

async function loadLegacyPlayer() {
  if (state.legacyLoaded) {
    dom.legacyPlayerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const ruffleFactory = window.RufflePlayer?.newest?.();
  if (!ruffleFactory) {
    dom.legacyStatus.textContent = 'Ruffle could not be loaded. Check your connection or serve this folder locally and refresh the page.';
    dom.legacyPlayer.innerHTML = '<div class="legacy-placeholder">The modern dashboard still works without the legacy player. Use the download button to access the SWF directly.</div>';
    return;
  }
  dom.legacyStatus.textContent = window.location.protocol === 'file:'
    ? 'You are opening this page from the local file system. If playback fails, serve this folder from a small local web server.'
    : 'Loading the legacy SWF into Ruffle...';
  try {
    const player = ruffleFactory.createPlayer();
    player.style.width = '100%';
    player.style.height = '560px';
    dom.legacyPlayer.innerHTML = '';
    dom.legacyPlayer.appendChild(player);
    const swfUrl = new URL('Learn Sindhi Language - Basics.swf', window.location.href).toString();
    await player.load({ url: swfUrl, autoplay: 'on' });
    state.legacyLoaded = true;
    dom.legacyStatus.textContent = 'Legacy SWF loaded. Use it as a reference while you continue learning through the new interface.';
  } catch (error) {
    dom.legacyPlayer.innerHTML = '<div class="legacy-placeholder">The SWF could not be loaded in this browser context. Try running a local web server from this folder and open the page again.</div>';
    dom.legacyStatus.textContent = `Legacy load failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

function renderEverything() {
  renderDeckTabs();
  renderStudyDeck();
  renderHeroMetrics();
  renderLegacyStats();
  renderFocusCard();
  renderProgressSummary();
  renderRoadmap();
  renderOfficialLinks();
  renderQuizDeckOptions();
  if (!state.quizQuestion) {
    setNewQuiz();
  }
  renderQuizCard();
  updateFavoriteToggle();
  dom.notesInput.value = state.notes;
}

function bindDom() {
  dom.jumpToStudyBtn = document.getElementById('jumpToStudyBtn');
  dom.randomizeFocusBtn = document.getElementById('randomizeFocusBtn');
  dom.heroMetrics = document.getElementById('heroMetrics');
  dom.focusCard = document.getElementById('focusCard');
  dom.legacyStats = document.getElementById('legacyStats');
  dom.studySection = document.getElementById('studySection');
  dom.deckTabs = document.getElementById('deckTabs');
  dom.searchInput = document.getElementById('searchInput');
  dom.toggleFavoritesBtn = document.getElementById('toggleFavoritesBtn');
  dom.clearProgressBtn = document.getElementById('clearProgressBtn');
  dom.studyDeck = document.getElementById('studyDeck');
  dom.progressSummary = document.getElementById('progressSummary');
  dom.notesInput = document.getElementById('notesInput');
  dom.quizDeckSelect = document.getElementById('quizDeckSelect');
  dom.newQuizBtn = document.getElementById('newQuizBtn');
  dom.quizCard = document.getElementById('quizCard');
  dom.roadmap = document.getElementById('roadmap');
  dom.loadLegacyBtn = document.getElementById('loadLegacyBtn');
  dom.legacyStatus = document.getElementById('legacyStatus');
  dom.legacyPlayer = document.getElementById('legacyPlayer');
  dom.legacyPlayerSection = document.getElementById('legacyPlayerSection');
  dom.officialLinks = document.getElementById('officialLinks');
}

function bindEvents() {
  dom.jumpToStudyBtn.addEventListener('click', () => {
    dom.studySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  dom.randomizeFocusBtn.addEventListener('click', () => {
    chooseFocus(state.activeDeck);
    renderFocusCard();
  });

  dom.deckTabs.addEventListener('click', handleDeckClick);
  dom.studyDeck.addEventListener('click', handleStudyDeckClick);
  dom.quizCard.addEventListener('click', handleQuizClick);

  dom.searchInput.addEventListener('input', (event) => {
    state.searchTerm = event.target.value.trim();
    renderStudyDeck();
    renderHeroMetrics();
  });

  dom.toggleFavoritesBtn.addEventListener('click', () => {
    state.showFavoritesOnly = !state.showFavoritesOnly;
    updateFavoriteToggle();
    renderStudyDeck();
    renderHeroMetrics();
  });

  dom.clearProgressBtn.addEventListener('click', () => {
    const confirmed = window.confirm('Reset learned progress for all cards?');
    if (!confirmed) {
      return;
    }
    state.learned.clear();
    persistSets();
    renderStudyDeck();
    renderHeroMetrics();
    renderProgressSummary();
  });

  dom.notesInput.addEventListener('input', (event) => {
    state.notes = event.target.value;
    writeValue(storageKeys.notes, state.notes);
  });

  dom.quizDeckSelect.addEventListener('change', (event) => {
    state.quizDeck = event.target.value;
    writeValue(storageKeys.quizDeck, state.quizDeck);
    setNewQuiz();
    renderQuizCard();
  });

  dom.newQuizBtn.addEventListener('click', () => {
    setNewQuiz();
    renderQuizCard();
  });

  dom.loadLegacyBtn.addEventListener('click', () => {
    loadLegacyPlayer();
  });
}

function init() {
  buildItemLookup();
  bindDom();
  if (!deckDefinitions[state.activeDeck]) {
    state.activeDeck = deckKeys[0];
  }
  if (!deckDefinitions[state.quizDeck]) {
    state.quizDeck = state.activeDeck;
  }
  chooseFocus(state.activeDeck);
  renderEverything();
  bindEvents();
}

init();
