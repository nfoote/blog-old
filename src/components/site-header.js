import React from "react";
import ThemeToggle from "./theme-toggle";
import { Link } from 'gatsby'


const SiteHeader = props => {
return(
    <>
        <h1 className={props.className}>
            <Link to="/">{props.title}</Link>
        </h1>

        <ThemeToggle  />
    </>
 )
}

export default SiteHeader;