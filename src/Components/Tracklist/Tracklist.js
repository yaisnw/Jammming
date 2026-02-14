import React from "react";
import Track from "../Track/Track";

function Tracklist({Tracks, onAdd, onRemove}) {

    
    return (
        <div>
            {Tracks.map((track, index) =>
            <Track 
            key={track.id}
            results={Tracks}
            track={track}
            index={index}
            onAdd={onAdd}
            onRemove={onRemove}
             />)}
        </div>
    )
}

export default Tracklist;