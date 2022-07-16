import React, { Fragment, useRef, useState } from 'react';
import BallApp from "../components/BallApp"

import { Link, graphql } from "gatsby"
import diagram from '../images/svg/diagram-v3.svg'
import sendImage from '../images/svg/send2.svg'
import frontPageContent from '../resources/front-page-content.json'
import Card from './cards/Card';

import Layout from './layout';
import Seo from './seo';

const BlogPost = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  const style = {
    border: '1px solid #ffffff5e',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'var(--recentblog)'
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

const Form = () => {
  const form = { // TODO: Move this to style.css
    display: 'flex',
    margin: '2rem 0',
    justifyContent: 'center',
    flexDirection: 'column'
  };
  const formRow = {
    display: 'block',
    width: '100%',
    borderRadius: '5px',
    lineHeight: '2rem'
  }
  return(
    <form method="post" action={`https://getform.io/f/${process.env.GATSBY_GET_FORM}`}>
      <div style={form}>
          <label>
            Name
            <input style={formRow} type="text" name="name" />
          </label>
          <label style={{marginTop: '1rem'}} >
            Email
            <input style={formRow} type="email" name="email" />
          </label>
          <label style={{marginTop: '1rem'}}>
            Message
            <textarea style={formRow} name="message"  rows="4">
              </textarea>
          </label>
          <button className="button-30" style={{marginTop: '2rem'}}>
            Send
            <img style={{height: '30px', width: '30px', margin: '5px'}} src={sendImage} />     
          </button>            
      </div>
    </form>
  )
}

const CardContainer = ({ children, location }) => {
  return(
    <div className="card-container">
      <Layout location={location} title="home">
      <Seo title="Home" />
        {children && children}
      </Layout>
    </div>
  );
}

const FrontPageContent = ({ location, blogPost }) => {  
  return (
      <>
        <BallApp />
        <CardContainer location={location}>
        <h1 className="hero-content">Nick Foote</h1>  
        <img className="diagram" src={diagram} alt="Man standing next to a puppy with coffee in hand." />
            {frontPageContent.data.map((content) => {
              return (
                <Fragment key={content.type}>
                  {content.type === 'about' && <Card content={content} />}
                  {content.type === 'blog' && <Card content={content}><BlogPost post={blogPost} /></Card>}
                  {content.type === 'contact' && <Card content={content}><Form /></Card>}
                </Fragment>
              );
            })}
      </CardContainer>
      </>
    )
}
export default FrontPageContent

    