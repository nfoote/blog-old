import React, { useRef, useState, Fragment } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import Burger from "../components/menu/Burger/Burger"
import Menu from "../components/menu/Menu/Menu"
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import ToggleSwitch from './toggle-switch';

const SiteHeader = props => {
  const [open, setOpen] = useState(false);
  const node = useRef(); 
  useOnClickOutside(node, () => setOpen(false));

  return (
    <>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <h1 className={props.className}>
          <ToggleSwitch
              onThemeSwitch={e => toggleTheme(e ? 'dark' : 'light')} 
              isChecked={theme === 'dark'} 
          />
          </h1>
        )}
      </ThemeToggler>
      <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} />
      </div>
    </>
  )
}

export default SiteHeader;