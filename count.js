const fs = require("fs");
const s = fs.readFileSync("public/stage-experience.js", "utf-8");
const m = s.match(/const baseExtractedStageAudio = \{([\s\S]*?)\};/);
if (m) {
    const lines = m[1].split("\n").filter(l => l.includes(":"));
    console.log(lines.length);
}
const m2 = s.match(/Object\.assign\(baseExtractedStageAudio, \{([\s\S]*?)\}\);/);
if (m2) {
    const lines2 = m2[1].split("\n").filter(l => l.includes(":"));
    console.log(lines2.length);
}
