import React, { useState, useRef } from 'react';
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay';
import { Loader } from '../components/loader';
import Burger from "../components/menu/Burger/Burger"
import Menu from "../components/menu/Menu/Menu"
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const FrontPageContent = loadable(() => pMinDelay(import('../components/front-page-content'), 1500), {
  fallback: <Loader />,
})
const FrontPage = ({ blogPost }) => {
  return <FrontPageContent blogPost={blogPost} />
}

const Index = ({ data }) => {
  const [open, setOpen] = useState(false);
  const node = useRef(); 

  useOnClickOutside(node, () => setOpen(false));

  const recentPost = data.allMarkdownRemark?.nodes[0];
  return(
    <>
    <FrontPage blogPost={recentPost} />
    <div ref={node}>
      <Burger open={open} setOpen={setOpen} />
      <Menu open={open} />
    </div>
    </>
  )
}

export default Index

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
}
`