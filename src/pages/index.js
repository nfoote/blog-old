import React from "react"
import AppNoodle from "./AppNoddle"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { ScrollSection } from "../components/scroll-section";
import { Suspense } from 'react'
import Background from "../components/background";
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const BlogPost = ({recentPost: post}) => {
  const title = post.frontmatter.title || post.fields.slug
  return(<article
  className="post-list-item"
  itemScope
  itemType="http://schema.org/Article"
>
  <header>
    <h2>
      <Link to={post?.fields.slug} itemProp="url">
        <span itemProp="headline">{title}</span>
      </Link>
    </h2>
    <small>{post?.frontmatter.date}</small>
  </header>
  <section>
    <p
      dangerouslySetInnerHTML={{
        __html: post?.frontmatter.description || post?.excerpt,
      }}
      itemProp="description"
    />
  </section>
</article>)
}


const Index = ({ data, location }) => {
    const { height, width } = useWindowDimensions();
    const recentPost = data.allMarkdownRemark.nodes[0];
      const siteTitle = data.site.siteMetadata.title

    return(
        <>
        <Suspense fallback={null}>
              <div style={{height: height, width: width}}> 
                <AppNoodle blogPost={<BlogPost recentPost={recentPost} />} />
                <Overlay />
              </div>
          </Suspense>
        </>
    )
}

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '13px' }}>About</div> 
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>_</div>
    </div>
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