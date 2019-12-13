export default function() {
  let token = window.location.hash.substr(1);
  if (token) {
    const o = Object.fromEntries(new URLSearchParams(token));
    return o.access_token;
  } else {
    // If there is no token, redirect to Spotify authorization
    redirectToSpotifyAuthentication();
  }
}

function redirectToSpotifyAuthentication() {
  const authEndpoint = "http://accounts.spotify.com/authorize";
  const clientId = "fa34eb52c4c24e789156d20d1883e163";
  const redirectUri = `${window.location.protocol}//${window.location.host}/`;
  let query = `client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
  window.location = `${authEndpoint}?${query}`;
}
