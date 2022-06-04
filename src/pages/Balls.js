import * as THREE from 'three'
import React, { useState, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { LayerMaterial, Depth, Fresnel } from 'lamina'
import { Sphere } from '@react-three/drei'

// import { DisplaceProps } from 'lamina/types' TODO: Can't import this

const colorA = new THREE.Color('#fec5da').convertSRGBToLinear()
const colorB = new THREE.Color('#00b8fe').convertSRGBToLinear()

function Ball() {
  const { viewport, camera } = useThree()
  const [speed] = useState(() => 0.1 + Math.random() / 10)
  const layerRef = useRef()

  const position = useMemo(() => {
    const z = Math.random() * -30
    const y = Math.random() * -30

    const bounds = viewport.getCurrentViewport(camera, [0, y, z])
    return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
  }, [viewport])

  return (
    <Float position={position} 
      speed={speed} 
      rotationIntensity={10} 
      floatIntensity={40} 
      dispose={null}>
       <Sphere
        castShadow
        //material={material}
        //onPointerEnter={(e) => handlePointerEnter(e)}
        //onClick={() => api.mass.set(1000)}
        // onPointerEnter={(e) => api.applyLocalForce([0, 0, -50], [0, 0, 0])}
        // onPointerLeave={() => (strength.current = 0)}
        //ref={ref}
        args={[0.4, 128, 128]}
      > 
       <LayerMaterial
          ref={layerRef}
          color={'#ffffff'}
          lighting={'physical'} 
          transmission={1}
          roughness={0.1}
          thickness={2}
        >
         <Depth
            near={0.4854}
            far={0.7661999999999932}
            origin={[-0.4920000000000004, 0.4250000000000003, 0]}
            colorA={colorA}
            colorB={colorB}
          />
          {/* <Displace ref={displaceRef} strength={0} scale={5} offset={[0.09189000000357626, 0, 0]} /> */}
          <Fresnel
            color={'#fefefe'}
            bias={-0.3430000000000002}
            intensity={3.8999999999999946}
            power={3.3699999999999903}
            factor={1.119999999999999}
            mode={'screen'}
          />
        </LayerMaterial>
      </Sphere> 
    </Float>
  )
}


export default function Noodles() {
  return Array.from({ length: 25 }, (_, i) => <Ball key={i} />)
}