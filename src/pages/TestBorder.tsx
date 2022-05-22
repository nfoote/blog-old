import type { PlaneProps, Triplet } from '@react-three/cannon'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import type { MeshPhongMaterialProps } from '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'
// import niceColors from 'nice-color-palettes'
import React, { useRef, useState, useMemo } from "react"
import type { InstancedMesh, Mesh } from 'three'
import { Color } from 'three'

import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";


type OurPlaneProps = Pick<MeshPhongMaterialProps, 'color'> & Pick<PlaneProps, 'position' | 'rotation'>

function Plane({ color, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null))
  return (
    <mesh ref={ref} receiveShadow>
     {/* <boxBufferGeometry args={[500, 500]} /> */}

      <planeBufferGeometry args={[500, 500]} />
      {/* <meshPhongMaterial color={color} /> */}

      {/* <meshStandardMaterial wireframe color="green" /> */}

    </mesh>
  )
}

function InstancedSpheres({ number = 20 }) {
  const [ref] = useSphere(
    (index) => ({
      args: [1],
      mass: 1,
      position: [Math.random() - 0.5, index * 2, Math.random() - 0.5],
      //position: [0, 50, 0],

    }),
    useRef<InstancedMesh>(null),
  )
//   const colors = useMemo(() => {
//     const array = new Float32Array(number * 3)
//     const color = new Color()
//     for (let i = 0; i < number; i++)
//       color
//         //.set(niceColors[17][Math.floor(Math.random() * 5)])
//         .convertSRGBToLinear()
//         .toArray(array, i * 3)
//     return array
//   }, [number])

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
                {/* <sphereBufferGeometry wireframe color="green" /> */}

      <sphereBufferGeometry args={[3, 16, 16]}>
        {/* <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} /> */}

       </sphereBufferGeometry>
      <meshPhongMaterial vertexColors />
    </instancedMesh>
  )
}

export default () => (
    
//   <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 20, 15], fov: 100 }  }>
    <Canvas shadows gl={{ alpha: false } }>
      <color attach="background" args={["#FFFFF"]} />

    {/* <hemisphereLight intensity={0.35} />
    <spotLight
      position={[30, 0, 30]}
      angle={0.3}
      penumbra={1}
      intensity={2}
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
    /> */}
    <pointLight position={[-30, 0, -10]} intensity={0.5} />

    <PerspectiveCamera position={[0, 200, 100]} makeDefault />
        {/*
          This lets you rotate the camera.
          We've associated our React ref with it
          like we would do for any React component
        */}
        <OrbitControls />

    <Physics gravity={[0, -30, ]}>
     {/* Bottom Plane */}
      <Plane
      position={[0, 0, 0]} 
      rotation={ [-Math.PI / 2, 0, 0]}
      />


      <InstancedSpheres number={20} />


    </Physics>
  </Canvas>
)