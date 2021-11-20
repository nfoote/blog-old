

import React, { useState } from 'react'
import Switch from "react-switch";
import Emoji from './emoji';

const ToggleSwitch = ({ isChecked, onThemeSwitch }) => {
  const [checked, setChecked] = useState(isChecked)
  const handleOnChange = (e) => {
      setChecked(e);
      onThemeSwitch(e);
  };
    return (
      <label htmlFor="Theme switch">
        <Switch 
          onChange={(e) => handleOnChange(e)} 
          checked={checked}
          offColor="#000000"
          onColor="#000000"
          uncheckedIcon={<Emoji symbol="🌞" label="Sun"/>} 
          checkedIcon={<Emoji symbol="🌙" label="Moon"/>} 
          height={24}
          width={52}
        />
      </label>
    );
}

export default ToggleSwitch;