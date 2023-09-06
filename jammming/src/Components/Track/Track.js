import React from "react";
import Styles from "./Track.module.css"

function Track({track, onAdd, onRemove, index}) {
    
    

    return (
            <div className={Styles.flexbox}>
                <div className={Styles.songInfo} >
                    <h3 className={Styles.songName} >{track.name}</h3>
                    <p className={Styles.songAlbum}>{track.artist} | {track.album}</p>
                </div>
                <div className={Styles.buttonHolder}>
                {onAdd ? <button className={Styles.button} onClick={()=> onAdd(track)} >+</button> 
                : <button style={{padding: "1px 8px",}} className={Styles.button} onClick={()=> onRemove(index)} >-</button> }
                </div>
            </div>
    )
}

export default Track;