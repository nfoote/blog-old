import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'
import { Text } from '@react-three/drei'
import diagram from '../images/svg/diagram-v2.svg'
import frontPageContent from '../resources/front-page-content.json'
import Emoji from './emoji'

function Item({ url, scale, ...props }) {
  const visible = useRef(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 2, delta)
  })
  return (
    <group {...props}>
      <Image ref={ref} scale={scale} url={url} >
      </Image>
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)
  return (
    <Scroll>
    {/* <Item url="/blue.png" scale={[w / 3, w / 3, 1]} position={[w / 4, -14, 0]} />  */}
      {/* <Item url="/blue.png" scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item url="/blue.png" scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url="/blue.png" scale={[w / 5, w / 5, 1]} position={[w / 4, -h * 1.2, 0]} /> */}

      {/* <Item url="/diagram.svg" scale={[w / 2.8, w / 2.8, 1]} position={[0, -h * 1.3, 0]} /> */}
      {/* <Item url="/blue.png" scale={[w / 5, w / 5, 1]} position={[-w / 6, -h * 2, 0]} /> */}

      {/* <Item url="/blue.png" scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url="/blue.png" scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url="/blue.png" scale={[w / 2.5, w / 2, 1]} position={[-w / 6, -h * 4.1, 0]} /> */}
    </Scroll>
  )
}

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
    console.log(process.env.GATSBY_GET_FORM)
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
            <button style={{marginTop: '2rem'}} >Send</button>
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
            <h1>{heading}</h1>
            <p>{paragraph1}</p>
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

function ScrollSection ({ blogPost }) {
    const { width: w, height: h } = useThree((state) => state.viewport)
    return(
        <ScrollControls damping={6} pages={4} position={0,0,-1000} >
            <Scroll>
                <Caption>{"Nick \nFoote"}</Caption>
            </Scroll>
            <Scroll html style={{ width: '100%' }}>
              {/* <h1>Nick Foote</h1> */}
                <CardContainer>
                <img src={diagram} scale={[w / 2, w / 2, 1]}
                    style={{
                      overflow: 'hidden',
                      objectPosition: '50% 50%',
                      objectFit: 'cover',
                      maxWidth: '100%',
                      minHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                  }} 
                />
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
                      styles={{ marginTop: '20vh', marginBottom: '10vh'}} 
                      content={frontPageContent.contact} >
                    <Form />
                  </Card>
                </CardContainer>
            </Scroll>
        </ScrollControls>)
}
export default ScrollSection

    