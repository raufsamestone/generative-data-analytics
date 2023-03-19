import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

const Box = ({ speed }) => {
  const meshRef = useRef();
  const [color, setColor] = useState(new THREE.Color(0xff0000));

  useEffect(() => {
    if (speed > 5) {
      setColor(new THREE.Color(0x00ff00));
    } else if (speed > 2) {
      setColor(new THREE.Color(0xffff00));
    } else {
      setColor(new THREE.Color(0xff0000));
    }
  }, [speed]);

  useFrame(() => {
    meshRef.current.rotation.x += speed / 100;
    meshRef.current.rotation.y += speed / 100;
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={color} />
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
      } catch (error) {
        // Show an error message to the user
        console.error("An error occurred:", error);
        setContent("An error occurred. Please try again later.");
      }
    };

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="content">
        <h1>Speed: {speed}</h1>
      </div>
      <Canvas width="1250" height="800" className="canvas">
        <ambientLight intensity={1.2} />
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
        background:black;
        color:white
      }
      .canvas {
        margin-top: 20rem;
      }
      .content{ 
        margin:5rem
      }
      .content h1{ 
        text-align:center
      }
      
      `}</style>
    </div>
  );
};

export default Home;
