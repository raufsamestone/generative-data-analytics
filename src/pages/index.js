import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";

const Box = ({ speed }) => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += speed / 100;
    meshRef.current.rotation.y += speed / 100;
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={new THREE.Color(0xff0000)} />
    </mesh>
  );
};

const Home = () => {
  const [speed, setSpeed] = useState(0);
  const [content, setContent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${getRandomInt(1, 200)}`
        );
        const data = await response.json();

        setSpeed(data.title.length / 10);
        setContent(data.title);
        console.log(data.title.length);
      } catch (error) {
        console.error(error);
      }
    };
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="content">
        <h1>{content}</h1>
        <p>Speed: {speed}</p>
      </div>
      <Canvas className="canvas">
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} />
        <Box speed={speed} />
      </Canvas>
      <style>{`
        * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      
      html,
      body {
        max-width: 100vw;
        overflow-x: hidden;
      }
      .canvas {
        margin-top: 20rem;
      }
      .content{ 
        margin:5rem
      }
      
      `}</style>
    </div>
  );
};

export default Home;
