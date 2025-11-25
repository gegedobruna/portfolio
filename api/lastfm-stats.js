export default async function handler(req, res) {
  const apiKey = process.env.LASTFM_KEY;
  const username = process.env.LASTFM_USER;

  if (!apiKey || !username) {
    return res.status(500).json({ error: 'Missing Last.fm credentials' });
  }

  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.searchParams.set('method', 'user.getinfo');
    url.searchParams.set('user', username);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('format', 'json');

    const response = await fetch(url.toString(), { cache: 'no-store' });
    const text = await response.text();

    if (!response.ok) {
      const message = safeParse(text)?.message || `Last.fm returned ${response.status}`;
      throw new Error(message);
    }

    const data = safeParse(text);
    const playcount = Number(data?.user?.playcount || 0);

    return res.status(200).json({ playcount });
  } catch (error) {
    console.error('Last.fm fetch failed:', error);
    return res.status(500).json({ error: 'Unable to fetch Last.fm stats' });
  }
}

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
