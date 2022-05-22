import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import React, { Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'




function Scene() {
    const data = useLoader(SVGLoader, "/diagram.svg")

  return (
    <>
      <group>

      </group>
    </>
  )
}

export default function Svgtest() {
  return (
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
  )
}
