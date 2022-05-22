// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";

// export default function Model(props) {
//   const group = useRef();
//   const { nodes, materials } = useGLTF("/scene.gltf");
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes?.Suzanne?.geometry}
//         material={nodes?.Suzanne?.material}
//         position={[0, 0.19, -0.04]}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/scene.gltf");