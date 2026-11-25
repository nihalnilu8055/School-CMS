import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { randomBytes } from 'crypto';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Plugin } from 'vite';

const UPLOAD_MAX = 8 * 1024 * 1024;
const ALLOWED = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx',
]);

type MultipartPart = {
  name: string;
  filename: string;
  content: Buffer;
};

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseMultipart(buffer: Buffer, boundary: string): MultipartPart[] {
  const parts: MultipartPart[] = [];
  const delim = Buffer.from(`--${boundary}`);
  let start = buffer.indexOf(delim) + delim.length;
  while (start < buffer.length) {
    if (buffer[start] === 45 && buffer[start + 1] === 45) break;
    if (buffer[start] === 13 && buffer[start + 1] === 10) start += 2;
    const next = buffer.indexOf(delim, start);
    if (next < 0) break;
    const part = buffer.subarray(start, next - 2);
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd >= 0) {
      const headers = part.subarray(0, headerEnd).toString('utf8');
      const content = part.subarray(headerEnd + 4);
      const nameMatch = /name="([^"]+)"/.exec(headers);
      const fileMatch = /filename="([^"]*)"/.exec(headers);
      parts.push({
        name: nameMatch?.[1] || '',
        filename: fileMatch?.[1] || '',
        content,
      });
    }
    start = next + delim.length;
  }
  return parts;
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

async function handleUpload(req: IncomingMessage, res: ServerResponse, uploadsDir: string) {
  const contentType = req.headers['content-type'] || '';
  const boundaryMatch = /boundary=(.+)$/i.exec(contentType);
  if (!boundaryMatch) {
    return sendJson(res, 400, { message: 'Expected multipart form data' });
  }
  const raw = await readBody(req);
  if (raw.length > UPLOAD_MAX + 64 * 1024) {
    return sendJson(res, 400, { message: 'File too large (max 8 MB)' });
  }
  const parts = parseMultipart(raw, boundaryMatch[1].trim());
  const filePart = parts.find((part) => part.name === 'file' && part.filename);
  if (!filePart) {
    return sendJson(res, 400, { message: 'No file uploaded' });
  }
  const ext = extname(filePart.filename).toLowerCase() || '.jpg';
  if (!ALLOWED.has(ext)) {
    return sendJson(res, 400, { message: 'File type not allowed' });
  }
  const filename = `${Date.now()}-${randomBytes(4).toString('hex')}${ext}`;
  writeFileSync(join(uploadsDir, filename), filePart.content);
  return sendJson(res, 200, {
    success: true,
    file_url: `/uploads/${filename}`,
    filename,
    original_name: filePart.filename,
    size: filePart.content.length,
  });
}

/** Local Vite middleware for activity photo uploads and folder JSON. */
export function viteCmsApi(): Plugin {
  return {
    name: 'vite-cms-api',
    configureServer(server) {
      const root = server.config.root;
      const uploadsDir = join(root, 'public', 'uploads');
      const dataDir = join(root, 'public', 'data');
      const foldersFile = join(dataDir, 'activity-folders.json');
      mkdirSync(uploadsDir, { recursive: true });
      mkdirSync(dataDir, { recursive: true });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';

        try {
          if ((url === '/api/admin/upload' || url === '/api/upload.php') && req.method === 'POST') {
            return await handleUpload(req, res, uploadsDir);
          }

          if (
            (url === '/api/public/activity-folders' || url === '/api/activity-folders.php') &&
            req.method === 'GET'
          ) {
            if (!existsSync(foldersFile)) return sendJson(res, 200, []);
            try {
              const parsed = JSON.parse(readFileSync(foldersFile, 'utf8'));
              return sendJson(res, 200, Array.isArray(parsed) ? parsed : []);
            } catch {
              return sendJson(res, 200, []);
            }
          }

          if (
            (
              url === '/api/admin/activity-folders' ||
              url === '/api/public/activity-folders' ||
              url === '/api/activity-folders.php'
            ) &&
            (req.method === 'POST' || req.method === 'PUT')
          ) {
            const raw = await readBody(req);
            const parsed = JSON.parse(raw.toString('utf8') || 'null');
            if (!Array.isArray(parsed)) {
              return sendJson(res, 400, { message: 'Invalid JSON body' });
            }
            writeFileSync(foldersFile, JSON.stringify(parsed, null, 2));
            return sendJson(res, 200, { success: true, count: parsed.length });
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'CMS API failed';
          return sendJson(res, 500, { message });
        }

        return next();
      });
    },
  };
}
