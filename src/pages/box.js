import React, { useRef, useState } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Box = props => {
  // This reference will give us direct access to the mesh so we can animate it
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const colorMap = useLoader(TextureLoader, 'blue.png')

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    mesh.current.position.y += 0.01;
    
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        map={colorMap}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  )
}

export default Box