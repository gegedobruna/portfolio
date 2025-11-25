export default async function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    return res.status(500).json({ error: 'Missing Spotify credentials' });
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
        client_id,
        client_secret
      })
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    if (!access_token) {
      return res.status(500).json({ error: 'Unable to refresh Spotify token' });
    }

    const nowPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (nowPlayingResponse.status === 204) {
      return res.status(200).json({ playing: false });
    }

    if (!nowPlayingResponse.ok) {
      const errText = await nowPlayingResponse.text();
      return res.status(nowPlayingResponse.status).json({ error: errText || 'Spotify API error' });
    }

    const data = await nowPlayingResponse.json();

    return res.status(200).json({
      playing: true,
      title: data.item?.name,
      artist: data.item?.artists?.map(a => a.name).join(', '),
      albumArt: data.item?.album?.images?.[0]?.url
    });
  } catch (error) {
    console.error('Spotify now-playing failed:', error);
    return res.status(500).json({ error: 'Unable to load Spotify' });
  }
}
