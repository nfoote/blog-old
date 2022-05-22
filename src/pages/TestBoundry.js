import React, { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Bounds, useBounds, OrbitControls, ContactShadows, useGLTF, Float } from '@react-three/drei'
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import WelcomeCard from "../components/welcome-card"
import { Text, Html } from '@react-three/drei'
import Emoji from '../components/emoji';


function Box() {
  const [ref] = useBox(() => ({
    mass: 10,
    position: [0,0,0],
    args: [2, 2, 2]
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, -10, 80], fov: 50 }} dpr={[1, 2]}>
      <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
      <hemisphereLight color="white" groundColor="#ff0f00" position={[-7, 25, 13]} intensity={1} />
      <Suspense fallback={null}>
      <Physics gravity={[0, 0, 0]}>

        <Bounds fit clip margin={1.2}>
        {/* <Model name="Curly" position={[1, -11, -20]} rotation={[2, 0, -0]} /> */}
            {/* <Model name="DNA" position={[20, 0, -17]} rotation={[1, 1, -2]} /> */}
            <Model name="Headphones" position={[23, 2, 4]} rotation={[1, 0, -1]} />
            <Model name="Notebook" position={[-21, -15, -13]} rotation={[2, 0, 1]} />
            <Model name="Rocket003" position={[28, 15, -25]} rotation={[1, 1, 0]} />
            <Model name="Roundcube001" position={[-25, -4, 5]} rotation={[1, 0, 0]} scale={0.5} />
            {/* <Model name="Table" position={[1, -4, -28]} rotation={[1, 0, -1]} scale={0.5} /> */}
            <Model name="VR_Headset" position={[7, -15, 28]} rotation={[1, 0, -1]} scale={5} />
            <Model name="Zeppelin" position={[-20, 10, 10]} rotation={[3, -1, 3]} scale={0.005} />
            <Caption>{`Hi,\ welcome\nmy website\n`}</Caption>

        </Bounds>
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -35, 0]} opacity={0.2} width={200} height={200} blur={1} far={50} />
        </Physics >
      </Suspense>
      {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}
    </Canvas>
  )
}

function Caption({ children }) {
  const { width } = useThree((state) => state.viewport)
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      font="/Ki-Medium.ttf"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle">
      {children}
    </Text>
  )
}

function Model({ name, ...props }) {
  const { nodes } = useGLTF('/compressed.glb')
  const { position, rotation } = props;
  return (
    <Float scale={1} position={[...position]}>
      <mesh geometry={nodes[name].geometry} material={nodes[name].material} material-emissive="red" material-roughness={1} {...props} dispose={null} />
    </Float>
  )
}

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom({ children }) {
  const api = useBounds()
  return (
    <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
    </group>
  )
}
