import React, {useState} from "react";
import Tracklist from "../Tracklist/Tracklist";
import Styles from "../Searchlist/Searchlist.module.css"

function SearchList({searchResults, onAdd}) {
    
    return (
        <div className={Styles.div}>
            <h2 className={Styles.header}>Results</h2>
            <Tracklist  Tracks={searchResults} onAdd={onAdd} />
            
        </div>
    )

}
export default SearchList;