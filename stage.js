import { playAudio, stopAudio } from './audio-manager.js';

(() => {
  const dom = {
    title: document.getElementById('stageTitle'),
    subtitle: document.getElementById('stageSubtitle'),
    grid: document.getElementById('stageGrid'),
    infoBtn: document.getElementById('stageInfoBtn'),
    letterBtn: document.getElementById('stageLetterBtn'),
    metaBtn: document.getElementById('stageMetaBtn'),
    wordsPanel: document.getElementById('stageWordsPanel'),
    exampleBtn: document.getElementById('stageExampleBtn'),
    tiles: document.getElementById('stageTiles'),
    firstBtn: document.getElementById('stageFirstBtn'),
    backBtn: document.getElementById('stageBackBtn'),
    autoplayBtn: document.getElementById('stageAutoplayBtn'),
    autoplayInlineBtn: document.getElementById('stageAutoplayInlineBtn'),
    nextBtn: document.getElementById('stageNextBtn'),
    lastBtn: document.getElementById('stageLastBtn'),
    playbackStatus: document.getElementById('stagePlaybackStatus'),
    openStudyBtn: document.getElementById('stageOpenStudyBtn'),
    studySection: document.getElementById('studySection')
  };

  if (!dom.title || !dom.tiles || !dom.playbackStatus || !dom.grid || !dom.wordsPanel) {
    return;
  }

  function createConsonantTiles(baseScript, romanBase, audioPrefix) {
    return [
      { script: `${baseScript}َو`, roman: `${romanBase}ao`, audioKey: `${audioPrefix}-tile-01`, voiceText: `${romanBase}ao` },
      { script: `${baseScript}و`, roman: `${romanBase}o`, audioKey: `${audioPrefix}-tile-02`, voiceText: `${romanBase}o` },
      { script: `${baseScript}َي`, roman: `${romanBase}ai`, audioKey: `${audioPrefix}-tile-03`, voiceText: `${romanBase}ai` },
      { script: `${baseScript}ي`, roman: `${romanBase}e`, audioKey: `${audioPrefix}-tile-04`, voiceText: `${romanBase}e` },
      { script: `${baseScript}ُو`, roman: `${romanBase}oo`, audioKey: `${audioPrefix}-tile-05`, voiceText: `${romanBase}oo` },
      { script: `${baseScript}ُ`, roman: `${romanBase}u`, audioKey: `${audioPrefix}-tile-06`, voiceText: `${romanBase}u` },
      { script: `${baseScript}ِي`, roman: `${romanBase}ii`, audioKey: `${audioPrefix}-tile-07`, voiceText: `${romanBase}ii` },
      { script: `${baseScript}ِ`, roman: `${romanBase}i`, audioKey: `${audioPrefix}-tile-08`, voiceText: `${romanBase}i` },
      { script: `${baseScript}ا`, roman: `${romanBase}aa`, audioKey: `${audioPrefix}-tile-09`, voiceText: `${romanBase}aa` },
      { script: `${baseScript}َ`, roman: `${romanBase}a`, audioKey: `${audioPrefix}-tile-10`, voiceText: `${romanBase}a` }
    ];
  }

  const stageLessons = [
    {
      id: 'alif',
      title: 'Basics',
      subtitle: 'Consonants',
      letter: 'ا',
      name: 'alif',
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
        roman: 'a',
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
        { script: 'اَ', roman: 'a', audioKey: 'alif-tile-10', voiceText: 'a' },
        { script: 'آ', roman: 'aa', audioKey: 'alif-tile-09', voiceText: 'aa' },
        { script: 'اِ', roman: 'i', audioKey: 'alif-tile-08', voiceText: 'i' },
        { script: 'اِي', roman: 'ii', audioKey: 'alif-tile-07', voiceText: 'ii' },
        { script: 'اُ', roman: 'u', audioKey: 'alif-tile-06', voiceText: 'u' },
        { script: 'اُو', roman: 'oo', audioKey: 'alif-tile-05', voiceText: 'oo' },
        { script: 'اي', roman: 'ee', audioKey: 'alif-tile-04', voiceText: 'ee' },
        { script: 'آي', roman: 'aai', audioKey: 'alif-tile-03', voiceText: 'aai' },
        { script: 'او', roman: 'ao', audioKey: 'alif-tile-02', voiceText: 'ao' },
        { script: 'آو', roman: 'aao', audioKey: 'alif-tile-01', voiceText: 'aao' }
      ]
    },
    {
      id: 'be',
      title: 'Basics',
      subtitle: 'Consonants',
      letter: 'ب',
      name: 'be',
      info: {
        lines: ['as \'b\' in \'bus\''],
        audioKey: 'be-info',
        voiceText: 'as b in bus'
      },
      main: {
        audioKey: 'be-main',
        voiceText: 'be'
      },
      meta: {
        roman: 'b',
        caption: 'As in bus',
        audioKey: 'be-meta',
        voiceText: 'be'
      },
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
      tiles: createConsonantTiles('ب', 'b', 'be')
    },
    {
      id: 'bbe',
      title: 'Basics',
      subtitle: 'Consonants',
      letter: 'ٻ',
      name: 'bbe',
      info: {
        lines: ['a peculiar Sindhi sound'],
        audioKey: 'bbe-info',
        voiceText: 'a peculiar Sindhi sound'
      },
      main: {
        audioKey: 'bbe-main',
        voiceText: 'bbe'
      },
      meta: {
        roman: 'b',
        caption: 'Peculiar Sindhi sound',
        audioKey: 'bbe-meta',
        voiceText: 'bbe. peculiar Sindhi sound'
      },
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
      tiles: createConsonantTiles('ٻ', 'b', 'bbe')
    }
  ];

  const extractedStageAudio = {
    'alif-info': '/extracted_audio/sound_0338.mp3',
    'alif-main': '/extracted_audio/sound_0338.mp3',
    'alif-meta': '/extracted_audio/sound_0338.mp3',
    'alif-example': '/extracted_audio/sound_0241.mp3',
    // Tiles properly mapped and ordered RTL
    'alif-tile-10': '/extracted_audio/sound_0269.mp3', // اَ  a
    'alif-tile-09': '/extracted_audio/sound_0274.mp3', // آ  aa
    'alif-tile-08': '/extracted_audio/sound_0308.mp3', // اِ  i
    'alif-tile-07': '/extracted_audio/sound_0278.mp3', // اِي ii
    'alif-tile-06': '/extracted_audio/sound_0283.mp3', // اُ  u
    'alif-tile-05': '/extracted_audio/sound_0287.mp3', // اُو oo
    'alif-tile-04': '/extracted_audio/sound_0291.mp3', // اي  ee
    'alif-tile-03': '/extracted_audio/sound_0295.mp3', // آي  aai
    'alif-tile-02': '/extracted_audio/sound_0299.mp3', // او  ao
    'alif-tile-01': '/extracted_audio/sound_0303.mp3', // آو  aao
    'be-info': '/extracted_audio/sound_0363.mp3',
    'be-word-01': '/extracted_audio/sound_0377.mp3',
    'be-example': '/extracted_audio/sound_0393.mp3',
    'be-word-02': '/extracted_audio/sound_0384.mp3',
    'be-tile-01': '/extracted_audio/sound_0434.mp3',
    'be-tile-02': '/extracted_audio/sound_0430.mp3',
    'be-tile-03': '/extracted_audio/sound_0427.mp3',
    'be-tile-04': '/extracted_audio/sound_0424.mp3',
    'be-tile-05': '/extracted_audio/sound_0421.mp3',
    'be-tile-06': '/extracted_audio/sound_0418.mp3',
    'be-tile-07': '/extracted_audio/sound_0413.mp3',
    'be-tile-08': '/extracted_audio/sound_0407.mp3',
    'be-tile-09': '/extracted_audio/sound_0402.mp3',
    'be-tile-10': '/extracted_audio/sound_0398.mp3',
    'bbe-word-01': '/extracted_audio/sound_0526.mp3',
    'bbe-example': '/extracted_audio/sound_0520.mp3',
    'bbe-word-02': '/extracted_audio/sound_0532.mp3',
    'bbe-tile-01': '/extracted_audio/sound_0508.mp3',
    'bbe-tile-02': '/extracted_audio/sound_0505.mp3',
    'bbe-tile-03': '/extracted_audio/sound_0501.mp3',
    'bbe-tile-04': '/extracted_audio/sound_0498.mp3',
    'bbe-tile-05': '/extracted_audio/sound_0495.mp3',
    'bbe-tile-06': '/extracted_audio/sound_0491.mp3',
    'bbe-tile-07': '/extracted_audio/sound_0487.mp3',
    'bbe-tile-08': '/extracted_audio/sound_0483.mp3',
    'bbe-tile-09': '/extracted_audio/sound_0478.mp3',
    'bbe-tile-10': '/extracted_audio/sound_0474.mp3'
  };

  const legacyStageAudio = {
    ...extractedStageAudio,
    ...(window.LEARN_SINDHI_STAGE_AUDIO || {})
  };

  const state = {
    lessonIndex: 0,
    tileIndex: -1,
    autoplaying: false,
    autoplayToken: 0
  };

  function getCurrentLesson() {
    return stageLessons[state.lessonIndex];
  }

  function setStatus(message) {
    dom.playbackStatus.textContent = message;
  }

  function stopActiveMedia() {
    stopAudio();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function syncAutoplayButtons() {
    const label = state.autoplaying ? 'Stop auto play' : 'Auto play tiles';
    dom.autoplayBtn.textContent = label;
    dom.autoplayInlineBtn.textContent = state.autoplaying ? 'Stop' : 'Auto Play';
    dom.autoplayInlineBtn.classList.toggle('is-playing', state.autoplaying);
  }

  function stopAutoplay(statusMessage) {
    state.autoplaying = false;
    state.autoplayToken += 1;
    stopActiveMedia();
    syncAutoplayButtons();

    if (statusMessage) {
      setStatus(statusMessage);
    }
  }

  function setTileIndex(index) {
    const lesson = getCurrentLesson();
    const maxIndex = lesson.tiles.length - 1;

    if (!Number.isFinite(index) || index < 0) {
      state.tileIndex = -1;
      return;
    }

    state.tileIndex = Math.max(0, Math.min(index, maxIndex));
  }

  function getSelectedTile() {
    const lesson = getCurrentLesson();
    return state.tileIndex >= 0 ? lesson.tiles[state.tileIndex] || null : null;
  }

  function setLessonIndex(index) {
    const maxIndex = stageLessons.length - 1;
    state.lessonIndex = Math.max(0, Math.min(index, maxIndex));
    state.tileIndex = -1;
  }

  function speakText(text) {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window) || !text) {
        resolve(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.86;
      utterance.pitch = 1;
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }

  async function playToken(token, baseStatus) {
    stopActiveMedia();
    setStatus(baseStatus);

    const audioUrl = token.audioKey ? legacyStageAudio[token.audioKey] : '';
    console.log('KEY:', token.audioKey, '→ URL:', audioUrl); // ← temporary debug log
    if (audioUrl) {
      const audioPlayed = await playAudio(audioUrl);
      if (audioPlayed) {
        setStatus(`${baseStatus} Using extracted SWF audio.`);
        return;
      }
    }

    const spoken = await speakText(token.voiceText || token.roman || token.script || '');
    if (spoken) {
      setStatus(`${baseStatus} Using browser speech playback.`);
      return;
    }

    setStatus(`${baseStatus} Speech playback is unavailable in this browser.`);
  }

  function renderStage() {
    const lesson = getCurrentLesson();
    const selectedTile = getSelectedTile();
    const infoHeaderMarkup = lesson.info.header ? `
      <div class="stage-info-header">
        <span class="stage-info-script" dir="rtl">${lesson.info.header.script}</span>
        <span class="stage-info-name">(${lesson.info.header.name})</span>
      </div>
    ` : '';

    dom.title.textContent = lesson.title;
    dom.subtitle.textContent = lesson.subtitle;

    dom.infoBtn.innerHTML = `
      ${infoHeaderMarkup}
      <div class="stage-info-lines">
        ${lesson.info.lines.map((line) => `<p>${line}</p>`).join('')}
      </div>
    `;

    dom.letterBtn.innerHTML = `
      <span class="stage-main-script">${lesson.letter}</span>
      <span class="stage-main-caption">Click to hear the base letter</span>
    `;

    dom.metaBtn.innerHTML = `
      <div class="stage-meta-top">
        <span class="stage-meta-script">${lesson.letter}</span>
        <span class="stage-meta-name">${lesson.meta.roman}</span>
      </div>
      <span class="stage-meta-caption">${lesson.meta.caption}</span>
    `;

    if (lesson.words.length > 0) {
      dom.grid.classList.add('has-words-panel');
      dom.wordsPanel.hidden = false;
      dom.wordsPanel.innerHTML = `
        <div class="stage-words-list">
          ${lesson.words.map((word, index) => `
            <button class="stage-word-button" type="button" data-stage-word-index="${index}" aria-label="${word.roman}">
              <span class="stage-word-english">${word.english}</span>
              <span class="stage-word-roman">${word.roman}</span>
              <span class="stage-word-script">${word.script}</span>
            </button>
          `).join('')}
        </div>
      `;
    } else {
      dom.grid.classList.remove('has-words-panel');
      dom.wordsPanel.hidden = true;
      dom.wordsPanel.innerHTML = '';
    }

    dom.exampleBtn.innerHTML = `
      <div class="stage-example-copy">
        <span class="stage-example-roman">${lesson.example.roman}</span>
        <span class="stage-example-script">${lesson.example.script}</span>
        <span class="stage-example-english">${lesson.example.english}</span>
      </div>
      <div class="stage-example-visual" aria-hidden="true">${lesson.example.visual}</div>
    `;

    dom.tiles.innerHTML = lesson.tiles.map((tile, index) => `
      <button class="stage-tile ${index === state.tileIndex ? 'is-active' : ''}" type="button" data-stage-tile-index="${index}" aria-label="${tile.roman}">
        <span class="stage-tile-script">${tile.script}</span>
      </button>
    `).join('');

    dom.firstBtn.disabled = state.lessonIndex === 0;
    dom.backBtn.disabled = state.lessonIndex === 0;
    dom.nextBtn.disabled = state.lessonIndex === stageLessons.length - 1;
    dom.lastBtn.disabled = state.lessonIndex === stageLessons.length - 1;

    if (!state.autoplaying) {
      if (selectedTile) {
        setStatus(`Screen ${state.lessonIndex + 1} of ${stageLessons.length}. Selected tile ${state.tileIndex + 1} of ${lesson.tiles.length}: ${selectedTile.script} · ${selectedTile.roman}. Click to hear it.`);
      } else {
        setStatus(`Screen ${state.lessonIndex + 1} of ${stageLessons.length}: ${lesson.letter} · ${lesson.name}. Click any panel, word row, example, or tile to hear it.`);
      }
    }

    syncAutoplayButtons();
  }

  async function playTile(index) {
    const lesson = getCurrentLesson();
    setTileIndex(index);
    renderStage();

    const tile = getSelectedTile();
    if (!tile) {
      return;
    }

    await playToken(tile, `Playing tile ${state.tileIndex + 1} of ${lesson.tiles.length}: ${tile.script} · ${tile.roman}.`);
  }

  async function playInfo() {
    const lesson = getCurrentLesson();
    stopAutoplay();
    await playToken(lesson.info, `Playing the lesson note for ${lesson.name}.`);
  }

  async function playMainLetter() {
    const lesson = getCurrentLesson();
    stopAutoplay();
    await playToken(lesson.main, `Playing the base letter: ${lesson.name}.`);
  }

  async function playMeta() {
    const lesson = getCurrentLesson();
    stopAutoplay();
    await playToken(lesson.meta, `Playing the pronunciation panel for ${lesson.name}.`);
  }

  async function playWord(index) {
    const lesson = getCurrentLesson();
    const word = lesson.words[index];
    if (!word) {
      return;
    }

    stopAutoplay();
    await playToken(word, `Playing the word row: ${word.roman}, ${word.english}.`);
  }

  async function playExample() {
    const lesson = getCurrentLesson();
    stopAutoplay();
    await playToken(lesson.example, `Playing the example word: ${lesson.example.roman}, ${lesson.example.english}.`);
  }

  function navigateLesson(index) {
    stopAutoplay();
    setLessonIndex(index);
    renderStage();
  }

  async function toggleAutoplay() {
    const lesson = getCurrentLesson();

    if (state.autoplaying) {
      stopAutoplay('Auto play stopped. Click any tile to listen again.');
      return;
    }

    state.autoplaying = true;
    state.autoplayToken += 1;
    const currentToken = state.autoplayToken;
    syncAutoplayButtons();

    const startIndex = state.tileIndex >= 0 && state.tileIndex < lesson.tiles.length - 1 ? state.tileIndex : 0;

    for (let index = startIndex; index < lesson.tiles.length; index += 1) {
      if (!state.autoplaying || currentToken !== state.autoplayToken) {
        return;
      }

      await playTile(index);
    }

    if (currentToken !== state.autoplayToken) {
      return;
    }

    state.autoplaying = false;
    syncAutoplayButtons();
    setStatus(`Auto play finished for screen ${state.lessonIndex + 1} of ${stageLessons.length}. Click any tile to listen again.`);
  }

  dom.tiles.addEventListener('click', (event) => {
    const tileButton = event.target.closest('[data-stage-tile-index]');
    if (!tileButton) {
      return;
    }

    const index = Number(tileButton.dataset.stageTileIndex);
    void playTile(index);
  });

  dom.wordsPanel.addEventListener('click', (event) => {
    const wordButton = event.target.closest('[data-stage-word-index]');
    if (!wordButton) {
      return;
    }

    const index = Number(wordButton.dataset.stageWordIndex);
    void playWord(index);
  });

  dom.infoBtn.addEventListener('click', () => {
    void playInfo();
  });

  dom.letterBtn.addEventListener('click', () => {
    void playMainLetter();
  });

  dom.metaBtn.addEventListener('click', () => {
    void playMeta();
  });

  dom.exampleBtn.addEventListener('click', () => {
    void playExample();
  });

  dom.firstBtn.addEventListener('click', () => {
    navigateLesson(0);
  });

  dom.backBtn.addEventListener('click', () => {
    navigateLesson(state.lessonIndex - 1);
  });

  dom.nextBtn.addEventListener('click', () => {
    navigateLesson(state.lessonIndex + 1);
  });

  dom.lastBtn.addEventListener('click', () => {
    navigateLesson(stageLessons.length - 1);
  });

  dom.autoplayBtn.addEventListener('click', () => {
    void toggleAutoplay();
  });

  dom.autoplayInlineBtn.addEventListener('click', () => {
    void toggleAutoplay();
  });

  dom.openStudyBtn.addEventListener('click', () => {
    dom.studySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('beforeunload', () => {
    stopActiveMedia();
  });

  renderStage();
})();

