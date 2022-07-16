import React, { useState, useRef } from 'react';
import BallApp from "../components/BallApp"

import { Link, graphql } from "gatsby"
import diagram from '../images/svg/diagram-v3.svg'
import sendImage from '../images/svg/send2.svg'
import frontPageContent from '../resources/front-page-content.json'

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

const Card = ({styles, content, children}) => {
  const { heading, paragraph1, paragraph2 } = content;
    return (
      <>
        <div className="card" style={styles} >
          {heading && <h1>{heading}</h1>}
          {paragraph1 && <p>{paragraph1}</p>}
          {paragraph2 && <p>{paragraph2}</p>}
          {children && children}
        </div>
      </>
    );
}

const CardContainer = ({children}) => {
  return(
    <div className="card-container">
      <div className="global-wrapper">
        {children}
      </div>
    </div>
  );
}

function FrontPageContent ({ blogPost }) {
    return (
      <>
        <BallApp />
        <CardContainer>
          <h1 className="hero-content">Nick Foote</h1>            
          <img src={diagram} alt="Man standing next to a puppy with coffee in hand." />
          <Card 
              styles={{ marginTop: '20vh', marginBottom: '10vh'}} 
              content={frontPageContent.about} />
          <Card 
              styles={{ marginTop: '20vh', marginBottom: '10vh'}} 
              content={frontPageContent.blog} 
          >
            <BlogPost recentPost={blogPost} />
          </Card>
          <Card 
              styles={{ marginTop: '20vh', marginBottom: '20vh', padding: '35px'}} 
              content={frontPageContent.contact} >
            <Form />
          </Card>
        </CardContainer>
      </>
    )
}
export default FrontPageContent

    