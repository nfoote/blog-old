import React from 'react';
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay';

const FrontPageContent = loadable(() => pMinDelay(import('../components/front-page-content'), 1000), {
  fallback: <div>Loading...</div>,
})
const FrontPage = ({ blogPost }) => {
  return <FrontPageContent blogPost={blogPost} />
}

const Index = ({ data }) => {
    const recentPost = data.allMarkdownRemark.nodes[0];
    return(
      <FrontPage blogPost={recentPost} />
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