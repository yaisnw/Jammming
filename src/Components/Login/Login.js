import React from "react";
import Styles from "../Login/Login.module.css"

export default function Login({url, expiry}) {
    return (
        <div className={Styles.div}>
            {expiry > 0 ? <p className={Styles.logged}>Logged in</p> : <a className={Styles.link} href={url}>Login to spotify</a>}
        </div>
    )
}