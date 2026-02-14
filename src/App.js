import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from "./Components/SearchBar/SearchBar";
import Playlist from './Components/Playlist/Playlist';
import SearchList from './Components/Searchlist/Searchlist';
import Login from "./Components/Login/Login";


function App() {
  // states
  const [saving, setSaving] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [expiry, setExpiry] = useState()
  const [token, setToken] = useState("")
  const [playlistName, setPlaylistName] = useState("")
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // getting token
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.href);
    const expiryTime = queryParams.get("expires_in")
    let hash = window.location.hash
    if (hash) {
      let token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      setToken(token)
      setExpiry(expiryTime)
    }

    if (expiryTime) {
      setTimeout(() => { setExpiry(0); window.location.hash = "" }, expiryTime * 1000)
    }
    // console.log(token)
    // console.log(expiryTime)
  }, [])
  // song search
  const search = async () => {
    let searchEndpoint = `https://api.spotify.com/v1/search?q=${searchInput}&type=track`
    const response = await fetch(searchEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const jsonResponse = await response.json();
   
    setSearchResults(jsonResponse.tracks.items.slice(0,10))
  }
  // token access
  const getRandomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"
    for (let i = 0; i <= length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }
  let url = "https://accounts.spotify.com/authorize"
  const client_id = "abe8d36909674f07a5ef4e8bc1de4c34";
  const redirect_uri = "http://localhost:3000";
  const state = getRandomString(16);
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);
  url += "&scope=playlist-modify-private playlist-modify-public"
  // handlers
  const handleChange = (event) => {
    setPlaylistName(event.target.value)
  }
  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const addedTracks = [];
    for (const track of playlistTracks) {
      addedTracks.push(track.uri)
    }
    const savedName = playlistName;
    // user ID
    const userIdEndpoint = "https://api.spotify.com/v1/me";
    const userResponse = await fetch(userIdEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const jsonUserResponse = await userResponse.json();
    const userId = jsonUserResponse.id;

    // making playlist
    const playlistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const playlistPost = await fetch(playlistEndpoint, {
      method: "POST", body: JSON.stringify({ name: savedName, description: "", public: false }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    // playlist ID
    const jsonPlaylistPost = await playlistPost.json();
    const jsonPlaylistPostId = jsonPlaylistPost.id;
    // adding songs to playlist 
    setSaving(true)
    const playlistAddEndpoint = `https://api.spotify.com/v1/playlists/${jsonPlaylistPostId}/tracks`;
    try {
      const playlistAdd = await fetch(playlistAddEndpoint, {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uris: addedTracks,
          position: 0
        }),
      })
    }
    catch (e) {
      console.log(e)
    }
    setSaving(false)
    // console.log(await playlistAdd.json())
    setPlaylistTracks([])
    setPlaylistName("")

  }


  function addTrack(track) {
    if (playlistTracks.find(song => song.id === track.id)) {
      return
    }
    else {
      setPlaylistTracks(oldData => [...oldData, track]);
    }
  }
  const removeTrack = (targetIndex) => {
    setPlaylistTracks(prev => prev.filter((item, index) => index !== targetIndex))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Login token={token} url={url} expiry={expiry} />
        <SearchBar search={search} searchInput={searchInput} onChange={handleSearch} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", columnGap: 200 }}>
          <SearchList searchResults={searchResults} onAdd={addTrack} />
          <Playlist saving={saving} playlistTracks={playlistTracks} onRemove={removeTrack} onChange={handleChange} onSubmit={handleSubmit} playlistName={playlistName} />
        </div>
      </header>
    </div>
  );
}

export default App;
