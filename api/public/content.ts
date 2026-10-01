import { fetchPublicContent } from '../server/publicContent';

export default async function handler(_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) {
  try {
    const data = await fetchPublicContent();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'Unable to load public content' });
  }
}
