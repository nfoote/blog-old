import React from "react";
import Layout from "./src/components/layout";
import { createGlobalStyle } from "styled-components"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

const GlobalStyle = createGlobalStyle``

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <GlobalStyle />

  return <Layout {...props}>{element}</Layout>
}

