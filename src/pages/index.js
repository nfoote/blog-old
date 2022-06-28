import React from 'react';
import { graphql } from "gatsby"
import loadable from '@loadable/component'

const FrontPageContent = loadable(() => import('../components/front-page-content'), {
  fallback: <div>Loading...</div>,
})
const FrontPage = ({ blogPost }) => {
  return (
    <div>
      <FrontPageContent blogPost={blogPost} />
    </div>
  )
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