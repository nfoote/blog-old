import React from 'react'
import { useThree } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Text } from '@react-three/drei'
import diagram from '../images/svg/diagram-v2.svg'
import sendImage from '../images/svg/send2.svg'
import github from '../images/svg/github.svg'
import linkedin from '../images/svg/linkedin.svg'
import resume from '../images/svg/resume.svg'

import frontPageContent from '../resources/front-page-content.json'

function Caption({ children }) {
  const { width } = useThree((state) => state.viewport)
  return (
    <Text
      position={[0, 1, 0]}
      lineHeight={0.8}
      font="/Montserrat.ttf"
      scale={[0.7,0.7,0.7]}
      fontSize={width / 6}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
      >
      {children}
    </Text>
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
            <img style={{height: '50px', width: '50px', margin: '10px'}} src={sendImage} />
            Send
          </button>            
      </div>
    </form>
  )
}

const Card = ({styles, content, children}) => {
  const { heading, paragraph1, paragraph2 } = content;
  const defaultStyles = {
      background: '#232a2fbd',
      padding: '16px',
      borderRadius: '25px',
      ...styles
  }
    return (
      <>
        <div style={defaultStyles}>
          {heading && <h1>{heading}</h1>}
          {paragraph1 && <p>{paragraph1}</p>}
          {paragraph2 && <p>{paragraph2}</p>}
          {children && children}
        </div>
      </>
    );
}

const CardContainer = ({children}) => {
  const style = {
    marginTop: '30vh'
  }
  return(
    <div className="global-wrapper" style={style}>
      {children}
    </div>
  );
}

function FrontPageContent ({ blogPost }) {
    return(
        <ScrollControls damping={6} pages={4.6} position={0,0,-1000} >
            <Scroll>
                <Caption>{"Nick \nFoote"}</Caption>
            </Scroll>
            <Scroll html style={{ width: '100%' }}>
                <CardContainer>
                  <img src={diagram} alt="Man standing next to a puppy with coffee in hand." />
                  <Card 
                      styles={{ marginTop: '20vh', marginBottom: '10vh'}} 
                      content={frontPageContent.about} />
                  <Card 
                      styles={{ marginTop: '20vh', marginBottom: '10vh'}} 
                      content={frontPageContent.blog} 
                  >
                    {blogPost}
                  </Card>
                  <Card 
                      styles={{ marginTop: '20vh', marginBottom: '10vh', padding: '35px'}} 
                      content={frontPageContent.contact} >
                    <Form />
                  </Card>
                </CardContainer>
            </Scroll>
        </ScrollControls>)
}
export default FrontPageContent

    