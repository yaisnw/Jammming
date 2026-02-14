import React, {useState} from "react";
import Tracklist from "../Tracklist/Tracklist";
import Styles from "../Playlist/Playlist.module.css"

function Playlist({playlistTracks, onRemove, onSubmit, onChange, playlistName, saving}) {
    
   
    return (
        <form className={Styles.form} onSubmit={onSubmit}>
            <input className={Styles.playlistName} value={playlistName} onChange={onChange} type="text"></input>
            {saving ? <p>Saving...</p> : null}
            {!saving ? <Tracklist  Tracks={playlistTracks} onRemove={onRemove} /> : null}
            <button>Save to spotify</button>
        </form>
    )
}

export default Playlist;