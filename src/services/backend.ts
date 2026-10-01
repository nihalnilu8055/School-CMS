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
