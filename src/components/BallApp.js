import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Physics } from "@react-three/cannon";
import { LayerMaterial, Depth, Noise } from 'lamina'
import Balls from './Balls'
import React from 'react'

export default function BallApp() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
        <Physics gravity={[0,0,0]}>
            <Balls />
        </Physics>
        <Bg />
    </Canvas>
  )
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB="red" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
        <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.1} />
       </LayerMaterial>
    </mesh>
  )
}
