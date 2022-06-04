import React from "react"
import BallApp from "./BallApp"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { Suspense } from 'react'
import { Link, graphql } from "gatsby"

const BlogPost = ({recentPost: post}) => {
  const title = post.frontmatter.title || post.fields.slug
  const style = {
    border: '1px solid #ffffff5e',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'rgb(35 42 47 / 95%)'
  }
  return(
    <>
      <h1 style={{fontSize: '1.5rem', fontStyle: 'italic'}}>Recent Post</h1>
      <article
        style={style}
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
      </article>
    </>
  )
}

const Index = ({ data, location }) => {
    const { height, width } = useWindowDimensions();
    const recentPost = data.allMarkdownRemark.nodes[0];
    const siteTitle = data.site.siteMetadata.title

    return(
      <>
        <Suspense fallback={null}>
          <div style={{height: height, width: width}}> 
            <BallApp blogPost={<BlogPost recentPost={recentPost} />} />
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