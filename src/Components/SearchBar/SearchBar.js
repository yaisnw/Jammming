import React, {useState} from "react";
import Styles from "../SearchBar/SearchBar.module.css"

function SearchBar({onChange, searchInput, search}) {

    return (
        <form className={Styles.bar} onSubmit={search}>
            <input value={searchInput} onChange={onChange} placeholder="Search for music" type="text" />
            <button >Search</button>
        </form>
    )
}
export default SearchBar;