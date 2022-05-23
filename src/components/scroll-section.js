import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'
import { Text } from '@react-three/drei'
import diagram from '../images/svg/diagram-v2.svg'
import frontPageContent from '../resources/front-page-content.json'


function HeadingCaption ({...props}) {
    const visible = useRef(false)
    const ref = useIntersect((isVisible) => (visible.current = isVisible))
    const { height, width } = useThree((state) => state.viewport)
    useFrame((state, delta) => {
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
      ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
    })


    return (
        <group {...props}>
        <Text
        ref={ref}
        //position={[0, .5, 0]}
        //position={-width / 6, 0, 0}
        lineHeight={0.8}
        font="/Montserrat.ttf"
        scale={[0.7,0.7,0.7]}
        fontSize={width / 6}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        >
        {"Nick \nFoote"}      
        </Text>
        </group>
    )
}

function Item({ url, scale, ...props }) {
  const visible = useRef(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
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
      {/* <Item url="/blue.png" scale={[w / 3, w / 3, 1]} position={[-w / 6, 0, 0]} /> */}
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
        position={[0, .5, 0]}
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

  const Card = ({styles, content}) => {
    const { heading, paragraph1, paragraph2 } = content;
    const defaultStyles = {
        position: 'absolute', // TODO: flex layout if possible
        background: '#232a2fbd',
        padding: '10px',
        borderRadius: '25px',
        margin: '10px',
        ...styles
    }
      return (
        <div style={defaultStyles}>
        <h1>{heading}</h1> 
        <p>{paragraph1}</p>
        {paragraph2 && <p>{paragraph2}</p>}
    </div>)
  }

function ScrollSection () {
    const { width: w, height: h } = useThree((state) => state.viewport)
    return(
        <ScrollControls damping={6} pages={10} position={0,0,-1000} >
            <Scroll>
                {/* <HeadingCaption position={[-w / 6, 0, 0]} /> */}
                <Caption>{"Nick \nFoote"}</Caption>
            </Scroll>
            <Scroll html style={{ width: '100%' }}>
                <img src={diagram} scale={[w / 1.8, w / 1.8, 1]}
                    style={{ position: 'absolute', top: '45vh', right: '20vw', left: '20vw' }} 
                />
                <Card 
                    styles={{left: '20vh', right: '20vh', top: '200vh'}} 
                    content={frontPageContent.about} 
                />
                <Card 
                    styles={{left: '20vh', right: '20vh', top: '300vh'}} 
                    content={frontPageContent.blog} 
                />
                <Card 
                    styles={{left: '20vh', right: '20vh', top: '400vh'}} 
                    content={frontPageContent.contact} 
                />
            </Scroll>
        </ScrollControls>)
}
export default ScrollSection

    