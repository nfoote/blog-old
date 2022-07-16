import React from 'react';
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay';
import { Loader } from '../components/loader';

const FrontPageContent = loadable(() => pMinDelay(import('../components/front-page-content'), 1500), {
  fallback: <Loader />,
})

const Index = ({ data, location }) => {
  const recentPost = data.allMarkdownRemark?.nodes[0];
  return <FrontPageContent blogPost={recentPost} location={location} />
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