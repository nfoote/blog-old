import React, { useState, useRef } from 'react';
import BallApp from "../components/BallApp"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { useOnClickOutside }  from '../hooks/useOnClickOutside';
import { Suspense } from 'react'
import { Link, graphql } from "gatsby"
import Burger from "../components/menu/Burger/Burger"
import Menu from "../components/menu/Menu/Menu"
import Seo from '../components/seo';
import FrontPageContent from '../components/front-page-content';

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

const Index = ({ data }) => {
    const { height, width } = useWindowDimensions();
    const recentPost = data.allMarkdownRemark.nodes[0];
    const [open, setOpen] = useState(false);
    const node = useRef(); 
    const isBrowser = typeof window !== "undefined"

    useOnClickOutside(node, () => setOpen(false));

    return(
      <>
        <Seo title="Home" />
         {isBrowser &&
          <Suspense fallback={<h1>Loading</h1>}>
            <div style={{height: height, width: width, position: 'fixed', pointerEvents: 'none' }}> 
              <BallApp />
            </div>
            <FrontPageContent blogPost={<BlogPost recentPost={recentPost} />} />
            <div ref={node}>
              <Burger open={open} setOpen={setOpen} />
              <Menu open={open} />
            </div>
          </Suspense>
        }
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