import React, { Suspense, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const MagnifyingGlass = () => {
  const modelPath = './magnifying-glass.glb';
  const position = [0, 0, 0];
  const ref = useRef<any>(null);
  const gltf = useLoader(GLTFLoader, modelPath);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += 0.012;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <primitive
          ref={ref}
          object={gltf.scene}
          position={position}
          scale={0.45}
        />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </>
  );
};

export default MagnifyingGlass;
