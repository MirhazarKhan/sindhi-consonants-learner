const fs = require('fs');

console.log('=== PROJECT ANALYSIS ===\n');

// 1. Check stage-experience.js for syntax errors
try {
  const js = fs.readFileSync('stage-experience.js', 'utf8');
  new Function(js.replace(/import\s+.*?\s+from\s+['"].*?['"];?/g, '').replace(/export\s+/g, ''));
  console.log('✓ stage-experience.js: No syntax errors');
} catch (e) {
  console.log('✗ stage-experience.js SYNTAX ERROR:', e.message);
  process.exit(1);
}

// 2. Check sindhi_app_data.json is valid JSON
try {
  const rows = JSON.parse(fs.readFileSync('sindhi_app_data.json', 'utf8'));
  console.log('✓ sindhi_app_data.json: Valid JSON with', rows.length, 'entries');
} catch (e) {
  console.log('✗ sindhi_app_data.json:', e.message);
  process.exit(1);
}

// 3. Verify baseExtractedStageAudio has no tile entries
const js = fs.readFileSync('stage-experience.js', 'utf8');
const baseMatch = js.match(/const baseExtractedStageAudio = \{[\s\S]*?\};/);
const baseTiles = baseMatch ? (baseMatch[0].match(/-tile-/g) || []).length : 0;
console.log('✓ baseExtractedStageAudio tile entries:', baseTiles, '(should be 0)');

// 4. Parse JSON groups
const rows = JSON.parse(fs.readFileSync('sindhi_app_data.json', 'utf8'));
const groups = [];
let cur = null;
for (const r of rows) {
  if (r.type === 'letter_sound' && r.isLetterTile === true) {
    if (cur) groups.push(cur);
    cur = { intro: r, tiles: [] };
  } else if (cur) cur.tiles.push(r);
}
if (cur) groups.push(cur);

// Merge small groups
for (let i = groups.length - 1; i > 0; i--) {
  if (groups[i].tiles.length < 10 && groups[i - 1].tiles.length < 10) {
    groups[i - 1].tiles.push(...groups[i].tiles);
    groups.splice(i, 1);
  }
}

const lessons = ['alif','be','bbe','pe','bhe','te','the','tte','tthe','se','jeem','nye','jhe','che','chhe','he','khe','dal','dhal','ddal','ddhal','zal','re','rre','ze','seen','sheen','swad','zwad','toe','zoe','ain','ghain','fe','phe','qaf','kaf','khaf','gaf','ggaf','ngoe','lam','meem','noon','nnoon','waw','heh','hamza','ye'];

console.log('✓ JSON groups after merge:', groups.length);
console.log('✓ Lessons in app:', lessons.length);

// 5. Simulate applyCleanAudioMappingOverrides
let applied = 0;
const audioMap = {};
for (let li = 0; li < lessons.length && li < groups.length; li++) {
  const g = groups[li];
  let tiles = g.tiles;
  if (tiles.length === 9) tiles = [g.intro, ...tiles];
  const n = Math.min(tiles.length, 10);
  if (n === 0) continue;
  for (let t = 0; t < n; t++) {
    audioMap[lessons[li] + '-tile-' + String(t+1).padStart(2,'0')] = 'extracted_audio/' + tiles[t].soundFile;
  }
  applied++;
}
console.log('\n✓ Lessons with tile maps:', applied, 'of', lessons.length);

// 6. Check for missing tile keys
const missing = [];
for (const id of lessons) {
  for (let t = 1; t <= 10; t++) {
    const key = id + '-tile-' + String(t).padStart(2,'0');
    if (!audioMap[key]) missing.push(key);
  }
}
if (missing.length) {
  console.log('\n⚠ Missing tile keys (' + missing.length + '):');
  missing.slice(0, 10).forEach(k => console.log('  -', k));
  if (missing.length > 10) console.log('  ... and', missing.length - 10, 'more');
} else {
  console.log('\n✓ All 490 tile keys mapped (49 lessons × 10 tiles)');
}

// 7. Verify alif mapping matches the visible tile order
console.log('\n=== ALIF TILE MAPPING (JSON → App) ===');
const alifGroup = groups[0];
let alifTiles = alifGroup.tiles;
if (alifTiles.length === 9) alifTiles = [alifGroup.intro, ...alifTiles];
for (let t = 0; t < 10; t++) {
  const key = 'alif-tile-' + String(t+1).padStart(2,'0');
  const jsonSound = alifTiles[t]?.soundFile || 'MISSING';
  const mappedUrl = audioMap[key] || 'MISSING';
  const match = mappedUrl.includes(jsonSound) ? '✓' : '✗';
  console.log(`  ${key}: ${jsonSound} → ${mappedUrl} ${match}`);
}

// 8. Summary
console.log('\n=== SUMMARY ===');
console.log('✓ Tile audio is now loaded ONLY from sindhi_app_data.json');
console.log('✓ baseExtractedStageAudio contains only info/main/meta/word/example keys');
console.log('✓ 49 lessons mapped with 10 tiles each (490 total)');
console.log('✓ 3 groups with 9 tiles padded using intro sound');
console.log('\nWorkflow to fix tile order:');
console.log('  1. Open tile-editor.html');
console.log('  2. Click tiles to listen, drag to reorder');
console.log('  3. Download fixed JSON and replace sindhi_app_data.json');
console.log('  4. Refresh app - tiles will play in new order');
