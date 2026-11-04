import { build } from 'vite';
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const outDir = join(process.cwd(), 'dist');
const zipProject = join(process.cwd(), 'website-for-cpanel.zip');
const zipDesktop = 'C:\\Users\\Anju\\Desktop\\website-for-cpanel.zip';
const logPath = join(process.cwd(), 'scripts', 'pack-cpanel-log.txt');
const log = (msg) => {
  console.log(msg);
  writeFileSync(logPath, `${msg}\n`, { flag: 'a' });
};

writeFileSync(logPath, 'START\n');

try {
  const r = await build({
    logLevel: 'info',
    build: {
      write: false,
      emptyOutDir: false,
      reportCompressedSize: false,
    },
  });
  log('vite ok');

  // Clear/create dist via cmd (more reliable than rmSync on Windows locks)
  execSync('cmd /c "if exist dist rmdir /s /q dist & mkdir dist"', { stdio: 'inherit' });
  execSync('cmd /c "xcopy public dist /E /I /Y /Q"', { stdio: 'inherit' });
  log('public copied');

  const outputs = Array.isArray(r) ? r : [r];
  for (const o of outputs) {
    for (const f of o.output || []) {
      const full = join(outDir, f.fileName);
      mkdirSync(dirname(full), { recursive: true });
      if (f.type === 'chunk') {
        writeFileSync(full, f.code);
        log(`chunk ${f.fileName}`);
      } else {
        const data = typeof f.source === 'string' ? f.source : Buffer.from(f.source);
        writeFileSync(full, data);
        log(`asset ${f.fileName}`);
      }
    }
  }

  writeFileSync(
    join(outDir, '.htaccess'),
    `RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
`
  );
  log('htaccess written');

  if (existsSync(zipProject)) rmSync(zipProject, { force: true });
  if (existsSync(zipDesktop)) rmSync(zipDesktop, { force: true });

  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path (Join-Path '${outDir.replace(/\\/g, '/')}' '*') -DestinationPath '${zipProject.replace(/\\/g, '/')}' -Force; Copy-Item '${zipProject.replace(/\\/g, '/')}' '${zipDesktop.replace(/\\/g, '/')}' -Force"`,
    { stdio: 'inherit' }
  );
  log('ZIP_OK');
} catch (err) {
  log(`ERROR ${err?.stack || err}`);
  process.exit(1);
}
