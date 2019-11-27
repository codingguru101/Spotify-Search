import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const accessToken =
  "BQCK37KkaHSSIbaamOL1g4fkDoENLx6jJaGirq_kKlQlk9ex0UgwNs01zZBmkw4MXavh5SZEA1mrKe3Lz6M4ylmSBXuSei-i5e872_mJi7oos9qXg8njKzF8F7s95yHKDDBoKKJSiAzWn_R1ZOYKJrCd3o3uDHY";
function App() {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchArtist();
  }, []);

  function fetchArtist() {
    let url = `https://api.spotify.com/v1/search?query=${query}&type=artist&offset=0&limit=20`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then(data => setArtists(data.artists.items));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchArtist();
  }

  return (
    <div className="min-h-screen bg-green-400 px-10 flex justify-center items-center flex-col">
      <h1 className="text-5x1 mb-10">Searching Spotify!</h1>
      {/* show the search results */}
      <form className="mb-10 flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 rounded shadow lg w-full"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-blue-100 py-2 px-8 rounded shadow lg ">
          Search
        </button>
      </form>
      {/* show the search results */}
      <div className="flex flex-wrap">
        {artists.map((artist, index) => {
          const img = artist.images[0];

          return (
            <div className="w-1/3 mb-10 text-center p-3" key={index}>
              <h3>{artist.name}</h3>
              {img ? (
                <img
                  className="rounded mb-3"
                  src={img.url}
                  alt=""
                  width="200"
                />
              ) : (
                <img
                  className="rounded mb-3 mx-auto"
                  src="https://placekitten.com/g/200/200"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
