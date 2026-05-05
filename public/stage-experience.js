import { playAudio, stopAudio } from './audio-manager.js';

(async () => {
  const dom = {
    experience: document.getElementById('stageExperience'),
    topbar: document.querySelector('.stage-topbar'),
    sceneCard: document.getElementById('stageSceneCard'),
    lessonRail: document.getElementById('stageLessonRail'),
    grid: document.getElementById('stageGrid'),
    letterBtn: document.getElementById('stageLetterBtn'),
    infoBtn: document.getElementById('stageInfoBtn'),
    metaBtn: document.getElementById('stageMetaBtn'),
    wordsPanel: document.getElementById('stageWordsPanel'),
    exampleBtn: document.getElementById('stageExampleBtn'),
    tiles: document.getElementById('stageTiles'),
    tileLabel: document.getElementById('stageTileLabel'),
    tileProgress: document.getElementById('stageTileProgress'),
    bottomDock: document.getElementById('stageBottomDock'),
    firstBtn: document.getElementById('stageFirstBtn'),
    backBtn: document.getElementById('stageBackBtn'),
    autoplayInlineBtn: document.getElementById('stageAutoplayInlineBtn'),
    nextBtn: document.getElementById('stageNextBtn'),
    lastBtn: document.getElementById('stageLastBtn')
  };

  if (!dom.experience || !dom.grid || !dom.tiles) {
    return;
  }

  function createConsonantTiles(baseScript, romanBase, audioPrefix) {
    // Ascending order: RTL container places tile-01 on the right
    return [
      { script: `${baseScript}َ`, roman: `${romanBase}a`, audioKey: `${audioPrefix}-tile-01`, voiceText: `${romanBase}a` },
      { script: `${baseScript}ا`, roman: `${romanBase}aa`, audioKey: `${audioPrefix}-tile-02`, voiceText: `${romanBase}aa` },
      { script: `${baseScript}ِ`, roman: `${romanBase}i`, audioKey: `${audioPrefix}-tile-03`, voiceText: `${romanBase}i` },
      { script: `${baseScript}ِي`, roman: `${romanBase}ii`, audioKey: `${audioPrefix}-tile-04`, voiceText: `${romanBase}ii` },
      { script: `${baseScript}ُ`, roman: `${romanBase}u`, audioKey: `${audioPrefix}-tile-05`, voiceText: `${romanBase}u` },
      { script: `${baseScript}ُو`, roman: `${romanBase}oo`, audioKey: `${audioPrefix}-tile-06`, voiceText: `${romanBase}oo` },
      { script: `${baseScript}ي`, roman: `${romanBase}e`, audioKey: `${audioPrefix}-tile-07`, voiceText: `${romanBase}e` },
      { script: `${baseScript}َي`, roman: `${romanBase}ai`, audioKey: `${audioPrefix}-tile-08`, voiceText: `${romanBase}ai` },
      { script: `${baseScript}و`, roman: `${romanBase}o`, audioKey: `${audioPrefix}-tile-09`, voiceText: `${romanBase}o` },
      { script: `${baseScript}َو`, roman: `${romanBase}ao`, audioKey: `${audioPrefix}-tile-10`, voiceText: `${romanBase}ao` }
    ];
  }

  const stageLessons = [
    {
      id: 'alif',
      title: 'Basics',
      subtitle: 'Consonants',
      letter: 'ا',
      name: 'alif',
      theme: {
        accent: '#8a74ff',
        secondary: '#ffba63',
        glow: 'rgba(138, 116, 255, 0.34)',
        glowSecondary: 'rgba(255, 186, 99, 0.24)'
      },
      info: {
        header: { script: 'ا', name: 'alif' },
        lines: [
          'ا (alif) is the first letter of Sindhi alphabet.',
          'It is a base letter.',
          'All the letters of vowels are formed with the help of ا (alif).'
        ],
        audioKey: 'alif-info',
        voiceText: 'Alif is the first letter of Sindhi alphabet. It is a base letter. All the letters of vowels are formed with the help of alif.'
      },
      main: {
        audioKey: 'alif-main',
        voiceText: 'alif'
      },
      meta: {
        roman: 'alif',
        caption: 'Base letter',
        audioKey: 'alif-meta',
        voiceText: 'alif'
      },
      words: [],
      example: {
        roman: 'ambu',
        script: 'اَنبُ',
        english: 'mango',
        visual: '🥭',
        audioKey: 'alif-example',
        voiceText: 'ambu, mango'
      },
      tiles: [
        { script: 'اَ', roman: 'a', audioKey: 'alif-tile-01', voiceText: 'a' },
        { script: 'آ', roman: 'aa', audioKey: 'alif-tile-02', voiceText: 'aa' },
        { script: 'اِ', roman: 'i', audioKey: 'alif-tile-03', voiceText: 'i' },
        { script: 'اِي', roman: 'ii', audioKey: 'alif-tile-04', voiceText: 'ii' },
        { script: 'اُ', roman: 'u', audioKey: 'alif-tile-05', voiceText: 'u' },
        { script: 'اُو', roman: 'oo', audioKey: 'alif-tile-06', voiceText: 'oo' },
        { script: 'اي', roman: 'ee', audioKey: 'alif-tile-07', voiceText: 'ee' },
        { script: 'اَي', roman: 'ai', audioKey: 'alif-tile-08', voiceText: 'ai' },
        { script: 'او', roman: 'ao', audioKey: 'alif-tile-09', voiceText: 'ao' },
        { script: 'آو', roman: 'aao', audioKey: 'alif-tile-10', voiceText: 'aao' }
      ]
    },
    {
      id: 'be',
      title: 'Basics',
      subtitle: 'Consonants',
      letter: 'ب',
      name: 'be',
      theme: {
        accent: '#27b8cc',
        secondary: '#7b74ff',
        glow: 'rgba(39, 184, 204, 0.28)',
        glowSecondary: 'rgba(123, 116, 255, 0.22)'
      },
      romanBase: 'b',
      caption: 'as b in bus',
      info: {
        lines: ['as \'b\' in \'bus\''],
        audioKey: 'be-info',
        voiceText: 'as b in bus'
      },
      main: {
        audioKey: 'be-main',
        voiceText: 'be'
      },
      // remove meta panel for `be`
      meta: null,
      words: [
        { english: 'ice', roman: 'barfa', script: 'برف', audioKey: 'be-word-01', voiceText: 'ice, barfa' },
        { english: 'bus', roman: 'basi', script: 'بسي', audioKey: 'be-word-02', voiceText: 'bus, basi' }
      ],
      example: {
        roman: 'badaka',
        script: 'بدڪ',
        english: 'duck',
        visual: '🦆',
        audioKey: 'be-example',
        voiceText: 'badaka, duck'
      },
      // tiles intentionally cleared — hide sound tiles for this lesson
      tiles: []
    },
    {
      id: 'bbe',
      title: 'Basics',
      subtitle: 'Consonants',
      letter: 'ٻ',
      name: 'bbe',
      theme: {
        accent: '#2cc37f',
        secondary: '#ffc06d',
        glow: 'rgba(44, 195, 127, 0.28)',
        glowSecondary: 'rgba(255, 192, 109, 0.22)'
      },
      // remove info panel for `bbe`
      info: null,
      main: {
        audioKey: 'bbe-main',
        voiceText: 'bbe'
      },
      // remove meta panel for `bbe`
      meta: null,
      words: [
        { english: 'boat', roman: 'beri', script: 'ٻيڙي', audioKey: 'bbe-word-01', voiceText: 'boat, beri' },
        { english: 'cat', roman: 'bili', script: 'ٻلي', audioKey: 'bbe-word-02', voiceText: 'cat, bili' }
      ],
      example: {
        roman: 'bakri',
        script: 'ٻڪري',
        english: 'goat',
        visual: '🐐',
        audioKey: 'bbe-example',
        voiceText: 'bakri, goat'
      },
      // tiles intentionally cleared — hide sound tiles for this lesson
      tiles: []
    }
  ];

  const generatedLessonThemes = [
    { accent: '#ff7f50', secondary: '#7b74ff', glow: 'rgba(255, 127, 80, 0.26)', glowSecondary: 'rgba(123, 116, 255, 0.2)' },
    { accent: '#2ec4b6', secondary: '#ffd166', glow: 'rgba(46, 196, 182, 0.24)', glowSecondary: 'rgba(255, 209, 102, 0.22)' },
    { accent: '#4d96ff', secondary: '#7ee787', glow: 'rgba(77, 150, 255, 0.24)', glowSecondary: 'rgba(126, 231, 135, 0.2)' },
    { accent: '#f26ca7', secondary: '#58d3ff', glow: 'rgba(242, 108, 167, 0.24)', glowSecondary: 'rgba(88, 211, 255, 0.2)' },
    { accent: '#ffc857', secondary: '#2ab7ca', glow: 'rgba(255, 200, 87, 0.24)', glowSecondary: 'rgba(42, 183, 202, 0.2)' },
    { accent: '#9d7dff', secondary: '#6ee7b7', glow: 'rgba(157, 125, 255, 0.24)', glowSecondary: 'rgba(110, 231, 183, 0.2)' }
  ];

  const remainingConsonants = [
    { id: 'pe', letter: 'پ', name: 'pe', romanBase: 'p', caption: 'as p in pen' },
    { id: 'bhe', letter: 'ڀ', name: 'bhe', romanBase: 'bh', caption: 'Breathy b sound' },
    { id: 'te', letter: 'ت', name: 'te', romanBase: 't', caption: 'as t in tap' },
    { id: 'the', letter: 'ٿ', name: 'the', romanBase: 'th', caption: 'Aspirated t sound' },
    { id: 'tte', letter: 'ٽ', name: 'tte', romanBase: 'tt', caption: 'Retroflex t sound' },
    { id: 'tthe', letter: 'ٺ', name: 'tthe', romanBase: 'tth', caption: 'Aspirated retroflex t' },
    { id: 'se', letter: 'ث', name: 'se', romanBase: 's', caption: 'as s in sun' },
    { id: 'jeem', letter: 'ج', name: 'jeem', romanBase: 'j', caption: 'as j in jam' },
    { id: 'nye', letter: 'ڄ', name: 'nye', romanBase: 'nj', caption: 'Sindhi nye sound' },
    { id: 'jhe', letter: 'جھ', name: 'jhe', romanBase: 'jh', caption: 'as j in jug' },
    { id: 'nyay', letter: 'ڃ', name: 'nyay', romanBase: 'ny', caption: 'Nasal ny sound' },
    { id: 'che', letter: 'چ', name: 'che', romanBase: 'ch', caption: 'as ch in chair' },
    { id: 'chhe', letter: 'ڇ', name: 'chhe', romanBase: 'chh', caption: 'Aspirated ch sound' },
    { id: 'he', letter: 'ح', name: 'he', romanBase: 'h', caption: 'as h in hello' },
    { id: 'khe', letter: 'خ', name: 'khe', romanBase: 'kh', caption: 'as kh in khan' },
    { id: 'dal', letter: 'د', name: 'dal', romanBase: 'd', caption: 'as d in dog' },
    { id: 'dhal', letter: 'ڌ', name: 'dhal', romanBase: 'dh', caption: 'Aspirated d sound' },
    { id: 'ddal', letter: 'ڊ', name: 'ddal', romanBase: 'dd', caption: 'Retroflex d sound' },
    { id: 'ddha', letter: 'ڍ', name: 'ddha', romanBase: 'ddh', caption: 'Implosive retroflex d' },
    { id: 'ddhal', letter: 'ڏ', name: 'ddhal', romanBase: 'ddh', caption: 'Breathy retroflex d' },
    { id: 'zal', letter: 'ذ', name: 'zal', romanBase: 'z', caption: 'as z in zoo' },
    { id: 're', letter: 'ر', name: 're', romanBase: 'r', caption: 'as r in red' },
    { id: 'rre', letter: 'ڙ', name: 'rre', romanBase: 'rr', caption: 'Retroflex r sound' },
    { id: 'ze', letter: 'ز', name: 'ze', romanBase: 'z', caption: 'as z in zoo' },
    { id: 'seen', letter: 'س', name: 'seen', romanBase: 's', caption: 'as s in sun' },
    { id: 'sheen', letter: 'ش', name: 'sheen', romanBase: 'sh', caption: 'as sh in shop' },
    { id: 'swad', letter: 'ص', name: 'swad', romanBase: 's', caption: 'Emphatic s sound' },
    { id: 'zwad', letter: 'ض', name: 'zwad', romanBase: 'z', caption: 'Emphatic z sound' },
    { id: 'toe', letter: 'ط', name: 'toe', romanBase: 't', caption: 'Emphatic t sound' },
    { id: 'zoe', letter: 'ظ', name: 'zoe', romanBase: 'z', caption: 'Heavy z sound' },
    { id: 'ain', letter: 'ع', name: 'ain', romanBase: 'a', caption: 'Throat consonant' },
    { id: 'ghain', letter: 'غ', name: 'ghain', romanBase: 'gh', caption: 'Gh sound' },
    { id: 'fe', letter: 'ف', name: 'fe', romanBase: 'f', caption: 'as f in fun' },
    { id: 'phe', letter: 'ڦ', name: 'phe', romanBase: 'ph', caption: 'as ph in phone' },
    { id: 'qaf', letter: 'ق', name: 'qaf', romanBase: 'q', caption: 'as q in quit' },
    { id: 'kaf', letter: 'ڪ', name: 'kaf', romanBase: 'k', caption: 'as k in kite' },
    { id: 'khaf', letter: 'ک', name: 'khaf', romanBase: 'kh', caption: 'Aspirated k sound' },
    { id: 'gaf', letter: 'گ', name: 'gaf', romanBase: 'g', caption: 'as g in go' },
    { id: 'ggaf', letter: 'ڳ', name: 'ggaf', romanBase: 'gg', caption: 'Implosive g sound' },
    { id: 'ghaf', letter: 'گھ', name: 'ghaf', romanBase: 'gh', caption: 'Aspirated g sound' },
    { id: 'ngoe', letter: 'ڱ', name: 'ngoe', romanBase: 'ng', caption: 'as ng in ring' },
    { id: 'lam', letter: 'ل', name: 'lam', romanBase: 'l', caption: 'as l in lamp' },
    { id: 'meem', letter: 'م', name: 'meem', romanBase: 'm', caption: 'as m in man' },
    { id: 'noon', letter: 'ن', name: 'noon', romanBase: 'n', caption: 'as n in net' },
    { id: 'nnoon', letter: 'ڻ', name: 'nnoon', romanBase: 'nn', caption: 'Retroflex n sound' },
    { id: 'waw', letter: 'و', name: 'waw', romanBase: 'w', caption: 'as V in Van Pronounced "V"' },
    { id: 'heh', letter: 'ه', name: 'heh', romanBase: 'h', caption: 'as h in hello' },
    { id: 'hamza', letter: 'ء', name: 'hamza', romanBase: 'a', caption: 'Glottal stop marker' },
    { id: 'ye', letter: 'ي', name: 'ye', romanBase: 'y', caption: 'as y in yes' }
  ];

  const generatedLessonOverrides = {
    pe: {
      infoLines: [
        'پ (pe) is a distinct Sindhi consonant.',
        'Practice its syllables from panels, words, and tiles.'
      ],
      example: {
        roman: 'paa',
        script: 'پا',
        english: 'syllable drill',
        visual: '🅿️',
        voiceText: 'paa'
      }
    },
    nye: {
      infoLines: []
    },
    jeem: {
      example: {
        roman: 'jaa',
        script: 'جا',
        english: 'syllable drill',
        visual: '🧩',
        voiceText: 'jaa'
      }
    },
    seen: {
      example: {
        roman: 'saa',
        script: 'سا',
        english: 'syllable drill',
        visual: '☀️',
        voiceText: 'saa'
      }
    },
    meem: {
      example: {
        roman: 'maa',
        script: 'ما',
        english: 'syllable drill',
        visual: '🌙',
        voiceText: 'maa'
      }
    },
    noon: {
      example: {
        roman: 'naa',
        script: 'نا',
        english: 'syllable drill',
        visual: '🧭',
        voiceText: 'naa'
      }
    }
  };

  function buildSyllableDrills(config) {
    return [
      {
        english: 'syllable drill',
        roman: `${config.romanBase}a`,
        script: `${config.letter}َ`,
        audioKey: `${config.id}-word-01`,
        voiceText: `${config.romanBase}a`
      },
      {
        english: 'syllable drill',
        roman: `${config.romanBase}aa`,
        script: `${config.letter}ا`,
        audioKey: `${config.id}-word-02`,
        voiceText: `${config.romanBase}aa`
      }
    ];
  }

  function buildGeneratedLesson(config, index) {
    const theme = generatedLessonThemes[index % generatedLessonThemes.length];
    const override = generatedLessonOverrides[config.id] || {};
    const infoLines = override.infoLines || [
      `${config.letter} (${config.name}) is a Sindhi consonant.`,
      'Use the letter card, word drills, and sound tiles to practice pronunciation.'
    ];
    const words = override.words || buildSyllableDrills(config);
    const example = override.example || {
      roman: `${config.romanBase}u`,
      script: `${config.letter}ُ`,
      english: 'syllable drill',
      visual: '🔊',
      voiceText: `${config.romanBase}u`
    };
    const tiles = Array.isArray(override.tiles)
      ? override.tiles
      : createConsonantTiles(config.letter, config.romanBase, config.id);

    return {
      id: config.id,
      title: 'Basics',
      subtitle: 'Consonants',
      letter: config.letter,
      name: config.name,
      romanBase: config.romanBase,
      caption: config.caption,
      theme,
      info: {
        lines: infoLines,
        audioKey: `${config.id}-info`,
        voiceText: `${config.name}. ${config.caption}`
      },
      main: {
        audioKey: `${config.id}-main`,
        voiceText: config.name
      },
      meta: {
        roman: config.name,
        caption: config.caption,
        audioKey: `${config.id}-meta`,
        voiceText: `${config.name}. ${config.caption}`
      },
      words: words.map((word, wordIndex) => ({
        ...word,
        audioKey: word.audioKey || `${config.id}-word-${String(wordIndex + 1).padStart(2, '0')}`,
        voiceText: word.voiceText || word.roman
      })),
      example: {
        roman: example.roman,
        script: example.script,
        english: example.english,
        visual: example.visual || '🔊',
        audioKey: example.audioKey || `${config.id}-example`,
        voiceText: example.voiceText || example.roman || config.name
      },
      tiles
    };
  }

  // For a few consonants we don't want the meta panel; override after generation.
  stageLessons.push(...remainingConsonants.map((config, index) => buildGeneratedLesson(config, index)));
  // remove meta panel for `pe`
  const peLesson = stageLessons.find(l => l.id === 'pe');
  if (peLesson) peLesson.meta = null;

  // remove meta and info panel for `nye`
  const nyeLesson = stageLessons.find(l => l.id === 'nye');
  if (nyeLesson) {
    nyeLesson.meta = null;
    nyeLesson.info = null;
  }

  // remove meta and info panel for `jhe`
  const jheLesson = stageLessons.find(l => l.id === 'jhe');
  if (jheLesson) {
    jheLesson.meta = null;
    jheLesson.info = null;
  }

  // remove meta and info panel for `nyay`
  const nyayLesson = stageLessons.find(l => l.id === 'nyay');
  if (nyayLesson) {
    nyayLesson.meta = null;
    nyayLesson.info = null;
  }

  // remove meta and info panel for `ddhal`
  const ddhalLesson = stageLessons.find(l => l.id === 'ddhal');
  if (ddhalLesson) {
    ddhalLesson.meta = null;
    ddhalLesson.info = null;
  }

  // remove meta and info panel for `rre`
  const rreLesson = stageLessons.find(l => l.id === 'rre');
  if (rreLesson) {
    rreLesson.meta = null;
    rreLesson.info = null;
  }

  // remove meta panel for `seen`
  const seenLesson = stageLessons.find(l => l.id === 'seen');
  if (seenLesson) {
    seenLesson.meta = null;
  }

  // remove meta panel for `sheen`
  const sheenLesson = stageLessons.find(l => l.id === 'sheen');
  if (sheenLesson) {
    sheenLesson.meta = null;
  }

  // remove meta panel for `swad`
  const swadLesson = stageLessons.find(l => l.id === 'swad');
  if (swadLesson) {
    swadLesson.meta = null;
  }

  // remove meta panel for `zwad`
  const zwadLesson = stageLessons.find(l => l.id === 'zwad');
  if (zwadLesson) {
    zwadLesson.meta = null;
  }

  // remove meta panel for `toe`
  const toeLesson = stageLessons.find(l => l.id === 'toe');
  if (toeLesson) {
    toeLesson.meta = null;
  }

  // remove meta panel for `zoe`
  const zoeLesson = stageLessons.find(l => l.id === 'zoe');
  if (zoeLesson) {
    zoeLesson.meta = null;
  }

  // remove meta and info panel for `ain`
  const ainLesson = stageLessons.find(l => l.id === 'ain');
  if (ainLesson) {
    ainLesson.meta = null;
    ainLesson.info = null;
  }

  // remove meta and info panel for `ghain`
  const ghainLesson = stageLessons.find(l => l.id === 'ghain');
  if (ghainLesson) {
    ghainLesson.meta = null;
    ghainLesson.info = null;
  }

  // remove meta panel for `fe`
  const feLesson = stageLessons.find(l => l.id === 'fe');
  if (feLesson) {
    feLesson.meta = null;
  }

  // remove meta and info panel for `phe`
  const pheLesson = stageLessons.find(l => l.id === 'phe');
  if (pheLesson) {
    pheLesson.meta = null;
    pheLesson.info = null;
  }

  // remove meta panel for `qaf`
  const qafLesson = stageLessons.find(l => l.id === 'qaf');
  if (qafLesson) {
    qafLesson.meta = null;
  }

  // remove meta and info panel for `kaf`
  const kafLesson = stageLessons.find(l => l.id === 'kaf');
  if (kafLesson) {
    kafLesson.meta = null;
    kafLesson.info = null;
  }

  // remove meta panel for `khaf`
  const khafLesson = stageLessons.find(l => l.id === 'khaf');
  if (khafLesson) {
    khafLesson.meta = null;
  }

  // remove meta panel for `gaf`
  const gafLesson = stageLessons.find(l => l.id === 'gaf');
  if (gafLesson) {
    gafLesson.meta = null;
  }

  // remove meta and info panel for `ggaf`
  const ggafLesson = stageLessons.find(l => l.id === 'ggaf');
  if (ggafLesson) {
    ggafLesson.meta = null;
    ggafLesson.info = null;
  }

  // remove meta and info panel for `ghaf`
  const ghafLesson = stageLessons.find(l => l.id === 'ghaf');
  if (ghafLesson) {
    ghafLesson.meta = null;
    ghafLesson.info = null;
  }

  // remove meta and info panel for `ngoe`
  const ngoeLesson = stageLessons.find(l => l.id === 'ngoe');
  if (ngoeLesson) {
    ngoeLesson.meta = null;
    ngoeLesson.info = null;
  }

  // remove meta panel for `lam`
  const lamLesson = stageLessons.find(l => l.id === 'lam');
  if (lamLesson) {
    lamLesson.meta = null;
  }

  // remove meta panel for `meem`
  const meemLesson = stageLessons.find(l => l.id === 'meem');
  if (meemLesson) {
    meemLesson.meta = null;
  }

  // remove meta panel for `noon`
  const noonLesson = stageLessons.find(l => l.id === 'noon');
  if (noonLesson) {
    noonLesson.meta = null;
  }

  // remove meta and info panel for `nnoon`
  const nnoonLesson = stageLessons.find(l => l.id === 'nnoon');
  if (nnoonLesson) {
    nnoonLesson.meta = null;
    nnoonLesson.info = null;
  }

  // remove meta panel for `waw`
  const wawLesson = stageLessons.find(l => l.id === 'waw');
  if (wawLesson) {
    wawLesson.meta = null;
  }

  function getLessonTiles(lesson) {
    if (Array.isArray(lesson?.tiles) && lesson.tiles.length > 0) {
      return lesson.tiles;
    }
    return createConsonantTiles(
      lesson?.letter || '',
      lesson?.romanBase || lesson?.name || 'sound',
      lesson?.id || 'lesson'
    );
  }

  function collectLessonAudioKeys(lessons) {
    const keys = [];
    lessons.forEach((lesson) => {
      [lesson.info, lesson.main, lesson.meta, lesson.example].forEach((token) => {
        if (token?.audioKey) {
          keys.push(token.audioKey);
        }
      });
      lesson.words.forEach((word) => {
        if (word?.audioKey) {
          keys.push(word.audioKey);
        }
      });
      getLessonTiles(lesson).forEach((tile) => {
        if (tile?.audioKey) {
          keys.push(tile.audioKey);
        }
      });
    });
    return [...new Set(keys)];
  }

  function buildAutoExtractedAudioMap(lessons, explicitMap) {
    const allKeys = collectLessonAudioKeys(lessons);
    const autoMap = {};

    allKeys.forEach((key) => {
      const explicitUrl = explicitMap[key];
      const isValid = (
        typeof explicitUrl === 'string'
        && /extracted_audio\//.test(explicitUrl)
        && !/sound_undefined\.mp3$/i.test(explicitUrl)
      );
      if (isValid) {
        autoMap[key] = explicitUrl;
      }
      // Keys with no valid mapping are simply omitted — no audio will play
    });

    return autoMap;
  }

  // Non-tile audio (info/main/meta/word/example). Tile audio is loaded from sindhi_app_data.json.
  const baseExtractedStageAudio = {
    "alif-info": "/extracted_audio/sound_0241.mp3",
    "alif-main": "/extracted_audio/sound_0241.mp3",
    "alif-meta": "/extracted_audio/sound_0241.mp3",
    "alif-example": "/extracted_audio/sound_0241.mp3",
    "alif-tile-01": "/extracted_audio/sound_0269.mp3",
    "alif-tile-02": "/extracted_audio/sound_0274.mp3",
    "alif-tile-03": "/extracted_audio/sound_0308.mp3",
    "alif-tile-04": "/extracted_audio/sound_0278.mp3",
    "alif-tile-05": "/extracted_audio/sound_0283.mp3",
    "alif-tile-06": "/extracted_audio/sound_0287.mp3",
    "alif-tile-07": "/extracted_audio/sound_0291.mp3",
    "alif-tile-08": "/extracted_audio/sound_0295.mp3",
    "alif-tile-09": "/extracted_audio/sound_0299.mp3",
    "alif-tile-10": "/extracted_audio/sound_0303.mp3",
    "be-info": "/extracted_audio/sound_0363.mp3",
    "be-main": "/extracted_audio/sound_0363.mp3",

    "be-word-01": "/extracted_audio/sound_0377.mp3",
    "be-word-02": "/extracted_audio/sound_0384.mp3",
    "be-example": "/extracted_audio/sound_0393.mp3",

    "bbe-main": "/extracted_audio/sound_0520.mp3",

    "bbe-word-01": "/extracted_audio/sound_0526.mp3",
    "bbe-word-02": "/extracted_audio/sound_0532.mp3",
    "bbe-example": "/extracted_audio/sound_0520.mp3",
    "pe-info": "/extracted_audio/sound_0621.mp3",
    "pe-main": "/extracted_audio/sound_0621.mp3",

    "pe-word-01": "/extracted_audio/sound_0628.mp3",
    "pe-word-02": "/extracted_audio/sound_0636.mp3",
    "pe-example": "/extracted_audio/sound_0642.mp3",
    "bhe-info": "/extracted_audio/sound_0679.mp3",
    "bhe-main": "/extracted_audio/sound_0679.mp3",
    "bhe-meta": "/extracted_audio/sound_0679.mp3",
    "bhe-word-01": "/extracted_audio/sound_0692.mp3",
    "bhe-word-02": "/extracted_audio/sound_0698.mp3",
    "bhe-example": "/extracted_audio/sound_0704.mp3",
    "te-info": "/extracted_audio/sound_0816.mp3",
    "te-main": "/extracted_audio/sound_0858.mp3",
    "te-meta": "/extracted_audio/sound_0816.mp3",
    "te-word-01": "/extracted_audio/sound_0837.mp3",
    "te-word-02": "/extracted_audio/sound_0830.mp3",
    "tte-word-02": "/extracted_audio/sound_1032.mp3",
    "the-info": "/extracted_audio/sound_0915.mp3",
    "the-main": "/extracted_audio/sound_0959.mp3",
    "the-meta": "/extracted_audio/sound_0915.mp3",
    "the-word-01": "/extracted_audio/sound_0925.mp3",
    "the-word-02": "/extracted_audio/sound_0932.mp3",
    "the-example": "/extracted_audio/sound_0939.mp3",
    "the-tile-01": "/extracted_audio/sound_0880.mp3",
    "the-tile-02": "/extracted_audio/sound_0883.mp3",
    "the-tile-03": "/extracted_audio/sound_0886.mp3",
    "the-tile-04": "/extracted_audio/sound_0889.mp3",
    "the-tile-05": "/extracted_audio/sound_0893.mp3",
    "the-tile-06": "/extracted_audio/sound_0896.mp3",
    "the-tile-07": "/extracted_audio/sound_0899.mp3",
    "the-tile-08": "/extracted_audio/sound_0969.mp3",
    "the-tile-09": "/extracted_audio/sound_0905.mp3",
    "the-tile-10": "/extracted_audio/sound_0909.mp3",
    "tte-info": "/extracted_audio/sound_1026.mp3",
    "tte-main": "/extracted_audio/sound_1052.mp3",
    "tte-meta": "/extracted_audio/sound_1026.mp3",
    "tte-word-01": "/extracted_audio/sound_1022.mp3",
    "tte-example": "/extracted_audio/sound_1037.mp3",
    "tte-tile-01": "/extracted_audio/sound_1182.mp3",
    "tte-tile-02": "/extracted_audio/sound_1185.mp3",
    "tte-tile-03": "/extracted_audio/sound_1188.mp3",
    "tte-tile-04": "/extracted_audio/sound_1191.mp3",
    "tte-tile-05": "/extracted_audio/sound_1194.mp3",
    "tte-tile-06": "/extracted_audio/sound_1198.mp3",
    "tte-tile-07": "/extracted_audio/sound_1201.mp3",
    "tte-tile-08": "/extracted_audio/sound_1204.mp3",
    "tte-tile-09": "/extracted_audio/sound_1207.mp3",
    "tte-tile-10": "/extracted_audio/sound_1211.mp3",
    "tthe-info": "/extracted_audio/sound_1127.mp3",
    "tthe-main": "/extracted_audio/sound_1165.mp3",
    "tthe-meta": "/extracted_audio/sound_1127.mp3",
    "tthe-example": "/extracted_audio/sound_1142.mp3",
    "tthe-word-01": "/extracted_audio/sound_1134.mp3",
    "tthe-word-02": "/extracted_audio/sound_1150.mp3",
    "se-info": "/extracted_audio/sound_1224.mp3",
    "se-main": "/extracted_audio/sound_1260.mp3",
    "se-meta": "/extracted_audio/sound_1224.mp3",
    "se-word-01": "/extracted_audio/sound_1238.mp3",
    "se-word-02": "/extracted_audio/sound_1231.mp3",
    "se-example": "/extracted_audio/sound_1245.mp3",
    "jeem-info": "/extracted_audio/sound_1329.mp3",
    "jeem-main": "/extracted_audio/sound_1365.mp3",
    "jeem-meta": "/extracted_audio/sound_1329.mp3",
    "jeem-word-01": "/extracted_audio/sound_1336.mp3",
    "jeem-word-02": "/extracted_audio/sound_1342.mp3",
    "jeem-example": "/extracted_audio/sound_1349.mp3",
    "nye-main": "/extracted_audio/sound_1469.mp3",
    "nye-word-01": "/extracted_audio/sound_1439.mp3",
    "nye-word-02": "/extracted_audio/sound_1446.mp3",
    "nye-example": "/extracted_audio/sound_1453.mp3",
    "jhe-info": "/extracted_audio/sound_1588.mp3",
    "jhe-main": "/extracted_audio/sound_1588.mp3",
    "jhe-meta": "/extracted_audio/sound_1810.mp3",
    "jhe-example": "/extracted_audio/sound_1556.mp3",
    "nyay-info": "/extracted_audio/sound_1543.mp3",
    "nyay-main": "/extracted_audio/sound_1688.mp3",
    "nyay-meta": "/extracted_audio/sound_1543.mp3",
    "nyay-word-01": "/extracted_audio/sound_1653.mp3",
    "nyay-word-02": "/extracted_audio/sound_1663.mp3",
    "nyay-example": "/extracted_audio/sound_1669.mp3",
    "che-info": "/extracted_audio/sound_1760.mp3",
    "che-main": "/extracted_audio/sound_1784.mp3",
    "che-meta": "/extracted_audio/sound_1653.mp3",
    "che-word-01": "/extracted_audio/sound_1748.mp3",
    "che-word-02": "/extracted_audio/sound_1755.mp3",
    "che-example": "/extracted_audio/sound_1767.mp3",
    "chhe-info": "/extracted_audio/sound_1760.mp3",
    "chhe-main": "/extracted_audio/sound_1875.mp3",
    "chhe-meta": "/extracted_audio/sound_1760.mp3",
    "chhe-example": "/extracted_audio/sound_1844.mp3",
    "he-info": "/extracted_audio/sound_1933.mp3",
    "he-main": "/extracted_audio/sound_1965.mp3",
    "he-meta": "/extracted_audio/sound_1844.mp3",
    "he-word-01": "/extracted_audio/sound_1940.mp3",
    "he-example": "/extracted_audio/sound_1951.mp3",
    "khe-info": "/extracted_audio/sound_1933.mp3",
    "khe-main": "/extracted_audio/sound_2056.mp3",
    "khe-meta": "/extracted_audio/sound_1933.mp3",
    "khe-example": "/extracted_audio/sound_2041.mp3",
    "dal-info": "/extracted_audio/sound_2136.mp3",
    "dal-main": "/extracted_audio/sound_2153.mp3",
    "dal-meta": "/extracted_audio/sound_2028.mp3",
    "dal-word-01": "/extracted_audio/sound_2127.mp3",
    "dal-example": "/extracted_audio/sound_2142.mp3",
    "dhal-info": "/extracted_audio/sound_2136.mp3",
    "dhal-main": "/extracted_audio/sound_2233.mp3",
    "dhal-meta": "/extracted_audio/sound_2136.mp3",
    "dhal-example": "/extracted_audio/sound_2226.mp3",
    "dhal-tile-01": "/extracted_audio/sound_2170.mp3",
    "dhal-tile-02": "/extracted_audio/sound_2173.mp3",
    "dhal-tile-03": "/extracted_audio/sound_2176.mp3",
    "dhal-tile-04": "/extracted_audio/sound_2179.mp3",
    "dhal-tile-05": "/extracted_audio/sound_2182.mp3",
    "dhal-tile-06": "/extracted_audio/sound_2185.mp3",
    "dhal-tile-07": "/extracted_audio/sound_2188.mp3",
    "dhal-tile-08": "/extracted_audio/sound_2191.mp3",
    "dhal-tile-09": "/extracted_audio/sound_2194.mp3",
    "dhal-tile-10": "/extracted_audio/sound_2197.mp3",
    "ddal-info": "/extracted_audio/sound_2401.mp3",
    "ddal-main": "/extracted_audio/sound_2320.mp3",
    "ddal-meta": "/extracted_audio/sound_2401.mp3",
    "ddal-word-01": "/extracted_audio/sound_2390.mp3",
    "ddal-word-02": "/extracted_audio/sound_2397.mp3",
    "ddal-example": "/extracted_audio/sound_2384.mp3",
    "ddal-tile-01": "/extracted_audio/sound_2340.mp3",
    "ddal-tile-02": "/extracted_audio/sound_2343.mp3",
    "ddal-tile-03": "/extracted_audio/sound_2347.mp3",
    "ddal-tile-04": "/extracted_audio/sound_2351.mp3",
    "ddal-tile-05": "/extracted_audio/sound_2355.mp3",
    "ddal-tile-06": "/extracted_audio/sound_2358.mp3",
    "ddal-tile-07": "/extracted_audio/sound_2361.mp3",
    "ddal-tile-08": "/extracted_audio/sound_2364.mp3",
    "ddal-tile-09": "/extracted_audio/sound_2367.mp3",
    "ddal-tile-10": "/extracted_audio/sound_2370.mp3",
    "ddha-info": "/extracted_audio/sound_2401.mp3",
    "ddha-main": "/extracted_audio/sound_2424.mp3",
    "ddha-meta": "/extracted_audio/sound_2490.mp3",
    "ddha-word-01": "/extracted_audio/sound_2471.mp3",
    "ddha-word-02": "/extracted_audio/sound_2477.mp3",
    "ddha-example": "/extracted_audio/sound_2483.mp3",
    "ddha-tile-01": "/extracted_audio/sound_2424.mp3",
    "ddha-tile-02": "/extracted_audio/sound_2428.mp3",
    "ddha-tile-03": "/extracted_audio/sound_2432.mp3",
    "ddha-tile-04": "/extracted_audio/sound_2436.mp3",
    "ddha-tile-05": "/extracted_audio/sound_2441.mp3",
    "ddha-tile-06": "/extracted_audio/sound_2445.mp3",
    "ddha-tile-07": "/extracted_audio/sound_2448.mp3",
    "ddha-tile-08": "/extracted_audio/sound_2451.mp3",
    "ddha-tile-09": "/extracted_audio/sound_2454.mp3",
    "ddha-tile-10": "/extracted_audio/sound_2457.mp3",
    "ddhal-info": "/extracted_audio/sound_2575.mp3",
    "ddhal-main": "/extracted_audio/sound_2320.mp3",
    "ddhal-meta": "/extracted_audio/sound_2575.mp3",
    "ddhal-word-01": "/extracted_audio/sound_2295.mp3",
    "ddhal-word-02": "/extracted_audio/sound_2305.mp3",
    "ddhal-example": "/extracted_audio/sound_2312.mp3",
    "ddhal-tile-01": "/extracted_audio/sound_2250.mp3",
    "ddhal-tile-02": "/extracted_audio/sound_2253.mp3",
    "ddhal-tile-03": "/extracted_audio/sound_2256.mp3",
    "ddhal-tile-04": "/extracted_audio/sound_2260.mp3",
    "ddhal-tile-05": "/extracted_audio/sound_2264.mp3",
    "ddhal-tile-06": "/extracted_audio/sound_2268.mp3",
    "ddhal-tile-07": "/extracted_audio/sound_2271.mp3",
    "ddhal-tile-08": "/extracted_audio/sound_2275.mp3",
    "ddhal-tile-09": "/extracted_audio/sound_2278.mp3",
    "ddhal-tile-10": "/extracted_audio/sound_2282.mp3",
    "zal-info": "/extracted_audio/sound_2569.mp3",
    "zal-main": "/extracted_audio/sound_2575.mp3",
    "zal-meta": "/extracted_audio/sound_2660.mp3",
    "zal-word-01": "/extracted_audio/sound_2553.mp3",
    "re-info": "/extracted_audio/sound_2642.mp3",
    "re-main": "/extracted_audio/sound_2660.mp3",
    "re-meta": "/extracted_audio/sound_2748.mp3",
    "rre-info": "/extracted_audio/sound_2569.mp3",
    "rre-main": "/extracted_audio/sound_2748.mp3",
    "rre-meta": "/extracted_audio/sound_2569.mp3",
    "rre-word-01": "/extracted_audio/sound_2727.mp3",
    "rre-word-02": "/extracted_audio/sound_2733.mp3",
    "rre-example": "/extracted_audio/sound_2739.mp3",
    "ze-info": "/extracted_audio/sound_2810.mp3",
    "ze-main": "/extracted_audio/sound_2835.mp3",
    "ze-meta": "/extracted_audio/sound_2642.mp3",
    "ze-example": "/extracted_audio/sound_2829.mp3",
    "seen-info": "/extracted_audio/sound_2914.mp3",
    "seen-main": "/extracted_audio/sound_2918.mp3",
    "seen-meta": "/extracted_audio/sound_2914.mp3",
    "seen-word-01": "/extracted_audio/sound_2900.mp3",
    "seen-word-02": "/extracted_audio/sound_2904.mp3",
    "seen-example": "/extracted_audio/sound_2910.mp3",
    "sheen-info": "/extracted_audio/sound_2992.mp3",
    "sheen-main": "/extracted_audio/sound_3032.mp3",
    "sheen-meta": "/extracted_audio/sound_2992.mp3",
    "sheen-word-01": "/extracted_audio/sound_3000.mp3",
    "sheen-word-02": "/extracted_audio/sound_3007.mp3",
    "sheen-example": "/extracted_audio/sound_3013.mp3",
    "swad-info": "/extracted_audio/sound_3108.mp3",
    "swad-main": "/extracted_audio/sound_3128.mp3",
    "swad-meta": "/extracted_audio/sound_3108.mp3",
    "swad-word-01": "/extracted_audio/sound_3093.mp3",
    "swad-word-02": "/extracted_audio/sound_3099.mp3",
    "swad-example": "/extracted_audio/sound_3105.mp3",
    "zwad-info": "/extracted_audio/sound_3184.mp3",
    "zwad-main": "/extracted_audio/sound_3224.mp3",
    "zwad-meta": "/extracted_audio/sound_3184.mp3",
    "zwad-word-01": "/extracted_audio/sound_3191.mp3",
    "zwad-word-02": "/extracted_audio/sound_3197.mp3",
    "zwad-example": "/extracted_audio/sound_3203.mp3",
    "toe-info": "/extracted_audio/sound_3306.mp3",
    "toe-main": "/extracted_audio/sound_3321.mp3",
    "toe-meta": "/extracted_audio/sound_3306.mp3",
    "toe-word-01": "/extracted_audio/sound_3287.mp3",
    "toe-word-02": "/extracted_audio/sound_3294.mp3",
    "toe-example": "/extracted_audio/sound_3301.mp3",
    "zoe-info": "/extracted_audio/sound_3382.mp3",
    "zoe-main": "/extracted_audio/sound_3412.mp3",
    "zoe-meta": "/extracted_audio/sound_3382.mp3",
    "zoe-word-01": "/extracted_audio/sound_3387.mp3",
    "zoe-word-02": "/extracted_audio/sound_3393.mp3",
    "zoe-example": "/extracted_audio/sound_3399.mp3",
    "ain-info": "/extracted_audio/sound_3306.mp3",
    "ain-main": "/extracted_audio/sound_3306.mp3",
    "ain-meta": "/extracted_audio/sound_3306.mp3",
    "ain-word-01": "/extracted_audio/sound_3287.mp3",
    "ain-word-02": "/extracted_audio/sound_3294.mp3",
    "ain-info": "/extracted_audio/sound_3463.mp3",
    "ain-main": "/extracted_audio/sound_3463.mp3",
    "ain-meta": "/extracted_audio/sound_3463.mp3",
    "ain-word-01": "/extracted_audio/sound_3478.mp3",
    "ain-word-02": "/extracted_audio/sound_3486.mp3",
    "ain-example": "/extracted_audio/sound_3492.mp3",
    "ghain-info": "/extracted_audio/sound_3599.mp3",
    "ghain-main": "/extracted_audio/sound_3599.mp3",
    "ghain-meta": "/extracted_audio/sound_3599.mp3",
    "ghain-word-01": "/extracted_audio/sound_3574.mp3",
    "ghain-word-02": "/extracted_audio/sound_3579.mp3",
    "ghain-example": "/extracted_audio/sound_3585.mp3",
    "fe-info": "/extracted_audio/sound_3681.mp3",
    "fe-main": "/extracted_audio/sound_3700.mp3",
    "fe-meta": "/extracted_audio/sound_3681.mp3",
    "fe-word-01": "/extracted_audio/sound_3662.mp3",
    "fe-word-02": "/extracted_audio/sound_3670.mp3",
    "fe-example": "/extracted_audio/sound_3677.mp3",
    "phe-info": "/extracted_audio/sound_3797.mp3",
    "phe-main": "/extracted_audio/sound_3797.mp3",
    "phe-meta": "/extracted_audio/sound_3797.mp3",
    "phe-word-01": "/extracted_audio/sound_3765.mp3",
    "phe-word-02": "/extracted_audio/sound_3772.mp3",
    "phe-example": "/extracted_audio/sound_3779.mp3",
    "qaf-info": "/extracted_audio/sound_3895.mp3",
    "qaf-main": "/extracted_audio/sound_3910.mp3",
    "qaf-meta": "/extracted_audio/sound_3895.mp3",
    "qaf-word-01": "/extracted_audio/sound_3875.mp3",
    "qaf-word-02": "/extracted_audio/sound_3883.mp3",
    "qaf-example": "/extracted_audio/sound_3890.mp3",
    "kaf-info": "/extracted_audio/sound_3997.mp3",
    "kaf-main": "/extracted_audio/sound_3997.mp3",
    "kaf-meta": "/extracted_audio/sound_3997.mp3",
    "kaf-word-01": "/extracted_audio/sound_3971.mp3",
    "kaf-word-02": "/extracted_audio/sound_3977.mp3",
    "kaf-example": "/extracted_audio/sound_3983.mp3",
    "khaf-info": "/extracted_audio/sound_4075.mp3",
    "khaf-main": "/extracted_audio/sound_4089.mp3",
    "khaf-meta": "/extracted_audio/sound_4075.mp3",
    "khaf-word-01": "/extracted_audio/sound_4060.mp3",
    "khaf-word-02": "/extracted_audio/sound_4066.mp3",
    "khaf-example": "/extracted_audio/sound_4071.mp3",
    "gaf-info": "/extracted_audio/sound_4152.mp3",
    "gaf-main": "/extracted_audio/sound_4186.mp3",
    "gaf-meta": "/extracted_audio/sound_4152.mp3",
    "gaf-word-01": "/extracted_audio/sound_4158.mp3",
    "gaf-word-02": "/extracted_audio/sound_4164.mp3",
    "gaf-example": "/extracted_audio/sound_4173.mp3",
    "ggaf-info": "/extracted_audio/sound_4250.mp3",
    "ggaf-main": "/extracted_audio/sound_4278.mp3",
    "ggaf-meta": "/extracted_audio/sound_4250.mp3",
    "ggaf-word-01": "/extracted_audio/sound_4250.mp3",
    "ggaf-word-02": "/extracted_audio/sound_4256.mp3",
    "ggaf-example": "/extracted_audio/sound_4263.mp3",
    "ghaf-info": "/extracted_audio/sound_4348.mp3",
    "ghaf-main": "/extracted_audio/sound_4395.mp3",
    "ghaf-meta": "/extracted_audio/sound_4348.mp3",
    "ghaf-word-01": "/extracted_audio/sound_4348.mp3",
    "ghaf-word-02": "/extracted_audio/sound_4355.mp3",
    "ghaf-example": "/extracted_audio/sound_4361.mp3",
    "ngoe-info": "/extracted_audio/sound_4461.mp3",
    "ngoe-main": "/extracted_audio/sound_4492.mp3",
    "ngoe-meta": "/extracted_audio/sound_4461.mp3",
    "ngoe-word-01": "/extracted_audio/sound_4461.mp3",
    "ngoe-word-02": "/extracted_audio/sound_4467.mp3",
    "ngoe-example": "/extracted_audio/sound_4474.mp3",
    "lam-info": "/extracted_audio/sound_4554.mp3",
    "lam-main": "/extracted_audio/sound_4588.mp3",
    "lam-meta": "/extracted_audio/sound_4554.mp3",
    "lam-word-01": "/extracted_audio/sound_4560.mp3",
    "lam-word-02": "/extracted_audio/sound_4567.mp3",
    "lam-example": "/extracted_audio/sound_4574.mp3",
    "meem-info": "/extracted_audio/sound_4668.mp3",
    "meem-main": "/extracted_audio/sound_4683.mp3",
    "meem-meta": "/extracted_audio/sound_4668.mp3",
    "meem-word-01": "/extracted_audio/sound_4651.mp3",
    "meem-word-02": "/extracted_audio/sound_4658.mp3",
    "meem-example": "/extracted_audio/sound_4664.mp3",
    "noon-info": "/extracted_audio/sound_4742.mp3",
    "noon-main": "/extracted_audio/sound_4775.mp3",
    "noon-meta": "/extracted_audio/sound_4742.mp3",
    "noon-word-01": "/extracted_audio/sound_4749.mp3",
    "noon-word-02": "/extracted_audio/sound_4754.mp3",
    "noon-example": "/extracted_audio/sound_4761.mp3",
    "nnoon-info": "/extracted_audio/sound_4836.mp3",
    "nnoon-main": "/extracted_audio/sound_4873.mp3",
    "nnoon-meta": "/extracted_audio/sound_4836.mp3",
    "nnoon-word-01": "/extracted_audio/sound_4836.mp3",
    "nnoon-word-02": "/extracted_audio/sound_4841.mp3",
    "nnoon-example": "/extracted_audio/sound_4848.mp3",
    "waw-info": "/extracted_audio/sound_4934.mp3",
    "waw-main": "/extracted_audio/sound_4969.mp3",
    "waw-meta": "/extracted_audio/sound_4934.mp3",
    "waw-word-01": "/extracted_audio/sound_4941.mp3",
    "waw-word-02": "/extracted_audio/sound_4947.mp3",
    "waw-example": "/extracted_audio/sound_4953.mp3",
    "heh-info": "/extracted_audio/sound_5699.mp3",
    "heh-main": "/extracted_audio/sound_5699.mp3",
    "heh-meta": "/extracted_audio/sound_5664.mp3",
    "heh-word-01": "/extracted_audio/sound_5020.mp3",
    "heh-word-02": "/extracted_audio/sound_5027.mp3",
    "heh-example": "/extracted_audio/sound_5034.mp3",
    "heh-tile-01": "/extracted_audio/sound_5650.mp3",
    "heh-tile-02": "/extracted_audio/sound_5654.mp3",
    "heh-tile-03": "/extracted_audio/sound_5656.mp3",
    "heh-tile-04": "/extracted_audio/sound_5658.mp3",
    "heh-tile-05": "/extracted_audio/sound_5660.mp3",
    "heh-tile-06": "/extracted_audio/sound_5664.mp3",
    "heh-tile-07": "/extracted_audio/sound_5666.mp3",
    "heh-tile-08": "/extracted_audio/sound_5668.mp3",
    "heh-tile-09": "/extracted_audio/sound_5668.mp3",
    "heh-tile-10": "/extracted_audio/sound_5668.mp3",
    "hamza-main": "/extracted_audio/sound_5143.mp3",
    "hamza-tile-01": "/extracted_audio/h1.mp3",
    "hamza-tile-02": "/extracted_audio/h2.mp3",
    "hamza-tile-03": "/extracted_audio/h3.mp3",
    "hamza-tile-04": "/extracted_audio/h4.mp3",
    "hamza-tile-05": "/extracted_audio/h5.mp3",
    "hamza-tile-06": "/extracted_audio/h6.mp3",
    "hamza-tile-07": "/extracted_audio/h7.mp3",
    "hamza-tile-08": "/extracted_audio/h8.mp3",
    "hamza-tile-09": "/extracted_audio/h9.mp3",
    "hamza-tile-10": "/extracted_audio/h10.mp3",
    "hamza-meta": "/extracted_audio/sound_5037.mp3",
    "hamza-word-01": "/extracted_audio/sound_5034.mp3",
    "hamza-word-02": "/extracted_audio/sound_5027.mp3",
    "hamza-example": "/extracted_audio/sound_5020.mp3",
    "ye-info": "/extracted_audio/sound_5236.mp3",
    "ye-main": "/extracted_audio/sound_5236.mp3",
    "ye-meta": "/extracted_audio/sound_5220.mp3",
    "ye-word-01": "/extracted_audio/sound_5202.mp3",
    "ye-word-02": "/extracted_audio/sound_5209.mp3",
    "ye-example": "/extracted_audio/sound_5215.mp3",

    "ze-word-02": "/extracted_audio/sound_2822.mp3",
    "ze-word-01": "/extracted_audio/sound_2816.mp3",
    "ze-tile-10": "/extracted_audio/sound_2800.mp3",
    "ze-tile-09": "/extracted_audio/sound_2796.mp3",
    "ze-tile-08": "/extracted_audio/sound_2793.mp3",
    "ze-tile-07": "/extracted_audio/sound_2789.mp3",
    "ze-tile-06": "/extracted_audio/sound_2786.mp3",
    "ze-tile-05": "/extracted_audio/sound_2783.mp3",
    "ze-tile-04": "/extracted_audio/sound_2779.mp3",
    "ze-tile-03": "/extracted_audio/sound_2775.mp3",
    "ze-tile-02": "/extracted_audio/sound_2771.mp3",
    "ze-tile-01": "/extracted_audio/sound_2768.mp3",
    "rre-tile-10": "/extracted_audio/sound_2709.mp3",
    "rre-tile-09": "/extracted_audio/sound_2706.mp3",
    "rre-tile-08": "/extracted_audio/sound_2703.mp3",
    "rre-tile-07": "/extracted_audio/sound_2699.mp3",
    "rre-tile-06": "/extracted_audio/sound_2695.mp3",
    "rre-tile-05": "/extracted_audio/sound_2691.mp3",
    "rre-tile-04": "/extracted_audio/sound_2688.mp3",
    "rre-tile-03": "/extracted_audio/sound_2685.mp3",
    "rre-tile-02": "/extracted_audio/sound_2682.mp3",
    "rre-tile-01": "/extracted_audio/sound_2679.mp3",
    "re-example": "/extracted_audio/sound_2649.mp3",
    "re-word-02": "/extracted_audio/sound_2638.mp3",
    "re-word-01": "/extracted_audio/sound_2632.mp3",
    "re-tile-10": "/extracted_audio/sound_2619.mp3",
    "re-tile-09": "/extracted_audio/sound_2616.mp3",
    "re-tile-08": "/extracted_audio/sound_2613.mp3",
    "re-tile-07": "/extracted_audio/sound_2609.mp3",
    "re-tile-06": "/extracted_audio/sound_2605.mp3",
    "re-tile-05": "/extracted_audio/sound_2602.mp3",
    "re-tile-04": "/extracted_audio/sound_2599.mp3",
    "re-tile-03": "/extracted_audio/sound_2596.mp3",
    "re-tile-02": "/extracted_audio/sound_2593.mp3",
    "re-tile-01": "/extracted_audio/sound_2590.mp3",
    "zal-example": "/extracted_audio/sound_2565.mp3",
    "zal-word-02": "/extracted_audio/sound_2559.mp3",
    "zal-tile-10": "/extracted_audio/sound_2539.mp3",
    "zal-tile-09": "/extracted_audio/sound_2536.mp3",
    "zal-tile-08": "/extracted_audio/sound_2533.mp3",
    "zal-tile-07": "/extracted_audio/sound_2530.mp3",
    "zal-tile-06": "/extracted_audio/sound_2527.mp3",
    "zal-tile-05": "/extracted_audio/sound_2524.mp3",
    "zal-tile-04": "/extracted_audio/sound_2520.mp3",
    "zal-tile-03": "/extracted_audio/sound_2516.mp3",
    "zal-tile-02": "/extracted_audio/sound_2513.mp3",
    "zal-tile-01": "/extracted_audio/sound_2510.mp3",
    "dhal-word-02": "/extracted_audio/sound_2220.mp3",
    "dhal-word-01": "/extracted_audio/sound_2214.mp3",
    "dhal-tile-10": "/extracted_audio/sound_2197.mp3",
    "dhal-tile-09": "/extracted_audio/sound_2194.mp3",
    "dhal-tile-08": "/extracted_audio/sound_2191.mp3",
    "dhal-tile-07": "/extracted_audio/sound_2188.mp3",
    "dhal-tile-06": "/extracted_audio/sound_2185.mp3",
    "dhal-tile-05": "/extracted_audio/sound_2182.mp3",
    "dhal-tile-04": "/extracted_audio/sound_2179.mp3",
    "dhal-tile-03": "/extracted_audio/sound_2176.mp3",
    "dhal-tile-02": "/extracted_audio/sound_2173.mp3",
    "dhal-tile-01": "/extracted_audio/sound_2170.mp3",
    "dal-word-02": "/extracted_audio/sound_2132.mp3",
    "dal-tile-10": "/extracted_audio/sound_2111.mp3",
    "dal-tile-09": "/extracted_audio/sound_2108.mp3",
    "dal-tile-08": "/extracted_audio/sound_2105.mp3",
    "dal-tile-07": "/extracted_audio/sound_2102.mp3",
    "dal-tile-06": "/extracted_audio/sound_2099.mp3",
    "dal-tile-05": "/extracted_audio/sound_2096.mp3",
    "dal-tile-04": "/extracted_audio/sound_2093.mp3",
    "dal-tile-03": "/extracted_audio/sound_2089.mp3",
    "dal-tile-02": "/extracted_audio/sound_2085.mp3",
    "dal-tile-01": "/extracted_audio/sound_2081.mp3",
    "khe-word-02": "/extracted_audio/sound_2035.mp3",
    "khe-word-01": "/extracted_audio/sound_2028.mp3",
    "khe-tile-10": "/extracted_audio/sound_2013.mp3",
    "khe-tile-09": "/extracted_audio/sound_2009.mp3",
    "khe-tile-08": "/extracted_audio/sound_2006.mp3",
    "khe-tile-07": "/extracted_audio/sound_2003.mp3",
    "khe-tile-06": "/extracted_audio/sound_2000.mp3",
    "khe-tile-05": "/extracted_audio/sound_1996.mp3",
    "khe-tile-04": "/extracted_audio/sound_1992.mp3",
    "khe-tile-03": "/extracted_audio/sound_1988.mp3",
    "khe-tile-02": "/extracted_audio/sound_1985.mp3",
    "khe-tile-01": "/extracted_audio/sound_1982.mp3",
    "he-word-02": "/extracted_audio/sound_1945.mp3",
    "he-tile-10": "/extracted_audio/sound_1920.mp3",
    "he-tile-09": "/extracted_audio/sound_1917.mp3",
    "he-tile-08": "/extracted_audio/sound_1914.mp3",
    "he-tile-07": "/extracted_audio/sound_1911.mp3",
    "he-tile-06": "/extracted_audio/sound_1907.mp3",
    "he-tile-05": "/extracted_audio/sound_1904.mp3",
    "he-tile-04": "/extracted_audio/sound_1901.mp3",
    "he-tile-03": "/extracted_audio/sound_1898.mp3",
    "he-tile-02": "/extracted_audio/sound_1895.mp3",
    "he-tile-01": "/extracted_audio/sound_1892.mp3",
    "chhe-word-02": "/extracted_audio/sound_1857.mp3",
    "chhe-word-01": "/extracted_audio/sound_1850.mp3",
    "chhe-tile-10": "/extracted_audio/sound_1828.mp3",
    "chhe-tile-09": "/extracted_audio/sound_1825.mp3",
    "chhe-tile-08": "/extracted_audio/sound_1822.mp3",
    "chhe-tile-07": "/extracted_audio/sound_1819.mp3",
    "chhe-tile-06": "/extracted_audio/sound_1816.mp3",
    "chhe-tile-05": "/extracted_audio/sound_1813.mp3",
    "chhe-tile-04": "/extracted_audio/sound_1810.mp3",
    "chhe-tile-03": "/extracted_audio/sound_1807.mp3",
    "chhe-tile-02": "/extracted_audio/sound_1804.mp3",
    "chhe-tile-01": "/extracted_audio/sound_1801.mp3",
    "che-tile-10": "/extracted_audio/sound_1733.mp3",
    "che-tile-09": "/extracted_audio/sound_1730.mp3",
    "che-tile-08": "/extracted_audio/sound_1727.mp3",
    "che-tile-07": "/extracted_audio/sound_1724.mp3",
    "che-tile-06": "/extracted_audio/sound_1721.mp3",
    "che-tile-05": "/extracted_audio/sound_1718.mp3",
    "che-tile-04": "/extracted_audio/sound_1715.mp3",
    "che-tile-03": "/extracted_audio/sound_1712.mp3",
    "che-tile-02": "/extracted_audio/sound_1709.mp3",
    "che-tile-01": "/extracted_audio/sound_1706.mp3",
    "nyay-tile-10": "/extracted_audio/sound_1636.mp3",
    "nyay-tile-09": "/extracted_audio/sound_1632.mp3",
    "nyay-tile-08": "/extracted_audio/sound_1629.mp3",
    "nyay-tile-07": "/extracted_audio/sound_1625.mp3",
    "nyay-tile-06": "/extracted_audio/sound_1622.mp3",
    "nyay-tile-05": "/extracted_audio/sound_1619.mp3",
    "nyay-tile-04": "/extracted_audio/sound_1616.mp3",
    "nyay-tile-03": "/extracted_audio/sound_1613.mp3",
    "nyay-tile-02": "/extracted_audio/sound_1610.mp3",
    "nyay-tile-01": "/extracted_audio/sound_1607.mp3",
    "jhe-word-02": "/extracted_audio/sound_1549.mp3",
    "jhe-word-01": "/extracted_audio/sound_1543.mp3",
    "jhe-tile-10": "/extracted_audio/sound_1521.mp3",
    "jhe-tile-09": "/extracted_audio/sound_1517.mp3",
    "jhe-tile-08": "/extracted_audio/sound_1514.mp3",
    "jhe-tile-07": "/extracted_audio/sound_1511.mp3",
    "jhe-tile-06": "/extracted_audio/sound_1508.mp3",
    "jhe-tile-05": "/extracted_audio/sound_1504.mp3",
    "jhe-tile-04": "/extracted_audio/sound_1500.mp3",
    "jhe-tile-03": "/extracted_audio/sound_1497.mp3",
    "jhe-tile-02": "/extracted_audio/sound_1493.mp3",
    "jhe-tile-01": "/extracted_audio/sound_1490.mp3",
    "nye-tile-10": "/extracted_audio/sound_1422.mp3",
    "nye-tile-09": "/extracted_audio/sound_1418.mp3",
    "nye-tile-08": "/extracted_audio/sound_1414.mp3",
    "nye-tile-07": "/extracted_audio/sound_1410.mp3",
    "nye-tile-06": "/extracted_audio/sound_1406.mp3",
    "nye-tile-05": "/extracted_audio/sound_1402.mp3",
    "nye-tile-04": "/extracted_audio/sound_1398.mp3",
    "nye-tile-03": "/extracted_audio/sound_1394.mp3",
    "nye-tile-02": "/extracted_audio/sound_1390.mp3",
    "nye-tile-01": "/extracted_audio/sound_1386.mp3",
    "jeem-tile-10": "/extracted_audio/sound_1422.mp3",
    "jeem-tile-09": "/extracted_audio/sound_1418.mp3",
    "jeem-tile-08": "/extracted_audio/sound_1414.mp3",
    "jeem-tile-07": "/extracted_audio/sound_1410.mp3",
    "jeem-tile-06": "/extracted_audio/sound_1406.mp3",
    "jeem-tile-05": "/extracted_audio/sound_1402.mp3",
    "jeem-tile-04": "/extracted_audio/sound_1398.mp3",
    "jeem-tile-03": "/extracted_audio/sound_1394.mp3",
    "jeem-tile-02": "/extracted_audio/sound_1390.mp3",
    "jeem-tile-01": "/extracted_audio/sound_1386.mp3",
  };

  Object.assign(baseExtractedStageAudio, {
    "alif-example": "/extracted_audio/sound_0241.mp3",
    "alif-tile-01": "/extracted_audio/sound_0269.mp3",
    "alif-tile-02": "/extracted_audio/sound_0274.mp3",
    "alif-tile-03": "/extracted_audio/sound_0275.mp3",
    "alif-tile-04": "/extracted_audio/sound_0278.mp3",
    "alif-tile-05": "/extracted_audio/sound_0283.mp3",
    "alif-tile-06": "/extracted_audio/sound_0287.mp3",
    "alif-tile-07": "/extracted_audio/sound_0291.mp3",
    "alif-tile-08": "/extracted_audio/sound_0295.mp3",
    "alif-tile-09": "/extracted_audio/sound_0299.mp3",
    "alif-tile-10": "/extracted_audio/sound_0303.mp3",
    "alif-main": "/extracted_audio/sound_0338.mp3",
    "be-info": "/extracted_audio/sound_0363.mp3",
    "be-word-01": "/extracted_audio/sound_0377.mp3",
    "be-word-02": "/extracted_audio/sound_0384.mp3",
    "be-example": "/extracted_audio/sound_0393.mp3",
    "be-tile-01": "/extracted_audio/sound_0398.mp3",
    "be-tile-02": "/extracted_audio/sound_0402.mp3",
    "be-tile-03": "/extracted_audio/sound_0407.mp3",
    "be-tile-04": "/extracted_audio/sound_0413.mp3",
    "be-tile-05": "/extracted_audio/sound_0418.mp3",
    "be-tile-06": "/extracted_audio/sound_0421.mp3",
    "be-tile-07": "/extracted_audio/sound_0424.mp3",
    "be-tile-08": "/extracted_audio/sound_0427.mp3",
    "be-tile-09": "/extracted_audio/sound_0430.mp3",
    "be-tile-10": "/extracted_audio/sound_0434.mp3",
    "bbe-tile-01": "/extracted_audio/sound_0474.mp3",
    "bbe-tile-02": "/extracted_audio/sound_0478.mp3",
    "bbe-tile-03": "/extracted_audio/sound_0483.mp3",
    "bbe-tile-04": "/extracted_audio/sound_0487.mp3",
    "bbe-tile-05": "/extracted_audio/sound_0491.mp3",
    "bbe-tile-06": "/extracted_audio/sound_0495.mp3",
    "bbe-tile-07": "/extracted_audio/sound_0498.mp3",
    "bbe-tile-08": "/extracted_audio/sound_0501.mp3",
    "bbe-tile-09": "/extracted_audio/sound_0505.mp3",
    "bbe-tile-10": "/extracted_audio/sound_0508.mp3",
    "bbe-example": "/extracted_audio/sound_0520.mp3",
    "bbe-word-01": "/extracted_audio/sound_0526.mp3",
    "bbe-word-02": "/extracted_audio/sound_0532.mp3",
    "be-main": "/extracted_audio/sound_0455.mp3",
    "bbe-main": "/extracted_audio/sound_0549.mp3",
    "pe-tile-01": "/extracted_audio/sound_0573.mp3",
    "pe-tile-02": "/extracted_audio/sound_0577.mp3",
    "pe-tile-03": "/extracted_audio/sound_0581.mp3",
    "pe-tile-04": "/extracted_audio/sound_0585.mp3",
    "pe-tile-05": "/extracted_audio/sound_0589.mp3",
    "pe-tile-06": "/extracted_audio/sound_0593.mp3",
    "pe-tile-07": "/extracted_audio/sound_0596.mp3",
    "pe-tile-08": "/extracted_audio/sound_0599.mp3",
    "pe-tile-09": "/extracted_audio/sound_0603.mp3",
    "pe-tile-10": "/extracted_audio/sound_0607.mp3",
    "pe-info": "/extracted_audio/sound_0621.mp3",
    "pe-example": "/extracted_audio/sound_0628.mp3",
    "pe-word-01": "/extracted_audio/sound_0636.mp3",
    "pe-word-02": "/extracted_audio/sound_0642.mp3",
    "pe-main": "/extracted_audio/sound_0657.mp3",
    "bhe-info": "/extracted_audio/sound_0679.mp3",
    "bhe-example": "/extracted_audio/sound_0692.mp3",
    "bhe-word-01": "/extracted_audio/sound_0698.mp3",
    "bhe-word-02": "/extracted_audio/sound_0704.mp3",
    "bhe-main": "/extracted_audio/sound_0759.mp3",
    "bhe-tile-01": "/extracted_audio/sound_0740.mp3",
    "bhe-tile-02": "/extracted_audio/sound_0736.mp3",
    "bhe-tile-03": "/extracted_audio/sound_0732.mp3",
    "bhe-tile-04": "/extracted_audio/sound_0728.mp3",
    "bhe-tile-05": "/extracted_audio/sound_0724.mp3",
    "bhe-tile-06": "/extracted_audio/sound_0720.mp3",
    "bhe-tile-07": "/extracted_audio/sound_0717.mp3",
    "bhe-tile-08": "/extracted_audio/sound_0714.mp3",
    "bhe-tile-09": "/extracted_audio/sound_0711.mp3",
    "bhe-tile-10": "/extracted_audio/sound_0708.mp3",
    "te-tile-01": "/extracted_audio/sound_0979.mp3",
    "te-tile-02": "/extracted_audio/sound_0982.mp3",
    "te-tile-03": "/extracted_audio/sound_0985.mp3",
    "te-tile-04": "/extracted_audio/sound_0988.mp3",
    "te-word-02": "/extracted_audio/sound_0830.mp3",
    "te-word-01": "/extracted_audio/sound_0837.mp3",
    "te-tile-05": "/extracted_audio/sound_0992.mp3",
    "te-tile-06": "/extracted_audio/sound_0995.mp3",
    "te-tile-07": "/extracted_audio/sound_0999.mp3",
    "te-tile-08": "/extracted_audio/sound_1002.mp3",
    "te-tile-09": "/extracted_audio/sound_1005.mp3",
    "te-tile-10": "/extracted_audio/sound_1008.mp3",
    "te-info": "/extracted_audio/sound_0816.mp3",
    "te-example": "/extracted_audio/sound_0844.mp3",
    "te-main": "/extracted_audio/sound_0858.mp3"
  });

  const cleanedBaseExtractedStageAudio = Object.fromEntries(
    Object.entries(baseExtractedStageAudio).filter(([key]) => !key.endsWith('-meta'))
  );

  const extractedStageAudio = {
    ...cleanedBaseExtractedStageAudio,
    ...buildAutoExtractedAudioMap(stageLessons, cleanedBaseExtractedStageAudio)
  };

  function normalizeMappingLabel(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/[^a-z0-9' ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function buildLabelToAudioUrlMap(rows) {
    const labelToUrl = new Map();
    for (const row of rows) {
      if (!row || typeof row.soundFile !== 'string' || !Array.isArray(row.labels)) {
        continue;
      }

      const audioUrl = `extracted_audio/${row.soundFile}`;
      for (const rawLabel of row.labels) {
        const normalized = normalizeMappingLabel(rawLabel);
        if (normalized) {
          labelToUrl.set(normalized, audioUrl);
        }
      }
    }
    return labelToUrl;
  }

  function resolveAudioFromLabels(candidates, labelToUrl) {
    for (const candidate of candidates) {
      const normalized = normalizeMappingLabel(candidate);
      if (!normalized) {
        continue;
      }
      const url = labelToUrl.get(normalized);
      if (url) {
        return url;
      }
    }
    return '';
  }

  function buildOverridesFromCleanMapping(lessons, labelToUrl) {
    const overrides = {};

    for (const lesson of lessons) {
      const lessonId = lesson.id;
      const infoCandidates = [
        ...(lesson.info?.lines || []),
        lesson.info?.voiceText,
        lesson.main?.voiceText,
        lesson.meta?.roman,
        lesson.name
      ];

      const infoUrl = resolveAudioFromLabels(infoCandidates, labelToUrl);
      if (infoUrl) {
        overrides[`${lessonId}-info`] = infoUrl;
        overrides[`${lessonId}-main`] = infoUrl;
        overrides[`${lessonId}-meta`] = infoUrl;
      }

      for (const word of lesson.words || []) {
        const wordUrl = resolveAudioFromLabels([
          word.english,
          word.roman,
          word.voiceText
        ], labelToUrl);
        if (wordUrl) {
          overrides[word.audioKey] = wordUrl;
        }
      }

      const exampleUrl = resolveAudioFromLabels([
        lesson.example?.english,
        lesson.example?.roman,
        lesson.example?.voiceText
      ], labelToUrl);
      if (exampleUrl && lesson.example?.audioKey) {
        overrides[lesson.example.audioKey] = exampleUrl;
      }
    }

    return overrides;
  }

  async function applyCleanAudioMappingOverrides(audioMap, lessons) {
    try {
      const response = await fetch(`sindhi_app_data.json?v=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) {
        console.error(`[sindhi-audio] ❌ Failed to fetch sindhi_app_data.json (Status: ${response.status})`);
        return;
      }
      const rows = await response.json();
      if (!Array.isArray(rows)) {
        console.error('[sindhi-audio] ❌ sindhi_app_data.json is not an array');
        return;
      }

      // Parse into groups: each letter_sound (isLetterTile=true) starts a new group
      const groups = [];
      let cur = null;
      for (const row of rows) {
        if (row.type === 'letter_sound' && row.isLetterTile === true) {
          if (cur) groups.push(cur);
          cur = { intro: row, tiles: [] };
        } else if (cur) {
          cur.tiles.push(row);
        }
      }
      if (cur) groups.push(cur);

      // Map groups to lessons by index (robust as both follow standard Sindhi alphabet order)
      let appliedCount = 0;
      for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];
        const group = groups[i];

        if (!group) {
          console.warn(`[sindhi-audio] ⚠️ No sound group found for lesson index ${i} (${lesson.id})`);
          continue;
        }

        // If group has 9 tiles, prepend the intro sound as tile-01 (Legacy SWF behavior)
        let tileSounds = group.tiles;
        if (tileSounds.length === 9) {
          tileSounds = [group.intro, ...tileSounds];
        }

        const tileCount = Math.min(tileSounds.length, 10);
        if (tileCount === 0) continue;

        // RTL letters where tiles are visual RTL but audio is LTR (need to invert mapping)
        // Note: `rre` intentionally excluded to match existing mapped order.
        const shouldInvert = ['bhe', 'se', 'he', 're', 'zoe', 'ain', 'fe', 'zwad'].includes(lesson.id);

        for (let t = 0; t < tileCount; t++) {
          let uiIndex;
          if (lesson.id === 'ngoe') {
            uiIndex = ((t + 1) % tileCount) + 1;
          } else {
            uiIndex = shouldInvert ? (tileCount - t) : (t + 1);
          }
          const key = `${lesson.id}-tile-${String(uiIndex).padStart(2, '0')}`;
          // Use leading slash for Vercel root-based paths
          audioMap[key] = `/extracted_audio/${tileSounds[t].soundFile}`;
        }

        // Map the main/info/meta keys to the intro (letter_sound) row — this is the
        // pronunciation reference sound (e.g. "as 'j' in 'jug'").
        if (group.intro?.soundFile) {
          const introUrl = `/extracted_audio/${group.intro.soundFile}`;
          const isReferenceExample = [
            "sound_0363.mp3", "sound_0621.mp3", "sound_0679.mp3", "sound_0816.mp3",
            "sound_1026.mp3", "sound_1127.mp3", "sound_1224.mp3", "sound_1329.mp3",
            "sound_1760.mp3", "sound_1933.mp3", "sound_2136.mp3", "sound_2401.mp3",
            "sound_2569.mp3", "sound_2642.mp3", "sound_2810.mp3", "sound_2914.mp3",
            "sound_2992.mp3", "sound_3108.mp3", "sound_3184.mp3", "sound_3306.mp3",
            "sound_3382.mp3", "sound_3681.mp3", "sound_3895.mp3", "sound_4075.mp3",
            "sound_4152.mp3", "sound_4550.mp3", "sound_4554.mp3", "sound_4668.mp3",
            "sound_4742.mp3", "sound_4934.mp3", "sound_5037.mp3"
          ].includes(group.intro.soundFile);

          [`${lesson.id}-main`, `${lesson.id}-info`, `${lesson.id}-meta`].forEach(k => {
            if (isReferenceExample || !audioMap[k]) {
              audioMap[k] = introUrl;
            }
          });
        }

        appliedCount++;
      }

      console.log(`[sindhi-audio] ✅ Successfully mapped ${appliedCount}/${lessons.length} lessons from JSON data.`);
    } catch (e) {
      console.error('[sindhi-audio] ❌ Critical error loading audio mapping:', e);
    }
  }

  const stageAudio = Object.fromEntries(
    Object.entries({
      ...extractedStageAudio,
      ...(window.LEARN_SINDHI_STAGE_AUDIO || {})
    })
      .filter(([, url]) => typeof url === 'string' && /extracted_audio\//.test(url) && !/sound_undefined\.mp3$/i.test(url))
      .map(([key, url]) => {
        // Fix missing underscore in sound filenames from older map
        if (url.match(/\/sound(\d+)\.(mp3|wav)$/i)) {
          return [key, url.replace(/\/sound(\d+)\.(mp3|wav)$/i, '/sound_$1.$2')];
        }
        // Guarantee leading slash for Vercel
        if (url.startsWith('extracted_audio/')) {
          return [key, '/' + url];
        }
        return [key, url];
      })
  );

  await applyCleanAudioMappingOverrides(stageAudio, stageLessons);

  // Re-apply explicit overrides from baseExtractedStageAudio so our manual fixes take precedence over sindhi_app_data.json
  for (const key of Object.keys(cleanedBaseExtractedStageAudio)) {
    if (
      key.startsWith('alif-') ||
      key.startsWith('the-') ||
      key.startsWith('tte-') ||
      key.startsWith('se-') ||
      key.startsWith('he-') ||
      key.startsWith('heh-') ||
      key.startsWith('hamza-') ||
      key.startsWith('bbe-') ||
      key.startsWith('nye-') ||
      key.startsWith('dhal-tile-') ||
      key.startsWith('ddal-tile-') ||
      key.startsWith('ddha-') ||
      key.startsWith('ddhal-')
    ) {
      let url = cleanedBaseExtractedStageAudio[key];
      if (url.match(/\/sound(\d+)\.(mp3|wav)$/i)) {
        url = url.replace(/\/sound(\d+)\.(mp3|wav)$/i, '/sound_$1.$2');
      }
      if (url.startsWith('extracted_audio/')) {
        url = '/' + url;
      }
      stageAudio[key] = url;
    }
  }

  // Pin dal's ten tile sounds explicitly so they stay on the correct lesson
  // even if the generic JSON-driven mapper changes order later.
  stageAudio['dal-tile-01'] = '/extracted_audio/sound_2081.mp3';
  stageAudio['dal-tile-02'] = '/extracted_audio/sound_2085.mp3';
  stageAudio['dal-tile-03'] = '/extracted_audio/sound_2089.mp3';
  stageAudio['dal-tile-04'] = '/extracted_audio/sound_2093.mp3';
  stageAudio['dal-tile-05'] = '/extracted_audio/sound_2096.mp3';
  stageAudio['dal-tile-06'] = '/extracted_audio/sound_2099.mp3';
  stageAudio['dal-tile-07'] = '/extracted_audio/sound_2102.mp3';
  stageAudio['dal-tile-08'] = '/extracted_audio/sound_2105.mp3';
  stageAudio['dal-tile-09'] = '/extracted_audio/sound_2108.mp3';
  stageAudio['dal-tile-10'] = '/extracted_audio/sound_2111.mp3';

  // Pin rre's ten tile sounds explicitly to ensure correct ordering (inverted)
  stageAudio['rre-tile-01'] = '/extracted_audio/sound_2709.mp3';
  stageAudio['rre-tile-02'] = '/extracted_audio/sound_2706.mp3';
  stageAudio['rre-tile-03'] = '/extracted_audio/sound_2703.mp3';
  stageAudio['rre-tile-04'] = '/extracted_audio/sound_2699.mp3';
  stageAudio['rre-tile-05'] = '/extracted_audio/sound_2695.mp3';
  stageAudio['rre-tile-06'] = '/extracted_audio/sound_2691.mp3';
  stageAudio['rre-tile-07'] = '/extracted_audio/sound_2688.mp3';
  stageAudio['rre-tile-08'] = '/extracted_audio/sound_2685.mp3';
  stageAudio['rre-tile-09'] = '/extracted_audio/sound_2682.mp3';
  stageAudio['rre-tile-10'] = '/extracted_audio/sound_2679.mp3';

  // Swap tile audio between tte and se for all 10 variations.
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    const tteKey = `tte-tile-${suffix}`;
    const seKey = `se-tile-${suffix}`;
    const tteUrl = stageAudio[tteKey];
    const seUrl = stageAudio[seKey];
    if (tteUrl && seUrl) {
      stageAudio[tteKey] = seUrl;
      stageAudio[seKey] = tteUrl;
    }
  }

  // Swap tile audio between tthe and tte for all 10 variations.
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    const ttheKey = `tthe-tile-${suffix}`;
    const tteKey = `tte-tile-${suffix}`;
    const ttheUrl = stageAudio[ttheKey];
    const tteUrl = stageAudio[tteKey];
    if (ttheUrl && tteUrl) {
      stageAudio[ttheKey] = tteUrl;
      stageAudio[tteKey] = ttheUrl;
    }
  }

  // Invert tthe tile order: 01..10 should play as 10..01.
  const ttheTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    ttheTileUrls.push(stageAudio[`tthe-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`tthe-tile-${suffix}`] = ttheTileUrls[10 - i];
  }

  // Invert se tile order: 01..10 should play as 10..01.
  const seTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    seTileUrls.push(stageAudio[`se-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`se-tile-${suffix}`] = seTileUrls[10 - i];
  }

  // Shift tile audio one letter back starting at nye:
  // nye -> jeem, jhe -> nye, ... , hamza -> heh.
  // Keep manually curated families stable and do not rewrite re/rre/khe/dal/zal.
  const protectedTileIds = new Set(['dhal', 'ddha', 'ddhal', 're', 'rre', 'khe', 'dal', 'zal']);
  const backShiftIds = [
    'jeem', 'nye', 'jhe', 'nyay', 'che', 'chhe', 'he', 'khe', 'dal', 'dhal',
    'ddal', 'ddha', 'ddhal', 'zal', 're', 'rre', 'ze', 'seen', 'sheen', 'swad',
    'zwad', 'toe', 'zoe', 'ain', 'ghain', 'fe', 'phe', 'qaf', 'kaf', 'khaf',
    'gaf', 'ggaf', 'ghaf', 'ngoe', 'lam', 'meem', 'noon', 'nnoon', 'waw', 'heh',
    'hamza'
  ];
  for (let index = 1; index < backShiftIds.length; index++) {
    const sourceId = backShiftIds[index];
    const targetId = backShiftIds[index - 1];
    if (protectedTileIds.has(sourceId) || protectedTileIds.has(targetId)) {
      continue;
    }
    for (let i = 1; i <= 10; i++) {
      const suffix = String(i).padStart(2, '0');
      const sourceKey = `${sourceId}-tile-${suffix}`;
      const targetKey = `${targetId}-tile-${suffix}`;
      if (stageAudio[sourceKey]) {
        stageAudio[targetKey] = stageAudio[sourceKey];
      }
    }
  }

  // Invert he tile order: 01..10 should play as 10..01.
  const heTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    heTileUrls.push(stageAudio[`he-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`he-tile-${suffix}`] = heTileUrls[10 - i];
  }

  // Final lock: keep Jeem tile variations on sound_1278..sound_1314.
  const jeemTileSounds = [1278, 1282, 1286, 1290, 1294, 1298, 1302, 1306, 1310, 1314];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`jeem-tile-${suffix}`] = `/extracted_audio/sound_${jeemTileSounds[i - 1]}.mp3`;
  }

  // Final lock: keep Chhe tile variations on sound_1801..sound_1828.
  const chheTileSounds = [1801, 1804, 1807, 1810, 1813, 1816, 1819, 1822, 1825, 1828];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`chhe-tile-${suffix}`] = `/extracted_audio/sound_${chheTileSounds[i - 1]}.mp3`;
  }

  // Final lock: keep Hamza audio on the intended custom set.
  stageAudio['hamza-main'] = '/extracted_audio/sound_5143.mp3';
  stageAudio['hamza-meta'] = '/extracted_audio/sound_5037.mp3';
  stageAudio['hamza-word-01'] = '/extracted_audio/sound_5124.mp3';
  stageAudio['hamza-word-02'] = '/extracted_audio/sound_5130.mp3';
  stageAudio['hamza-example'] = '/extracted_audio/sound_5117.mp3';
  stageAudio['hamza-tile-01'] = '/extracted_audio/sound_5071.mp3';
  stageAudio['hamza-tile-02'] = '/extracted_audio/sound_5074.mp3';
  stageAudio['hamza-tile-03'] = '/extracted_audio/sound_5077.mp3';
  stageAudio['hamza-tile-04'] = '/extracted_audio/sound_5080.mp3';
  stageAudio['hamza-tile-05'] = '/extracted_audio/sound_5083.mp3';
  stageAudio['hamza-tile-06'] = '/extracted_audio/sound_5086.mp3';
  stageAudio['hamza-tile-07'] = '/extracted_audio/sound_5089.mp3';
  stageAudio['hamza-tile-08'] = '/extracted_audio/sound_5092.mp3';
  stageAudio['hamza-tile-09'] = '/extracted_audio/sound_5095.mp3';
  stageAudio['hamza-tile-10'] = '/extracted_audio/sound_5098.mp3';

  // Final lock: keep RRE tile variations in inverted order.
  // This must stay after backShiftIds processing, which can otherwise overwrite `rre-*`.
  stageAudio['rre-tile-01'] = '/extracted_audio/sound_2709.mp3';
  stageAudio['rre-tile-02'] = '/extracted_audio/sound_2706.mp3';
  stageAudio['rre-tile-03'] = '/extracted_audio/sound_2703.mp3';
  stageAudio['rre-tile-04'] = '/extracted_audio/sound_2699.mp3';
  stageAudio['rre-tile-05'] = '/extracted_audio/sound_2695.mp3';
  stageAudio['rre-tile-06'] = '/extracted_audio/sound_2691.mp3';
  stageAudio['rre-tile-07'] = '/extracted_audio/sound_2688.mp3';
  stageAudio['rre-tile-08'] = '/extracted_audio/sound_2685.mp3';
  stageAudio['rre-tile-09'] = '/extracted_audio/sound_2682.mp3';
  stageAudio['rre-tile-10'] = '/extracted_audio/sound_2679.mp3';

  // Final lock: keep Khe tile variations on their correct mapped audio files.
  const kheTileSounds = [1982, 1985, 1988, 1992, 1996, 2000, 2003, 2006, 2009, 2013];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`khe-tile-${suffix}`] = `/extracted_audio/sound_${kheTileSounds[i - 1]}.mp3`;
  }

  // Final lock: explicitly set ddal word and example sounds
  stageAudio['ddal-word-01'] = '/extracted_audio/sound_2390.mp3';
  stageAudio['ddal-word-02'] = '/extracted_audio/sound_2397.mp3';
  stageAudio['ddal-example'] = '/extracted_audio/sound_2384.mp3';

  // Final lock: explicitly set ddha word and example sounds
  stageAudio['ddha-word-01'] = '/extracted_audio/sound_2471.mp3';
  stageAudio['ddha-word-02'] = '/extracted_audio/sound_2477.mp3';
  stageAudio['ddha-example'] = '/extracted_audio/sound_2483.mp3';

  // Final lock: explicitly set ddhal sounds
  stageAudio['ddhal-main'] = '/extracted_audio/sound_2320.mp3';
  stageAudio['ddhal-word-01'] = '/extracted_audio/sound_2295.mp3';
  stageAudio['ddhal-word-02'] = '/extracted_audio/sound_2305.mp3';
  stageAudio['ddhal-example'] = '/extracted_audio/sound_2312.mp3';
  const ddhalTileSounds = [2250, 2253, 2256, 2260, 2264, 2268, 2271, 2275, 2278, 2282];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`ddhal-tile-${suffix}`] = `/extracted_audio/sound_${ddhalTileSounds[i - 1]}.mp3`;
  }

  // Final lock: keep Zal tile variations on their correct mapped audio files.
  const zalTileSounds = [2510, 2513, 2516, 2520, 2524, 2527, 2530, 2533, 2536, 2539];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`zal-tile-${suffix}`] = `/extracted_audio/sound_${zalTileSounds[i - 1]}.mp3`;
  }

  // Final lock: keep Re tile variations on their correct mapped audio files.
  const reTileSounds = [2619, 2616, 2613, 2609, 2605, 2602, 2599, 2596, 2593, 2590];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`re-tile-${suffix}`] = `/extracted_audio/sound_${reTileSounds[i - 1]}.mp3`;
  }

  // Final lock: keep RRE meta sounds locked.
  stageAudio['rre-meta'] = '/extracted_audio/sound_2642.mp3';

  // Final lock: explicitly set seen sounds
  stageAudio['seen-main'] = '/extracted_audio/sound_2918.mp3';
  stageAudio['seen-word-01'] = '/extracted_audio/sound_2900.mp3';
  stageAudio['seen-word-02'] = '/extracted_audio/sound_2904.mp3';
  stageAudio['seen-example'] = '/extracted_audio/sound_2910.mp3';
  stageAudio['seen-info'] = '/extracted_audio/sound_2914.mp3';
  stageAudio['seen-meta'] = '/extracted_audio/sound_2914.mp3';

  // Final lock: Invert swad tile order.
  const swadTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    swadTileUrls.push(stageAudio[`swad-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`swad-tile-${suffix}`] = swadTileUrls[10 - i];
  }

  // Final lock: explicitly set swad sounds
  stageAudio['swad-main'] = '/extracted_audio/sound_3128.mp3';
  stageAudio['swad-word-01'] = '/extracted_audio/sound_3093.mp3';
  stageAudio['swad-word-02'] = '/extracted_audio/sound_3099.mp3';
  stageAudio['swad-example'] = '/extracted_audio/sound_3105.mp3';
  stageAudio['swad-info'] = '/extracted_audio/sound_3108.mp3';
  stageAudio['swad-meta'] = '/extracted_audio/sound_3108.mp3';

  // Final lock: Invert zwad tile order.
  const zwadTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    zwadTileUrls.push(stageAudio[`zwad-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`zwad-tile-${suffix}`] = zwadTileUrls[10 - i];
  }

  // Final lock: explicitly set zwad sounds
  stageAudio['zwad-main'] = '/extracted_audio/sound_3224.mp3';
  stageAudio['zwad-word-01'] = '/extracted_audio/sound_3191.mp3';
  stageAudio['zwad-word-02'] = '/extracted_audio/sound_3197.mp3';
  stageAudio['zwad-example'] = '/extracted_audio/sound_3203.mp3';
  stageAudio['zwad-info'] = '/extracted_audio/sound_3184.mp3';
  stageAudio['zwad-meta'] = '/extracted_audio/sound_3184.mp3';

  // Final lock: Invert toe tile order.
  const toeTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    toeTileUrls.push(stageAudio[`toe-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`toe-tile-${suffix}`] = toeTileUrls[10 - i];
  }

  // Final lock: explicitly set toe sounds
  stageAudio['toe-main'] = '/extracted_audio/sound_3321.mp3';
  stageAudio['toe-word-01'] = '/extracted_audio/sound_3287.mp3';
  stageAudio['toe-word-02'] = '/extracted_audio/sound_3294.mp3';
  stageAudio['toe-example'] = '/extracted_audio/sound_3301.mp3';
  stageAudio['toe-info'] = '/extracted_audio/sound_3306.mp3';
  stageAudio['toe-meta'] = '/extracted_audio/sound_3306.mp3';

  // Final lock: explicitly set zoe sounds
  stageAudio['zoe-main'] = '/extracted_audio/sound_3412.mp3';
  stageAudio['zoe-word-01'] = '/extracted_audio/sound_3387.mp3';
  stageAudio['zoe-word-02'] = '/extracted_audio/sound_3393.mp3';
  stageAudio['zoe-example'] = '/extracted_audio/sound_3399.mp3';
  stageAudio['zoe-info'] = '/extracted_audio/sound_3382.mp3';
  stageAudio['zoe-meta'] = '/extracted_audio/sound_3382.mp3';

  // Final lock: Invert ain tile order.
  const ainTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    ainTileUrls.push(stageAudio[`ain-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`ain-tile-${suffix}`] = ainTileUrls[10 - i];
  }

  // Final lock: explicitly set ain sounds
  stageAudio['ain-main'] = '/extracted_audio/sound_3463.mp3';
  stageAudio['ain-word-01'] = '/extracted_audio/sound_3478.mp3';
  stageAudio['ain-word-02'] = '/extracted_audio/sound_3486.mp3';
  stageAudio['ain-example'] = '/extracted_audio/sound_3492.mp3';
  stageAudio['ain-info'] = '/extracted_audio/sound_3463.mp3';
  stageAudio['ain-meta'] = '/extracted_audio/sound_3463.mp3';

  // Final lock: Invert ghain tile order.
  const ghainTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    ghainTileUrls.push(stageAudio[`ghain-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`ghain-tile-${suffix}`] = ghainTileUrls[10 - i];
  }

  // Final lock: explicitly set ghain sounds
  stageAudio['ghain-main'] = '/extracted_audio/sound_3599.mp3';
  stageAudio['ghain-word-01'] = '/extracted_audio/sound_3574.mp3';
  stageAudio['ghain-word-02'] = '/extracted_audio/sound_3579.mp3';
  stageAudio['ghain-example'] = '/extracted_audio/sound_3585.mp3';

  // Final lock: Invert fe tile order.
  const feTileUrls = [];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    feTileUrls.push(stageAudio[`fe-tile-${suffix}`]);
  }
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`fe-tile-${suffix}`] = feTileUrls[10 - i];
  }

  // Final lock: explicitly set fe sounds
  stageAudio['fe-main'] = '/extracted_audio/sound_3700.mp3';
  stageAudio['fe-word-01'] = '/extracted_audio/sound_3662.mp3';
  stageAudio['fe-word-02'] = '/extracted_audio/sound_3670.mp3';
  stageAudio['fe-example'] = '/extracted_audio/sound_3677.mp3';
  stageAudio['fe-info'] = '/extracted_audio/sound_3681.mp3';
  stageAudio['fe-meta'] = '/extracted_audio/sound_3681.mp3';

  // Final lock: explicitly set phe sounds
  stageAudio['phe-main'] = '/extracted_audio/sound_3797.mp3';
  stageAudio['phe-word-01'] = '/extracted_audio/sound_3765.mp3';
  stageAudio['phe-word-02'] = '/extracted_audio/sound_3772.mp3';
  stageAudio['phe-example'] = '/extracted_audio/sound_3779.mp3';
  stageAudio['phe-info'] = '/extracted_audio/sound_3797.mp3';
  stageAudio['phe-meta'] = '/extracted_audio/sound_3797.mp3';

  // Final lock: explicitly set qaf sounds
  stageAudio['qaf-main'] = '/extracted_audio/sound_3910.mp3';
  stageAudio['qaf-word-01'] = '/extracted_audio/sound_3875.mp3';
  stageAudio['qaf-word-02'] = '/extracted_audio/sound_3883.mp3';
  stageAudio['qaf-example'] = '/extracted_audio/sound_3890.mp3';
  stageAudio['qaf-info'] = '/extracted_audio/sound_3895.mp3';
  stageAudio['qaf-meta'] = '/extracted_audio/sound_3895.mp3';

  // Final lock: explicitly set kaf sounds
  stageAudio['kaf-main'] = '/extracted_audio/sound_3997.mp3';
  stageAudio['kaf-word-01'] = '/extracted_audio/sound_3971.mp3';
  stageAudio['kaf-word-02'] = '/extracted_audio/sound_3977.mp3';
  stageAudio['kaf-example'] = '/extracted_audio/sound_3983.mp3';
  stageAudio['kaf-info'] = '/extracted_audio/sound_3997.mp3';
  stageAudio['kaf-meta'] = '/extracted_audio/sound_3997.mp3';

  // Final lock: explicitly set khaf sounds
  stageAudio['khaf-main'] = '/extracted_audio/sound_4089.mp3';
  stageAudio['khaf-word-01'] = '/extracted_audio/sound_4060.mp3';
  stageAudio['khaf-word-02'] = '/extracted_audio/sound_4066.mp3';
  stageAudio['khaf-example'] = '/extracted_audio/sound_4071.mp3';
  stageAudio['khaf-info'] = '/extracted_audio/sound_4075.mp3';
  stageAudio['khaf-meta'] = '/extracted_audio/sound_4075.mp3';

  // Final lock: explicitly set gaf sounds
  stageAudio['gaf-main'] = '/extracted_audio/sound_4186.mp3';
  stageAudio['gaf-word-01'] = '/extracted_audio/sound_4158.mp3';
  stageAudio['gaf-word-02'] = '/extracted_audio/sound_4164.mp3';
  stageAudio['gaf-example'] = '/extracted_audio/sound_4173.mp3';
  stageAudio['gaf-info'] = '/extracted_audio/sound_4152.mp3';
  stageAudio['gaf-meta'] = '/extracted_audio/sound_4152.mp3';

  // Final lock: explicitly set ggaf sounds
  stageAudio['ggaf-main'] = '/extracted_audio/sound_4278.mp3';
  stageAudio['ggaf-word-01'] = '/extracted_audio/sound_4250.mp3';
  stageAudio['ggaf-word-02'] = '/extracted_audio/sound_4256.mp3';
  stageAudio['ggaf-example'] = '/extracted_audio/sound_4263.mp3';
  stageAudio['ggaf-info'] = '/extracted_audio/sound_4250.mp3';
  stageAudio['ggaf-meta'] = '/extracted_audio/sound_4250.mp3';

  // Final lock: explicitly set ghaf sounds
  stageAudio['ghaf-main'] = '/extracted_audio/sound_4395.mp3';
  stageAudio['ghaf-word-01'] = '/extracted_audio/sound_4348.mp3';
  stageAudio['ghaf-word-02'] = '/extracted_audio/sound_4355.mp3';
  stageAudio['ghaf-example'] = '/extracted_audio/sound_4361.mp3';
  stageAudio['ghaf-info'] = '/extracted_audio/sound_4348.mp3';
  stageAudio['ghaf-meta'] = '/extracted_audio/sound_4348.mp3';

  // Final lock: explicitly set ngoe sounds
  stageAudio['ngoe-main'] = '/extracted_audio/sound_4492.mp3';
  stageAudio['ngoe-word-01'] = '/extracted_audio/sound_4461.mp3';
  stageAudio['ngoe-word-02'] = '/extracted_audio/sound_4467.mp3';
  stageAudio['ngoe-example'] = '/extracted_audio/sound_4474.mp3';
  stageAudio['ngoe-info'] = '/extracted_audio/sound_4461.mp3';
  stageAudio['ngoe-meta'] = '/extracted_audio/sound_4461.mp3';

  // Final lock: explicitly set lam sounds
  stageAudio['lam-main'] = '/extracted_audio/sound_4588.mp3';
  stageAudio['lam-word-01'] = '/extracted_audio/sound_4560.mp3';
  stageAudio['lam-word-02'] = '/extracted_audio/sound_4567.mp3';
  stageAudio['lam-example'] = '/extracted_audio/sound_4574.mp3';
  stageAudio['lam-info'] = '/extracted_audio/sound_4554.mp3';
  stageAudio['lam-meta'] = '/extracted_audio/sound_4554.mp3';

  // Final lock: explicitly set meem sounds
  stageAudio['meem-main'] = '/extracted_audio/sound_4683.mp3';
  stageAudio['meem-word-01'] = '/extracted_audio/sound_4651.mp3';
  stageAudio['meem-word-02'] = '/extracted_audio/sound_4658.mp3';
  stageAudio['meem-example'] = '/extracted_audio/sound_4664.mp3';
  stageAudio['meem-info'] = '/extracted_audio/sound_4668.mp3';
  stageAudio['meem-meta'] = '/extracted_audio/sound_4668.mp3';

  // Final lock: explicitly set noon sounds
  stageAudio['noon-main'] = '/extracted_audio/sound_4775.mp3';
  stageAudio['noon-word-01'] = '/extracted_audio/sound_4749.mp3';
  stageAudio['noon-word-02'] = '/extracted_audio/sound_4754.mp3';
  stageAudio['noon-example'] = '/extracted_audio/sound_4761.mp3';
  stageAudio['noon-info'] = '/extracted_audio/sound_4742.mp3';
  stageAudio['noon-meta'] = '/extracted_audio/sound_4742.mp3';

  // Final lock: explicitly set nnoon sounds
  stageAudio['nnoon-main'] = '/extracted_audio/sound_4873.mp3';
  stageAudio['nnoon-word-01'] = '/extracted_audio/sound_4836.mp3';
  stageAudio['nnoon-word-02'] = '/extracted_audio/sound_4841.mp3';
  stageAudio['nnoon-example'] = '/extracted_audio/sound_4848.mp3';
  stageAudio['nnoon-info'] = '/extracted_audio/sound_4836.mp3';
  stageAudio['nnoon-meta'] = '/extracted_audio/sound_4836.mp3';

  // Final lock: explicitly set waw sounds
  stageAudio['waw-main'] = '/extracted_audio/sound_4969.mp3';
  stageAudio['waw-word-01'] = '/extracted_audio/sound_4941.mp3';
  stageAudio['waw-word-02'] = '/extracted_audio/sound_4947.mp3';
  stageAudio['waw-example'] = '/extracted_audio/sound_4953.mp3';
  stageAudio['waw-info'] = '/extracted_audio/sound_4934.mp3';
  stageAudio['waw-meta'] = '/extracted_audio/sound_4934.mp3';
  const wawTileSounds = [4892, 4895, 4898, 4901, 4904, 4907, 4910, 4913, 4916, 4920];
  for (let i = 1; i <= 10; i++) {
    const suffix = String(i).padStart(2, '0');
    stageAudio[`waw-tile-${suffix}`] = `/extracted_audio/sound_${wawTileSounds[i - 1]}.mp3`;
  }

  // Final lock: explicitly set sheen sounds
  stageAudio['sheen-main'] = '/extracted_audio/sound_3032.mp3';
  stageAudio['sheen-word-01'] = '/extracted_audio/sound_3000.mp3';
  stageAudio['sheen-word-02'] = '/extracted_audio/sound_3007.mp3';
  stageAudio['sheen-example'] = '/extracted_audio/sound_3013.mp3';
  stageAudio['sheen-info'] = '/extracted_audio/sound_2992.mp3';
  stageAudio['sheen-meta'] = '/extracted_audio/sound_2992.mp3';

  // Heh should use Hamza note/info-meta, words, and example audio.
  stageAudio['heh-info'] = stageAudio['hamza-meta'];
  stageAudio['heh-meta'] = stageAudio['hamza-meta'];
  stageAudio['heh-word-01'] = '/extracted_audio/sound_5020.mp3';
  stageAudio['heh-word-02'] = '/extracted_audio/sound_5027.mp3';
  stageAudio['heh-example'] = '/extracted_audio/sound_5034.mp3';
  // Also use the main 'he' audio for heh main pronunciation.
  stageAudio['heh-main'] = stageAudio['he-main'];

  // Final lock: explicitly set ye sounds
  stageAudio['ye-main'] = '/extracted_audio/sound_5236.mp3';
  stageAudio['ye-word-01'] = '/extracted_audio/sound_5202.mp3';
  stageAudio['ye-word-02'] = '/extracted_audio/sound_5209.mp3';
  stageAudio['ye-example'] = '/extracted_audio/sound_5215.mp3';
  stageAudio['ye-meta'] = '/extracted_audio/sound_5220.mp3';
  stageAudio['ye-info'] = '/extracted_audio/sound_5236.mp3';

  // Fill known sparse keys with safe fallbacks so warnings don't block playback UX.
  const fallbackAudioKeys = {
    'tte-word-02': ['tte-word-01', 'tte-main'],
    'seen-word-02': ['seen-word-01', 'seen-main'],
    'sheen-word-01': ['sheen-main', 'sheen-info'],
    'sheen-word-02': ['sheen-word-01', 'sheen-main'],
    'ye-word-01': ['ye-main', 'ye-info'],
    'ye-word-02': ['ye-word-01', 'ye-main'],
    'ye-example': ['ye-word-01', 'ye-main']
  };

  Object.entries(fallbackAudioKeys).forEach(([missingKey, candidates]) => {
    if (stageAudio[missingKey]) {
      return;
    }
    const resolved = candidates.find((key) => Boolean(stageAudio[key]));
    if (resolved) {
      stageAudio[missingKey] = stageAudio[resolved];
    }
  });

  function assertAudioCoverage(lessons, audioMap) {
    const missing = collectLessonAudioKeys(lessons).filter((key) => !audioMap[key]);
    if (missing.length) {
      console.warn(`Unmapped extracted audio keys (${missing.length}):`, missing.join(', '));
    }
  }

  assertAudioCoverage(stageLessons, stageAudio);

  const state = {
    lessonIndex: 0,
    tileIndex: -1,
    autoplaying: false,
    autoplayToken: 0,
    playbackToken: 0,
    activeSurface: null,
    isTransitioning: false
  };

  function getCurrentLesson() {
    return stageLessons[state.lessonIndex];
  }

  function showInfoPanel(lesson = getCurrentLesson()) {
    if (!lesson) return false;
    // If explicitly cleared, hide.
    if (lesson.info === null) return false;
    // Hide for a few special-case lessons.
    if (lesson.id === 'alif' || lesson.id === 'tthe' || lesson.id === 'ye' || lesson.id === 'hamza') return false;
    // If there's no useful info data, don't show an empty panel.
    if (!lesson.caption && !lesson.romanBase && !(lesson.info && lesson.info.lines && lesson.info.lines.length)) return false;
    return true;
  }

  function showMetaPanel(lesson = getCurrentLesson()) {
    if (lesson?.id === 'ye') return true;
    return false;
  }

  let isPlaying = false;
  let currentAutoplayStage = 'Awaiting input';

  function getIntroSurfaceCount(lesson = getCurrentLesson()) {
    let count = 2; // main + example
    if (showInfoPanel(lesson)) count += 1;
    if (showMetaPanel(lesson)) count += 1;
    return count;
  }

  function getLessonSurfaceCount(lesson = getCurrentLesson()) {
    return getIntroSurfaceCount(lesson) + getLessonTiles(lesson).length + lesson.words.length;
  }

  function getSurfaceProgressCount(lesson = getCurrentLesson()) {
    const infoOffset = showInfoPanel(lesson) ? 1 : 0;
    const mainOffset = infoOffset + 1;
    const metaOffset = mainOffset + (showMetaPanel(lesson) ? 1 : 0);
    const tileOffset = metaOffset;

    if (currentAutoplayStage === 'Lesson complete') {
      return getLessonSurfaceCount(lesson);
    }

    if (!state.activeSurface) {
      return 0;
    }

    switch (state.activeSurface.type) {
      case 'info':
        return infoOffset;
      case 'main':
        return mainOffset;
      case 'meta':
        return metaOffset;
      case 'tile':
        return tileOffset + state.activeSurface.index;
      case 'word':
        return tileOffset + getLessonTiles(lesson).length + state.activeSurface.index;
      case 'example':
        return getLessonSurfaceCount(lesson);
      default:
        return 0;
    }
  }

  function setAutoplayStage(stageLabel) {
    currentAutoplayStage = stageLabel;
  }

  function setManualStage(stageLabel) {
    if (!state.autoplaying) {
      setAutoplayStage(stageLabel);
    }
  }

  function setStatus(message, playing) {
    if (playing !== undefined) {
      isPlaying = playing;
    }
    if (!isPlaying && !state.autoplaying && state.activeSurface) {
      switch (state.activeSurface.type) {
        case 'example':
          currentAutoplayStage = 'Example word';
          break;
        case 'tile':
          currentAutoplayStage = `Sound tiles · ${state.activeSurface.index + 1} / ${getCurrentLesson().tiles.length}`;
          break;
        case 'word':
          currentAutoplayStage = `Word cards · ${state.activeSurface.index + 1} / ${getCurrentLesson().words.length}`;
          break;
        case 'info':
          currentAutoplayStage = 'Intro panels · info';
          break;
        case 'main':
          currentAutoplayStage = 'Intro panels · letter';
          break;
        case 'meta':
          currentAutoplayStage = 'Intro panels · meta';
          break;
        default:
          currentAutoplayStage = 'Awaiting input';
          break;
      }
    }
    if (isPlaying) {
      console.log(`[playing] ${message}`);
    } else {
      console.log(`[status] ${message}`);
    }
    if (dom.lessonRail) {
      const activePill = dom.lessonRail.querySelector('.stage-lesson-pill.is-active');
      if (activePill) {
        activePill.classList.toggle('is-playing', isPlaying);
      }
    }
    updateNowPlaying();
  }

  function updateNowPlaying() {
    // HUD removed
  }



  const preloadedAudioUrls = new Set();
  function preloadLessonAudio(lesson) {
    const lessonTiles = getLessonTiles(lesson);
    const keys = [
      lesson.info?.audioKey,
      lesson.main?.audioKey,
      lesson.meta?.audioKey,
      lesson.example?.audioKey,
      ...lesson.words.map(w => w.audioKey),
      ...lessonTiles.map(t => t.audioKey)
    ].filter(Boolean);
    keys.forEach(key => {
      const url = stageAudio[key];
      if (url && !preloadedAudioUrls.has(url)) {
        preloadedAudioUrls.add(url);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'audio';
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }

  function wait(duration) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  }

  function nextFrame() {
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => resolve());
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function prefersLightMotion() {
    if (prefersReducedMotion()) {
      return true;
    }
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lowCpu = typeof navigator !== 'undefined' && Number.isFinite(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4;
    return coarsePointer || lowCpu;
  }

  function getGSAP() {
    if (typeof window === 'undefined') {
      return null;
    }
    const lib = window.gsap;
    return lib && typeof lib.to === 'function' ? lib : null;
  }

  function animateElement(element, keyframes, options) {
    if (!element || prefersReducedMotion()) {
      return Promise.resolve();
    }

    const gsap = getGSAP();
    if (gsap && Array.isArray(keyframes) && keyframes.length >= 2) {
      const fromFrame = keyframes[0] || {};
      const toFrame = keyframes[keyframes.length - 1] || {};
      const durationMs = Number(options?.duration || 0);
      const delayMs = Number(options?.delay || 0);

      return new Promise((resolve) => {
        gsap.killTweensOf(element);
        gsap.fromTo(element, { ...fromFrame }, {
          ...toFrame,
          duration: durationMs / 1000,
          delay: delayMs / 1000,
          ease: options?.easing || 'power3.out',
          onComplete: () => resolve(),
          onInterrupt: () => resolve()
        });
      });
    }

    const animation = element.animate(keyframes, { ...options, fill: 'none' });
    return animation.finished.then(() => {
      animation.cancel();
    }).catch(() => undefined);
  }

  function pulseElement(element) {
    if (!element || prefersReducedMotion()) {
      return;
    }

    const gsap = getGSAP();
    if (gsap) {
      gsap.killTweensOf(element);
      gsap.timeline()
        .to(element, {
          y: -4,
          scale: 1.018,
          duration: 0.12,
          ease: 'power2.out'
        })
        .to(element, {
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: 'power2.out'
        });
      return;
    }

    element.animate([
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-6px) scale(1.02)' },
      { transform: 'translateY(0) scale(1)' }
    ], {
      duration: 360,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });
  }

  function spawnRipple(element, event) {
    if (!element || prefersReducedMotion()) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'stage-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${(event ? event.clientX - rect.left : rect.width / 2) - size / 2}px`;
    ripple.style.top = `${(event ? event.clientY - rect.top : rect.height / 2) - size / 2}px`;
    element.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }

  function scrollTileIntoView(index) {
    const tile = dom.tiles.querySelector(`[data-stage-tile-index="${index}"]`);
    if (tile) {
      tile.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  async function animateLessonReveal(direction = 1) {
    if (prefersReducedMotion()) {
      return;
    }

    const gsap = getGSAP();
    const lightMotion = prefersLightMotion();
    const lessonPills = Array.from(dom.lessonRail?.querySelectorAll('.stage-lesson-pill') || []);
    const activePillTargets = lessonPills.filter((_, index) => Math.abs(index - state.lessonIndex) <= 2);
    const revealTargets = [
      dom.infoBtn,
      dom.letterBtn,
      dom.metaBtn,
      dom.exampleBtn,
      ...Array.from(dom.wordsPanel?.querySelectorAll('.stage-word-button') || []),
      ...Array.from(dom.tiles.querySelectorAll('.stage-tile')),
      ...Array.from(dom.bottomDock?.querySelectorAll('.stage-control') || []),
      ...activePillTargets
    ].filter(Boolean);

    if (gsap && revealTargets.length) {
      const offset = direction > 0 ? 16 : -16;
      gsap.killTweensOf(revealTargets);
      await new Promise((resolve) => {
        gsap.fromTo(revealTargets,
          {
            opacity: lightMotion ? 0.65 : 0,
            x: offset,
            y: lightMotion ? 6 : 10,
            scale: lightMotion ? 0.994 : 0.985
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: lightMotion ? 0.2 : 0.3,
            ease: 'power3.out',
            stagger: lightMotion ? 0.008 : 0.014,
            onComplete: () => resolve(),
            onInterrupt: () => resolve()
          }
        );
      });
      return;
    }

    await Promise.all(revealTargets.map((element, index) => animateElement(element, [
      { opacity: 1, transform: `translate3d(${direction > 0 ? 10 : -10}px, 8px, 0) scale(0.992)` },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    ], {
      duration: 260,
      delay: Math.min(index * 16, 140),
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    })));
  }

  function setTheme(lesson) {
    document.documentElement.style.setProperty('--lesson-accent', lesson.theme.accent);
    document.documentElement.style.setProperty('--lesson-secondary', lesson.theme.secondary);
    document.documentElement.style.setProperty('--lesson-glow', lesson.theme.glow);
    document.documentElement.style.setProperty('--lesson-glow-2', lesson.theme.glowSecondary);
    dom.experience.style.setProperty('--lesson-accent', lesson.theme.accent);
    dom.experience.style.setProperty('--lesson-secondary', lesson.theme.secondary);
    dom.experience.style.setProperty('--lesson-glow', lesson.theme.glow);
    dom.experience.style.setProperty('--lesson-glow-2', lesson.theme.glowSecondary);
    dom.experience.dataset.lesson = lesson.id;
  }

  function setActiveSurface(type, index = -1) {
    state.activeSurface = { type, index };
  }

  function isSurfaceActive(type, index = -1) {
    return Boolean(state.activeSurface && state.activeSurface.type === type && state.activeSurface.index === index);
  }

  function stopActiveMedia() {
    stopAudio();
  }

  function interruptPlayback() {
    state.playbackToken += 1;
    isPlaying = false;
    stopActiveMedia();
    return state.playbackToken;
  }

  function syncAutoplayButtons() {
    const playing = state.autoplaying;
    dom.autoplayInlineBtn.textContent = playing ? '■ Stop' : '▶ Full Lesson';
  }

  function stopAutoplay(statusMessage) {
    state.autoplaying = false;
    state.autoplayToken += 1;
    interruptPlayback();
    syncAutoplayButtons();
    setAutoplayStage('Awaiting input');
    if (statusMessage) {
      setStatus(statusMessage);
    }
  }

  function setTileIndex(index) {
    const lesson = getCurrentLesson();
    const maxIndex = getLessonTiles(lesson).length - 1;

    if (maxIndex < 0) {
      state.tileIndex = -1;
      return;
    }

    if (!Number.isFinite(index) || index < 0) {
      state.tileIndex = -1;
      return;
    }

    state.tileIndex = Math.max(0, Math.min(index, maxIndex));
  }

  function getSelectedTile() {
    const lesson = getCurrentLesson();
    const lessonTiles = getLessonTiles(lesson);
    return state.tileIndex >= 0 ? lessonTiles[state.tileIndex] || null : null;
  }

  function setLessonIndex(index) {
    const maxIndex = stageLessons.length - 1;
    state.lessonIndex = Math.max(0, Math.min(index, maxIndex));
    state.tileIndex = -1;
    state.activeSurface = null;
  }

  async function playToken(token, baseStatus) {
    const playbackToken = interruptPlayback();
    setStatus(baseStatus, true);

    const audioUrl = token.audioKey ? stageAudio[token.audioKey] : '';
    if (audioUrl) {
      const audioPlayed = await playAudio(audioUrl);
      if (playbackToken !== state.playbackToken) {
        return;
      }

      if (audioPlayed) {
        setStatus(`${baseStatus} Local SWF audio.`, false);
        return;
      }

      setStatus(`${baseStatus} Extracted SWF audio failed to play in this browser.`, false);
      return;
    }

    if (playbackToken !== state.playbackToken) {
      return;
    }

    setStatus(`${baseStatus} No extracted SWF audio is mapped for this item.`, false);
  }

  function renderStage() {
    const lesson = getCurrentLesson();
    const lessonTiles = getLessonTiles(lesson);
    const selectedTile = getSelectedTile();
    const progress = ((state.lessonIndex + 1) / stageLessons.length) * 100;

    setTheme(lesson);

    if (dom.tileLabel) {
      dom.tileLabel.textContent = `Sound tiles · ${lesson.name} · ${lessonTiles.length} variations`;
    }

    if (dom.lessonRail) {
      dom.lessonRail.innerHTML = stageLessons.map((entry, index) => `
        <button class="stage-lesson-pill ${index === state.lessonIndex ? 'is-active' : ''} ${index < state.lessonIndex ? 'is-complete' : ''}" type="button" data-stage-lesson-index="${index}" aria-label="${entry.name}" ${index === state.lessonIndex ? 'aria-current="true"' : ''}>
          <span class="stage-lesson-pill-step">${index + 1}</span>
          <span class="stage-lesson-pill-copy">
            <span class="stage-lesson-pill-script">${entry.letter}</span>
            <span class="stage-lesson-pill-name">${entry.name}</span>
          </span>
        </button>
      `).join('');
    }

    const eqBarsHTML = `
      <span class="stage-eq" aria-hidden="true">
        <span class="stage-eq-bar"></span>
        <span class="stage-eq-bar"></span>
        <span class="stage-eq-bar"></span>
        <span class="stage-eq-bar"></span>
      </span>
    `;

    if (dom.infoBtn) {
      if (showInfoPanel(lesson)) {
        dom.infoBtn.hidden = false;
        dom.infoBtn.innerHTML = `
        <span class="stage-panel-label">Notes</span>
        <div class="stage-info-copy">
          <span class="stage-info-title">${lesson.caption}</span>
          <span class="stage-info-desc">Pronounced "${lesson.romanBase}"</span>
        </div>
        ${eqBarsHTML}
      `;
      } else {
        dom.infoBtn.hidden = true;
        dom.infoBtn.innerHTML = '';
      }
    }

    if (dom.letterBtn) {
      dom.letterBtn.innerHTML = `
        <span class="stage-main-glow" aria-hidden="true"></span>
        <span class="stage-main-script">${lesson.letter}</span>
        <span class="stage-main-name">${lesson.name}</span>
        <span class="stage-main-caption">Tap to hear the letter sound</span>
      `;
    }

    if (dom.metaBtn) {
      if (showMetaPanel(lesson)) {
        dom.metaBtn.hidden = false;
        dom.metaBtn.innerHTML = `
        <span class="stage-panel-label">Pronunciation</span>
        <div class="stage-meta-copy">
          <span>${lesson.classification || 'Consonant'}</span>
          <span>${lesson.articulation || 'Standard'}</span>
        </div>
        ${eqBarsHTML}
      `;
      } else {
        dom.metaBtn.hidden = true;
        dom.metaBtn.innerHTML = '';
      }
    }

    if (dom.wordsPanel) {
      if (lesson.words && lesson.words.length > 0) {
        dom.grid.classList.add('has-words-panel');
        dom.wordsPanel.hidden = false;
        dom.wordsPanel.innerHTML = `
          <div class="stage-words-header">
            <span class="stage-words-label">Word forms</span>
            <span class="stage-words-count">${lesson.words.length} words</span>
          </div>
          <div class="stage-words-list" dir="ltr">
            ${lesson.words.map((word, i) => `
              <button class="stage-word-button ${isSurfaceActive('word', i) ? 'is-engaged' : ''}" type="button" data-stage-word-index="${i}">
                <span class="stage-word-english">${word.english}</span>
                <span class="stage-word-roman">${word.roman}</span>
                <span class="stage-word-script">${word.script}</span>
                ${eqBarsHTML}
              </button>
            `).join('')}
          </div>
        `;
      } else {
        dom.grid.classList.remove('has-words-panel');
        dom.wordsPanel.hidden = true;
        dom.wordsPanel.innerHTML = '';
      }
    }

    if (dom.exampleBtn && lesson.example) {
      dom.exampleBtn.innerHTML = `
        <span class="stage-panel-label">Example</span>
        <div class="stage-example-copy">
          <span class="stage-example-roman">${lesson.example.roman}</span>
          <span class="stage-example-script">${lesson.example.script}</span>
          <span class="stage-example-english">${lesson.example.english}</span>
        </div>
        <div class="stage-example-visual-shell" aria-hidden="true">
          <div class="stage-example-visual">${lesson.example.visual}</div>
        </div>
        ${eqBarsHTML}
      `;
    }

    dom.tiles.innerHTML = lessonTiles.map((tile, index) => `
      <button class="stage-tile ${index === state.tileIndex ? 'is-active' : ''} ${isSurfaceActive('tile', index) ? 'is-engaged' : ''}" type="button" data-stage-tile-index="${index}" aria-label="${tile.roman}">
        <span class="stage-tile-num">${index + 1}</span>
        <span class="stage-tile-script">${tile.script}</span>
        <span class="stage-tile-roman">${tile.roman}</span>
        ${eqBarsHTML}
      </button>
    `).join('');

    if (dom.tileProgress) {
      dom.tileProgress.innerHTML = lessonTiles.map((_, index) => {
        const cls = index === state.tileIndex ? 'is-current' : index < state.tileIndex ? 'is-done' : '';
        return `<span class="stage-tile-progress-pip ${cls}"></span>`;
      }).join('');
    }

    preloadLessonAudio(lesson);
    const nextLesson = stageLessons[state.lessonIndex + 1];
    if (nextLesson) {
      preloadLessonAudio(nextLesson);
    }

    if (dom.infoBtn) dom.infoBtn.classList.toggle('is-engaged', isSurfaceActive('info'));
    if (dom.letterBtn) dom.letterBtn.classList.toggle('is-engaged', isSurfaceActive('main'));
    if (dom.metaBtn) dom.metaBtn.classList.toggle('is-engaged', isSurfaceActive('meta'));
    if (dom.exampleBtn) dom.exampleBtn.classList.toggle('is-engaged', isSurfaceActive('example'));

    dom.firstBtn.disabled = state.lessonIndex === 0;
    dom.backBtn.disabled = state.lessonIndex === 0;
    dom.nextBtn.disabled = state.lessonIndex === stageLessons.length - 1;
    dom.lastBtn.disabled = state.lessonIndex === stageLessons.length - 1;

    if (!state.autoplaying) {
      if (selectedTile) {
        setStatus(`Letter ${state.lessonIndex + 1} of ${stageLessons.length}. Tile ${state.tileIndex + 1} of ${lessonTiles.length}: ${selectedTile.script} · ${selectedTile.roman}.`);
      } else {
        setStatus(`Letter ${state.lessonIndex + 1} of ${stageLessons.length}: ${lesson.letter} · ${lesson.name}. Tap any card or sound tile to hear it.`);
      }
    }

    syncAutoplayButtons();
  }

  async function playTile(index) {
    if (state.isTransitioning) {
      return;
    }

    const lesson = getCurrentLesson();
    const lessonTiles = getLessonTiles(lesson);
    if (lessonTiles.length === 0) {
      return;
    }
    setTileIndex(index);
    setActiveSurface('tile', index);
    renderStage();
    scrollTileIntoView(index);
    setManualStage(`Sound tiles · ${index + 1} / ${lessonTiles.length}`);

    const tile = getSelectedTile();
    if (!tile) {
      return;
    }

    pulseElement(dom.tiles.querySelector(`[data-stage-tile-index="${index}"]`));
    await playToken(tile, `Playing tile ${state.tileIndex + 1} of ${lessonTiles.length}: ${tile.script} · ${tile.roman}.`);
  }

  async function playInfo(options = {}) {
    if (state.isTransitioning) return;
    const { fromAutoplay = false } = options;
    const lesson = getCurrentLesson();
    if (!showInfoPanel(lesson)) return;
    if (!fromAutoplay) stopAutoplay();
    setActiveSurface('info');
    setManualStage('Intro panels · info');
    renderStage();
    pulseElement(dom.infoBtn);
    await playToken(lesson.info, `Playing the lesson note for ${lesson.name}.`);
  }

  async function playMainLetter(options = {}) {
    if (state.isTransitioning) return;
    const { fromAutoplay = false } = options;
    const lesson = getCurrentLesson();
    if (!fromAutoplay) stopAutoplay();
    setActiveSurface('main');
    setManualStage('Intro panels · letter');
    renderStage();
    pulseElement(dom.letterBtn);
    await playToken(lesson.main, `Playing the letter: ${lesson.name}.`);
  }

  async function playMeta(options = {}) {
    if (state.isTransitioning) return;
    const { fromAutoplay = false } = options;
    const lesson = getCurrentLesson();
    if (!showMetaPanel(lesson)) return;
    if (!fromAutoplay) stopAutoplay();
    setActiveSurface('meta');
    setManualStage('Intro panels · meta');
    renderStage();
    pulseElement(dom.metaBtn);
    await playToken(lesson.meta, `Playing the pronunciation panel for ${lesson.name}.`);
  }

  async function playWord(index, options = {}) {
    if (state.isTransitioning) return;
    const { fromAutoplay = false } = options;
    const lesson = getCurrentLesson();
    const word = lesson.words[index];
    if (!word) return;
    if (!fromAutoplay) stopAutoplay();
    setActiveSurface('word', index);
    setManualStage(`Word cards · ${index + 1} / ${lesson.words.length}`);
    renderStage();
    pulseElement(dom.wordsPanel.querySelector(`[data-stage-word-index="${index}"]`));
    await playToken(word, `Playing the word row: ${word.roman}, ${word.english}.`);
  }

  async function playExample(options = {}) {
    if (state.isTransitioning) return;
    const { fromAutoplay = false } = options;
    const lesson = getCurrentLesson();
    if (!fromAutoplay) stopAutoplay();
    setActiveSurface('example');
    setManualStage('Example word');
    renderStage();
    pulseElement(dom.exampleBtn);
    await playToken(lesson.example, `Playing the example word: ${lesson.example.roman}, ${lesson.example.english}.`);
  }

  // Other panel play functions removed

  async function navigateLesson(index) {
    const nextIndex = Math.max(0, Math.min(index, stageLessons.length - 1));
    if (state.isTransitioning || nextIndex === state.lessonIndex) {
      return;
    }

    stopAutoplay();
    state.isTransitioning = true;
    dom.experience.classList.add('is-transitioning');

    const fastMode = prefersLightMotion();
    const direction = nextIndex > state.lessonIndex ? 1 : -1;
    const outOffset = direction > 0 ? -10 : 10;
    const inOffset = outOffset * -1;

    if (!fastMode) {
      await Promise.all([
        animateElement(dom.topbar, [
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          { opacity: 0.25, transform: `translate3d(${outOffset * 0.35}px, 4px, 0)` }
        ], {
          duration: 120,
          easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)'
        }),
        animateElement(dom.sceneCard, [
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          { opacity: 0.2, transform: `translate3d(${outOffset}px, 6px, 0)` }
        ], {
          duration: 140,
          easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)'
        })
      ]);
    }

    setLessonIndex(nextIndex);
    renderStage();
    await nextFrame();

    if (!fastMode) {
      await Promise.all([
        animateElement(dom.topbar, [
          { opacity: 0.25, transform: `translate3d(${inOffset * 0.3}px, 4px, 0)` },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' }
        ], {
          duration: 150,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }),
        animateElement(dom.sceneCard, [
          { opacity: 0.2, transform: `translate3d(${inOffset}px, 6px, 0)` },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' }
        ], {
          duration: 180,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        })
      ]);
    }

    state.isTransitioning = false;
    dom.experience.classList.remove('is-transitioning');
  }

  async function toggleAutoplay() {
    const lesson = getCurrentLesson();
    const lessonTiles = getLessonTiles(lesson);

    if (state.autoplaying) {
      stopAutoplay('Auto play stopped. Tap any tile to listen again.');
      return;
    }

    state.autoplaying = true;
    state.autoplayToken += 1;
    const currentToken = state.autoplayToken;
    syncAutoplayButtons();
    setAutoplayStage('Intro panels');

    const panelSteps = [
      showInfoPanel(lesson) ? { play: () => playInfo({ fromAutoplay: true }), label: 'info' } : null,
      { play: () => playMainLetter({ fromAutoplay: true }), label: 'letter' },
      showMetaPanel(lesson) ? { play: () => playMeta({ fromAutoplay: true }), label: 'meta' } : null
    ].filter(Boolean);

    for (const step of panelSteps) {
      if (!state.autoplaying || currentToken !== state.autoplayToken) {
        return;
      }
      setAutoplayStage(`Intro panels · ${step.label}`);
      await step.play();
      await wait(180);
    }

    const startIndex = state.tileIndex >= 0 && state.tileIndex < lessonTiles.length - 1 ? state.tileIndex : 0;
    setAutoplayStage('Sound tiles');

    for (let index = startIndex; index < lessonTiles.length; index += 1) {
      if (!state.autoplaying || currentToken !== state.autoplayToken) {
        return;
      }

      setAutoplayStage(`Sound tiles · ${index + 1} / ${lessonTiles.length}`);

      await playTile(index);
      await wait(90);
    }

    if (!state.autoplaying || currentToken !== state.autoplayToken) {
      return;
    }

    if (lesson.words.length > 0) {
      setAutoplayStage('Word cards');
      for (let index = 0; index < lesson.words.length; index += 1) {
        if (!state.autoplaying || currentToken !== state.autoplayToken) {
          return;
        }
        setAutoplayStage(`Word cards · ${index + 1} / ${lesson.words.length}`);
        await playWord(index, { fromAutoplay: true });
        await wait(120);
      }
    }

    if (!state.autoplaying || currentToken !== state.autoplayToken) {
      return;
    }

    setAutoplayStage('Example word');
    await playExample({ fromAutoplay: true });

    if (currentToken !== state.autoplayToken) {
      return;
    }

    state.autoplaying = false;
    syncAutoplayButtons();
    setAutoplayStage('Lesson complete');
    setStatus(`Auto play finished for letter ${state.lessonIndex + 1} of ${stageLessons.length}. Full lesson complete!`);
    celebrateCompletion();
  }

  function celebrateCompletion() {
    if (prefersReducedMotion()) {
      return;
    }

    dom.sceneCard.classList.add('stage-celebrate');
    dom.sceneCard.addEventListener('animationend', () => {
      dom.sceneCard.classList.remove('stage-celebrate');
    }, { once: true });

    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'stage-confetti';
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ffba63'];
    for (let i = 0; i < 18; i += 1) {
      const dot = document.createElement('div');
      dot.className = 'stage-confetti-dot';
      dot.style.left = `${10 + Math.random() * 80}%`;
      dot.style.top = `${10 + Math.random() * 40}%`;
      dot.style.background = colors[i % colors.length];
      dot.style.animationDelay = `${Math.random() * 0.3}s`;
      dot.style.width = `${6 + Math.random() * 6}px`;
      dot.style.height = dot.style.width;
      confettiContainer.appendChild(dot);
    }
    dom.sceneCard.appendChild(confettiContainer);
    setTimeout(() => confettiContainer.remove(), 1600);
  }

  dom.tiles.addEventListener('click', (event) => {
    const tileButton = event.target.closest('[data-stage-tile-index]');
    if (!tileButton) {
      return;
    }

    spawnRipple(tileButton, event);
    const index = Number(tileButton.dataset.stageTileIndex);
    void playTile(index);
  });

  if (dom.wordsPanel) {
    dom.wordsPanel.addEventListener('click', (event) => {
      const wordButton = event.target.closest('[data-stage-word-index]');
      if (!wordButton) return;
      spawnRipple(wordButton, event);
      const index = Number(wordButton.dataset.stageWordIndex);
      void playWord(index);
    });
  }

  // HUD panel listeners
  if (dom.letterBtn) {
    dom.letterBtn.addEventListener('click', (e) => {
      spawnRipple(dom.letterBtn, e);
      void playMainLetter();
    });
  }

  if (dom.infoBtn) {
    dom.infoBtn.addEventListener('click', (e) => {
      spawnRipple(dom.infoBtn, e);
      void playInfo();
    });
  }

  if (dom.metaBtn) {
    dom.metaBtn.addEventListener('click', (e) => {
      spawnRipple(dom.metaBtn, e);
      void playMeta();
    });
  }

  if (dom.exampleBtn) {
    dom.exampleBtn.addEventListener('click', (e) => {
      spawnRipple(dom.exampleBtn, e);
      void playExample();
    });
  }

  dom.lessonRail?.addEventListener('click', (event) => {
    const lessonButton = event.target.closest('[data-stage-lesson-index]');
    if (!lessonButton) return;
    const index = Number(lessonButton.dataset.stageLessonIndex);
    void navigateLesson(index);
  });

  dom.firstBtn.addEventListener('click', () => {
    void navigateLesson(0);
  });

  dom.backBtn.addEventListener('click', () => {
    void navigateLesson(state.lessonIndex - 1);
  });

  dom.nextBtn.addEventListener('click', () => {
    void navigateLesson(state.lessonIndex + 1);
  });

  dom.lastBtn.addEventListener('click', () => {
    void navigateLesson(stageLessons.length - 1);
  });

  dom.autoplayInlineBtn.addEventListener('click', () => {
    void toggleAutoplay();
  });

  window.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || state.isTransitioning) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        void navigateLesson(state.lessonIndex - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        void navigateLesson(state.lessonIndex + 1);
        break;
      case 'ArrowUp': {
        event.preventDefault();
        const prevTile = Math.max(0, (state.tileIndex < 0 ? 0 : state.tileIndex) - 1);
        void playTile(prevTile);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const lesson = getCurrentLesson();
        const lessonTiles = getLessonTiles(lesson);
        const nextTile = Math.min(lessonTiles.length - 1, (state.tileIndex < 0 ? -1 : state.tileIndex) + 1);
        void playTile(nextTile);
        break;
      }
      case 'Home':
        event.preventDefault();
        void navigateLesson(0);
        break;
      case 'End':
        event.preventDefault();
        void navigateLesson(stageLessons.length - 1);
        break;
      case ' ':
        event.preventDefault();
        void toggleAutoplay();
        break;
      case 'Escape':
        if (state.autoplaying) {
          event.preventDefault();
          stopAutoplay('Auto play stopped.');
        }
        break;
      case '1': case '2': case '3': case '4': case '5':
      case '6': case '7': case '8': case '9': case '0': {
        event.preventDefault();
        const tileNum = event.key === '0' ? 10 : Number(event.key);
        const lesson = getCurrentLesson();
        if (tileNum <= getLessonTiles(lesson).length) {
          void playTile(tileNum - 1);
        }
        break;
      }
      default:
        break;
    }
  });

  if (!prefersLightMotion()) {
    const gsap = getGSAP();
    if (gsap) {
      const tiltX = gsap.quickTo(dom.sceneCard, 'rotationX', { duration: 0.3, ease: 'power3.out' });
      const tiltY = gsap.quickTo(dom.sceneCard, 'rotationY', { duration: 0.3, ease: 'power3.out' });

      gsap.set(dom.sceneCard, { transformPerspective: 1200, transformOrigin: 'center center' });

      dom.sceneCard.addEventListener('mousemove', (e) => {
        const rect = dom.sceneCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tiltY(x * 2.2);
        tiltX(y * -2.2);
      });

      dom.sceneCard.addEventListener('mouseleave', () => {
        tiltX(0);
        tiltY(0);
      });
    } else {
      dom.sceneCard.addEventListener('mousemove', (e) => {
        const rect = dom.sceneCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        dom.sceneCard.style.transform = `perspective(1200px) rotateY(${x * 2.5}deg) rotateX(${y * -2.5}deg)`;
      });
      dom.sceneCard.addEventListener('mouseleave', () => {
        dom.sceneCard.style.transform = '';
      });
    }
  }

  window.addEventListener('beforeunload', () => {
    stopActiveMedia();
  });

  renderStage();
  void Promise.all([
    animateElement(dom.sceneCard, [
      { opacity: 0, transform: 'translate3d(0, 24px, 0) scale(0.985)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    ], {
      duration: 420,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    })
  ]).then(() => {
    animateLessonReveal(1);
    window.dispatchEvent(new Event('stage:ready'));
  });
})();


