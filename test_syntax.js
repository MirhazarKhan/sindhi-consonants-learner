const fs = require('fs');
try {
  eval(fs.readFileSync('public/stage-experience.js', 'utf-8'));
} catch (e) {
  console.error(e);
}
