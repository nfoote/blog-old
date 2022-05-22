import React from 'react'
import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Bounds, useBounds, OrbitControls, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import Box from './box'

function Scene() {
  return (
    <>
    <ambientLight intensity={0.2} />
    <directionalLight />
    <Bounds fit clip margin={1.9}>
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
    </Bounds>
    </>
  )
}

export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}