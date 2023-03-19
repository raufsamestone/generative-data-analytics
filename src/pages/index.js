import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";

const Box = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={new THREE.Color(0xff0000)} />
    </mesh>
  );
};

const Home = () => {
  return (
    <div>
      <Canvas className="canvas">
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
      <style>{`
        .canvas {
          margin-top: 20rem;
        }
      `}</style>
    </div>
  );
};

export default Home;
