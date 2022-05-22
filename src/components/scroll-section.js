import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'
import { Text } from '@react-three/drei'
import diagram from '../images/favicon.png'


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

      <Item url="/diagram.svg" scale={[w / 2.8, w / 2.8, 1]} position={[0, -h * 1.3, 0]} />
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
        position={[0, 0, 0]}
        lineHeight={0.8}
        font="/Montserrat.ttf"
        scale={[1.2,1.2,1.2]}
        fontSize={width / 6}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        >
        {children}
      </Text>
    )
  }

function ScrollSection () {
    // const { width, height } = useThree((state) => state.viewport);
    // console.log(height)
    // const fontSize = 40;
    return(
        <ScrollControls damping={6} pages={5} position={0,0,-1000} >
            <Scroll>
                <Caption>{"Nick \nFoote"}</Caption>
            </Scroll>

            <Scroll html style={{ width: '100%' }}>
                {/* <h1 style={{ position: 'absolute', top: `10vh`, right: '30vw', fontSize: `${width / 0.5}em` }}>Nick Foote</h1> */}
                {/* <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>Test</h1>
                <h1 style={{ position: 'absolute', top: '260vh', right: '10vw' }}>Test,</h1>
                <h1 style={{ position: 'absolute', top: '350vh', left: '10vw' }}>Test</h1>
                <h1 style={{ position: 'absolute', top: '450vh', right: '10vw' }}>
                Test
                <br />
                test.
                </h1> */}
                            <img src={diagram} />

                <div style={{ position: 'absolute', top: '120vh', right: '20vw', left: '20vw', background: 'red' }}>
                    <p>
                    Hello, my name is nick and I am a cool guys
                    Hello, my name is nick and I am a cool guys
                    Hello, my name is nick and I am a cool guys
                    </p>

                    <p>
                    Hello, my name is nick and I am a cool guys
                    Hello, my name is nick and I am a cool guys
                    Hello, my name is nick and I am a cool guys
                    </p>
    
                </div>
            </Scroll>
        </ScrollControls>)
}
export default ScrollSection

    