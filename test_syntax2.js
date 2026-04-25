import * as esbuild from 'esbuild';

try {
const code = esbuild.buildSync({
  entryPoints: ['public/stage-experience.js'],
  bundle: true,
  write: false,
  format: 'iife'
});
console.log('built successfully');
} catch (e) {
  console.log(e);
}
