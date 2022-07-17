import React from 'react';
import { graphql } from "gatsby"
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay';
import { Loader } from '../components/loader';
import Layout from "../components/layout"
import FrontPageContent from '../components/front-page-content';

// const FrontPageContent = loadable(() => pMinDelay(import('../components/front-page-content'), 1500), {
//   fallback: <Loader />,
// })

const Index = ({ data, location }) => {
  const recentPost = data.allMarkdownRemark?.nodes[0];
  return (
  // <Layout location={location}>
    <FrontPageContent blogPost={recentPost} location={location} />
  // </Layout>
  )
}

export default Index

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: {},
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}

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