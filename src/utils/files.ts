export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function describeFileType(file: File): string {
  const name = file.name.toLowerCase();
  if (file.type.includes('pdf') || name.endsWith('.pdf')) return 'PDF Document';
  if (name.endsWith('.doc') || name.endsWith('.docx')) return 'Word Document';
  if (name.endsWith('.xls') || name.endsWith('.xlsx')) return 'Spreadsheet';
  if (file.type.startsWith('image/')) return 'Image';
  if (file.type.startsWith('video/')) return 'Video';
  return file.type || 'File';
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function isImageSrc(value: string): boolean {
  return value.startsWith('data:image/') || /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(value);
}
