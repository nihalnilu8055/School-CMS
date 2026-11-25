import { ActivityFolder } from '../types';

export async function fetchPublicContent() {
  try {
    const response = await fetch('/api/public/content');
    const type = response.headers.get('content-type') || '';
    if (!response.ok || !type.includes('application/json')) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function fetchActivityFolders(): Promise<ActivityFolder[] | null> {
  // Prefer live APIs, then the static JSON shipped with the site (Vercel/cPanel).
  const endpoints = [
    '/api/public/activity-folders',
    '/api/activity-folders.php',
    '/data/activity-folders.json',
  ];
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: 'no-store' });
      const type = response.headers.get('content-type') || '';
      if (!response.ok || !type.includes('application/json')) continue;
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) return data as ActivityFolder[];
    } catch {
      /* try next */
    }
  }
  return null;
}

export async function saveActivityFolders(folders: ActivityFolder[]): Promise<boolean> {
  const endpoints = ['/api/admin/activity-folders', '/api/activity-folders.php'];
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folders),
      });
      const type = response.headers.get('content-type') || '';
      if (!response.ok || !type.includes('application/json')) continue;
      const data = await response.json();
      if (data?.success) return true;
    } catch {
      /* try next */
    }
  }
  return false;
}
