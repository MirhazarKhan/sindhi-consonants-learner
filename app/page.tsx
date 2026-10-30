"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Load GSAP first, then stage script, so motion upgrades are available immediately.
    const existingGsap = typeof window !== "undefined" && (window as { gsap?: unknown }).gsap;
    let gsapScript: HTMLScriptElement | null = null;

    const stageScript = document.createElement("script");
    stageScript.src = "/stage-experience.js?v=" + Date.now();
    stageScript.type = "module";

    const mountStageScript = () => {
      if (!document.body.contains(stageScript)) {
        document.body.appendChild(stageScript);
      }
    };

    if (existingGsap) {
      mountStageScript();
    } else {
      gsapScript = document.createElement("script");
      gsapScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
      gsapScript.defer = true;
      gsapScript.onload = mountStageScript;
      gsapScript.onerror = mountStageScript;
      document.head.appendChild(gsapScript);
    }
    
    return () => {
      if (document.body.contains(stageScript)) {
        document.body.removeChild(stageScript);
      }
      if (gsapScript && document.head.contains(gsapScript)) {
        document.head.removeChild(gsapScript);
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
          </p>
        </section>
      </main>

      <div class="stage-watermark" aria-hidden="true">MIRHAZAR KHAN</div>
  `;

  return (
    <div className="stage-app-shell" dangerouslySetInnerHTML={{ __html: rawHTML }} suppressHydrationWarning></div>
  );
}
