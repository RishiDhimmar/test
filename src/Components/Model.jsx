import { useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import { useDrop } from 'react-dnd'; // or another drag-drop lib

// A component that loads and renders the model at a given position
function Model({ modelUrl, position }) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  return <primitive object={gltf.scene} position={position} />;
}

function Scene() {
  const [models, setModels] = useState([]);

  // Example drop handler using a drag-drop library (abstracted)
  const [, dropRef] = useDrop({
    accept: 'IMAGE',
    drop: (item, monitor) => {
      // Convert drop coordinates to scene coordinates (using raycaster if needed)
      const dropPosition = [0, 0, 0]; // replace with your computed position
      // Map the image to its corresponding model URL
      const modelUrl = imageToModelMapping[item.id];
      setModels((prev) => [...prev, { modelUrl, position: dropPosition }]);
    },
  });

  return (
    <div ref={dropRef} style={{ width: '100%', height: '100%' }}>
        
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Suspense fallback={null}>
          {models.map((m, index) => (
            <Model key={index} modelUrl={m.modelUrl} position={m.position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Example mapping from image IDs to model URLs
const imageToModelMapping = {
  'modelA': '/models/modelA.glb',
  'modelB': '/models/modelB.glb',
};

export default Scene;
