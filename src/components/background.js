import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";

import { LayerMaterial, Depth, Noise } from 'lamina'
import React from 'react'

function Background() {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>

      <mesh scale={100}>
        <boxGeometry args={[1, 1, 1]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth colorB="red" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
          <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
         </LayerMaterial>
      </mesh>
      </Canvas>

    )
  }

  export default Background 