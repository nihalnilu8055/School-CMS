import { describeFileType, formatFileSize } from './files';

const MAX_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1600;
const JPEG_QUALITY = 0.82;

export type UploadedMediaMeta = {
  name: string;
  size: string;
  type: string;
};

async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.type.includes('svg')) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  );
  if (!blob) return file;

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
}

async function postUpload(url: string, file: File): Promise<string | null> {
  const body = new FormData();
  body.append('file', file);
  const response = await fetch(url, { method: 'POST', body });
  if (!response.ok) return null;
  const type = response.headers.get('content-type') || '';
  if (!type.includes('application/json')) return null;
  const data = await response.json();
  return data.file_url || data.url || null;
}

/** Upload a media file to the CMS server and return a durable public URL. */
export async function uploadMediaFile(file: File): Promise<{ url: string; meta: UploadedMediaMeta }> {
  if (file.size > MAX_BYTES) {
    throw new Error('Please choose a file under 8 MB.');
  }

  const prepared = file.type.startsWith('image/') ? await compressImageFile(file) : file;
  const endpoints = ['/api/admin/upload', '/api/upload.php'];

  for (const endpoint of endpoints) {
    try {
      const url = await postUpload(endpoint, prepared);
      if (url) {
        return {
          url,
          meta: {
            name: file.name,
            size: formatFileSize(prepared.size),
            type: describeFileType(file),
          },
        };
      }
    } catch {
      /* try next endpoint */
    }
  }

  throw new Error(
    'Could not upload to the server. Start the CMS API (or use cPanel PHP upload) and try again.'
  );
}
