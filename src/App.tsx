import {
  Center,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  CameraControls,
  Preload,
  ContactShadows,
  CameraControlsImpl,
} from "@react-three/drei";

import { Vinyl } from "./Vinyl";
import { useRef } from "react";

function App() {
  const controlsRef = useRef<CameraControlsImpl | null>(null);

  const handleSleep = () => {
    controlsRef.current?.setLookAt(1.7, 0.9, 3, 0, 0, 0, true);
  };

  return (
    <>
      <group position={[0, -0.65, 0]}>
        <Environment
          preset="city"
          background
          backgroundIntensity={2}
          backgroundBlurriness={0.5}
        />
        <ambientLight intensity={1} />
        <Center top position={[0.3, 0, 0]}>
          <Vinyl
            position={[1.2, 0, 0]}
            title="about"
            imageUrl="../public/album1.jpg"
          />
          <Vinyl
            position={[0.8, 0, 0]}
            title="experience"
            imageUrl="../public/album2.jpg"
          />
          <Vinyl
            position={[0.4, 0, 0]}
            title="projects"
            imageUrl="../public/album3.jpg"
          />
          <Vinyl
            position={[0, 0, 0]}
            title="contact"
            imageUrl="../public/album4.jpg"
          />
          <Vinyl
            position={[-0.4, 0, 0]}
            title="lab"
            imageUrl="../public/album5.jpg"
          />
        </Center>
        <AccumulativeShadows temporal frames={100} scale={10}>
          <RandomizedLight amount={21} ambient={20} position={[-10, -5, 10]} />
        </AccumulativeShadows>
        <CameraControls
          ref={controlsRef}
          makeDefault
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 4}
          truckSpeed={0}
          minDistance={3}
          maxDistance={8}
          onSleep={() => {
            handleSleep();
          }}
        />
        <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
        <Preload all />
      </group>
    </>
  );
}

export default App;
