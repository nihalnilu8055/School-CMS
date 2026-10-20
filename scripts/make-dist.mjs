import { build } from 'vite';
import { writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from 'fs';
import { dirname, join } from 'path';

const log = (msg) => {
  console.log(msg);
  writeFileSync('scripts/build-status.txt', `${msg}\n`, { flag: 'a' });
};

try {
  writeFileSync('scripts/build-status.txt', 'START\n');
  if (existsSync('dist')) rmSync('dist', { recursive: true, force: true });
  mkdirSync('dist', { recursive: true });
  cpSync('public', 'dist', { recursive: true });
  log('public copied');

  const r = await build({
    logLevel: 'info',
    build: { write: false, reportCompressedSize: false },
  });
  log('vite build returned');

  const outputs = Array.isArray(r) ? r : [r];
  for (const o of outputs) {
    for (const f of o.output || []) {
      const full = join('dist', f.fileName);
      mkdirSync(dirname(full), { recursive: true });
      if (f.type === 'chunk') {
        writeFileSync(full, f.code);
        log(`chunk ${f.fileName} ${f.code.length}`);
      } else {
        const data = typeof f.source === 'string' ? f.source : Buffer.from(f.source);
        writeFileSync(full, data);
        log(`asset ${f.fileName} ${data.length}`);
      }
    }
  }
  log('BUILD_OK');
} catch (err) {
  log(`ERROR ${err?.stack || err}`);
  process.exit(1);
}
