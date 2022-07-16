import React, { Fragment, useRef, useState } from 'react';
import ThemeToggle from "./theme-toggle";
import { Link } from 'gatsby'


import Burger from "../components/menu/Burger/Burger"
import Menu from "../components/menu/Menu/Menu"
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const SiteHeader = props => {
    const [open, setOpen] = useState(false);
    const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));
    
return(
    <>
        <h1 className={props.className}>
            <ThemeToggle className="theme-toggle"  />
        </h1>

        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} />
        </div>
    </>
 )
}

export default SiteHeader;