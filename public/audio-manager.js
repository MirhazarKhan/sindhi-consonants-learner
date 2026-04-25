    // audio-manager.js
// Shared audio playback manager for Sindhi language learning app

let activeAudio = null;

/**
 * Play an audio file from a URL
 * @param {string} url - The audio file URL to play
 * @returns {Promise<boolean>} - Resolves to true if played successfully, false otherwise
 */
export function playAudio(url) {
    return new Promise((resolve) => {
        // Kill any currently playing audio first
        if (activeAudio) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
            activeAudio = null;
        }

        const audio = new Audio(url);
        activeAudio = audio;

        const finish = (success) => {
            if (activeAudio === audio) {
                activeAudio = null;
            }
            resolve(success);
        };

        audio.addEventListener('ended', () => finish(true), { once: true });
        audio.addEventListener('error', () => finish(false), { once: true });
        audio.play().catch(() => finish(false));
    });
}

/**
 * Stop any currently playing audio
 */
export function stopAudio() {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
    }
}

/**
 * Check if audio is currently playing
 * @returns {boolean}
 */
export function isPlaying() {
    return activeAudio !== null;
}
