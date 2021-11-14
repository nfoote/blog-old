import React from 'react';

const baseStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 15,
    color: "orange",
    paddingRight: 2
}

const Emoji = props => (
    <span
      style={props.style || baseStyle}
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>);
export default Emoji;