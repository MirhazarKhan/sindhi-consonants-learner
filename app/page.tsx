"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Load the vanilla JS only after React hydration is complete
    // so that React doesn't wipe out the DOM mutations.
    const script = document.createElement("script");
    script.src = "/stage-experience.js?v=" + Date.now();
    script.type = "module";
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const rawHTML = `
      <div class="stage-ambient-orb stage-ambient-orb-a" aria-hidden="true"></div>
      <div class="stage-ambient-orb stage-ambient-orb-b" aria-hidden="true"></div>

      <main id="stageExperience" class="stage-experience">
        <section id="stageSceneCard" class="stage-scene-card">
          <div class="stage-scene-frame">
            <div id="stageGrid" class="stage-grid" dir="rtl">
              <button id="stageInfoBtn" class="stage-panel stage-info-panel" type="button"></button>
              <button id="stageLetterBtn" class="stage-panel stage-letter-panel" type="button"></button>
              <button id="stageMetaBtn" class="stage-panel stage-meta-panel" type="button"></button>
              <div id="stageWordsPanel" class="stage-panel stage-words-panel" hidden></div>
              <button id="stageExampleBtn" class="stage-panel stage-example-panel" type="button"></button>
            </div>

            <div id="stageBottomDock" class="stage-bottom-dock">
              <p id="stageTileLabel" class="stage-tile-section-label">Sound tiles</p>
              <div id="stageTiles" class="stage-tile-row" dir="rtl" aria-live="polite"></div>
              <div id="stageTileProgress" class="stage-tile-progress" aria-hidden="true"></div>

              <div class="stage-controls">
                <button id="stageFirstBtn" class="stage-control" type="button">« First</button>
                <button id="stageBackBtn" class="stage-control" type="button">‹ Back</button>
                <button id="stageAutoplayInlineBtn" class="stage-control stage-control-accent" type="button">▶ Full Lesson</button>
                <button id="stageNextBtn" class="stage-control" type="button">Next ›</button>
                <button id="stageLastBtn" class="stage-control" type="button">Last »</button>
              </div>
            </div>
          </div>
        </section>

        <section class="stage-lesson-nav">
          <span class="stage-hud-label">Jump to letter</span>
          <div id="stageLessonRail" class="stage-lesson-rail" aria-label="Mapped consonant lessons"></div>
          <p class="stage-shortcut-hint">
            <span class="stage-kbd">←</span> <span class="stage-kbd">→</span> letters ·
            <span class="stage-kbd">↑</span> <span class="stage-kbd">↓</span> tiles ·
            <span class="stage-kbd">Space</span> full lesson ·
            <span class="stage-kbd">Esc</span> stop ·
            <span class="stage-kbd">1</span>–<span class="stage-kbd">0</span> jump tile
            &nbsp; | &nbsp;
            <a href="/audio-mapper.html" style="color:#8a74ff; text-decoration: underline;">Open Audio Mapper</a>
          </p>
        </section>
      </main>
  `;

  return (
    <div className="stage-app-shell" dangerouslySetInnerHTML={{ __html: rawHTML }} suppressHydrationWarning></div>
  );
}
