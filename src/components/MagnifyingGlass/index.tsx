import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const MagnifyingGlass = () => {
  const Model = () => {
    const gltf = useGLTF('./magnifying-glass.glb', true);
    return <primitive object={gltf.scene} dispose={null} scale={0.6} />;
  };
  return (
    <div
      style={{
        position: 'relative',
        width: '50px',
        height: '50px',
        zIndex: '5',
      }}
    >
      <Canvas>
        <Model />
      </Canvas>
    </div>
  );
};

export default MagnifyingGlass;
