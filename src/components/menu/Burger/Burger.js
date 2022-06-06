import React from 'react';

const Burger = ({open, setOpen}) => {
  return (
    <button open={open} onClick={() => setOpen(!open)} className="burger">
      <div />
      <div />
      <div />
    </button>
  )
}

export default Burger;