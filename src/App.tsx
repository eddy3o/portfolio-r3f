import {
  Center,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  CameraControls,
  Text,
  Float,
  Sky,
  Edges,
  useCursor,
  Preload,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, type Group } from "three";
import gsap from "gsap";

const Frames = ({
  /* children, */
  title,
  position,
}: {
  /* children: React.ReactNode; */
  title: string;
  position: [number, number, number];
}) => {
  const [hover, setHover] = useState(false);
  const frameRef = useRef<Group>(null);
  useCursor(hover);

  useEffect(() => {
    if (frameRef.current) {
      gsap.to(frameRef.current.position, {
        y: hover ? position[1] + 0.2 : position[1],
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hover, position]);

  return (
    <group
      ref={frameRef}
      rotation-y={Math.PI * 0.25}
      castShadow
      position={position}
    >
      <Float rotationIntensity={0} floatingRange={[-0.01, 0.01]} speed={10}>
        <Text
          fontSize={0.07}
          anchorY="top"
          anchorX="right"
          lineHeight={0.8}
          position={[0.385, 0.4, 0.01]}
          material-toneMapped={false}
          color={hover ? "black" : "gray"}
        >
          {title}
        </Text>
      </Float>
      <mesh
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          console.log({ title });
        }}
      >
        <planeGeometry />
        <meshPhysicalMaterial side={DoubleSide} />
        <Edges renderOrder={1000}>
          <meshBasicMaterial transparent color="#333" depthTest={false} />
        </Edges>
      </mesh>
    </group>
  );
};

function App() {
  return (
    <>
      <group position={[0, -0.65, 0]}>
        <Environment preset="studio" background blur={0.65} />
        <Center top position={[0.3, -0.5, 0]}>
          <Frames position={[1.2, 0, 0]} title="about" />
          <Frames position={[0.8, 0, 0]} title="experience" />
          <Frames position={[0.4, 0, 0]} title="projects" />
          <Frames position={[0, 0, 0]} title="contact" />
          <Frames position={[-0.4, 0, 0]} title="lab" />
        </Center>
        <AccumulativeShadows temporal frames={100} scale={10}>
          <RandomizedLight amount={10} ambient={0.4} position={[5, 3, -2]} />
        </AccumulativeShadows>
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <CameraControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <Preload all />
      </group>
    </>
  );
}

export default App;
