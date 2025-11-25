export async function handler() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
      client_id,
      client_secret
    })
  });

  const tokenData = await tokenResponse.json();
  const access_token = tokenData.access_token;

  // Fetch currently playing track
  const nowPlayingResponse = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

  if (nowPlayingResponse.status === 204) {
    return {
      statusCode: 200,
      body: JSON.stringify({ playing: false })
    };
  }

  const data = await nowPlayingResponse.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      playing: true,
      title: data.item?.name,
      artist: data.item?.artists?.map(a => a.name).join(", "),
      albumArt: data.item?.album?.images?.[0]?.url
    })
  };
}
