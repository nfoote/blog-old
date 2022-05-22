import type { PlaneProps, Triplet } from '@react-three/cannon'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import type { MeshPhongMaterialProps } from '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'
// import niceColors from 'nice-color-palettes'
import React,{ useMemo, useRef } from 'react'
import type { InstancedMesh, Mesh } from 'three'
import { Color } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

type OurPlaneProps = Pick<MeshPhongMaterialProps, 'color'> & Pick<PlaneProps, 'position' | 'rotation'>

function Plane({ color, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[100, 100]} />
      <meshPhongMaterial color={color} />
    </mesh>
  )
}

function Box() {
  const boxSize: Triplet = [5, 5, 5]
  const [ref, api] = useBox(() => ({ args: boxSize, mass: 0.001, type: 'Kinematic' }), useRef<Mesh>(null))
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    api.position.set(Math.sin(t * 2) * 5, Math.cos(t * 2) * 8, 4)
    api.rotation.set(Math.sin(t * 6), Math.cos(t * 6), 0)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxBufferGeometry args={boxSize} />
      <meshLambertMaterial  />
    </mesh>
  )
}

function InstancedSpheres({ number = 100 }) {
  const [ref] = useSphere(
    (index) => ({
      args: [1],
      mass: 1,
      position: [Math.random() - 0.5, Math.random() - 0.5, index],
    }),
    useRef<InstancedMesh>(null),
  )
  const colors = useMemo(() => {
    const array = new Float32Array(number * 3)
    const color = new Color()
    for (let i = 0; i < number; i++)
      color
        // .set(niceColors[17][Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3)
    return array
  }, [number])

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
      <sphereBufferGeometry args={[1, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereBufferGeometry>
      <meshPhongMaterial vertexColors />
    </instancedMesh>
  )
}

export default () => (
  <Canvas shadows gl={{ alpha: false }} >
    <PerspectiveCamera position={[0, 0, 60]} makeDefault />

    <pointLight position={[0, -12, 16]} intensity={0.5} />
    <OrbitControls />
    <hemisphereLight intensity={0.35} />
    <spotLight
      position={[30, 0, 30]}
      angle={0.3}
      penumbra={1}
      intensity={2}
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
    />
    <pointLight position={[-30, 0, -30]} intensity={0.1} />
    <Physics gravity={[0, 0, -4]}>


      <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />


      <Plane  position={[-10, 0, 0]} rotation={[0, 0.9, 0]} />
      <Plane  position={[10, 0, 0]} rotation={[0, -0.9, 0]} />
      <Plane  position={[0, 10, 0]} rotation={[0.9, 0, 0]} />
      <Plane  position={[0, -10, 0]} rotation={[-0.9, 0, 0]} />
      <Box />
      <InstancedSpheres number={20} />
    </Physics>
  </Canvas>
)