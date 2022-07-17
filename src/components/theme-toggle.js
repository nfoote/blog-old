import React from "react";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import ToggleSwitch from './toggle-switch';

const ThemeToggle = () => {
  return (
    <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <ToggleSwitch
            onThemeSwitch={e => toggleTheme(e ? 'dark' : 'light')} 
            isChecked={theme === 'dark'} 
          />
        )}
    </ThemeToggler>
  )
}

export default ThemeToggle
