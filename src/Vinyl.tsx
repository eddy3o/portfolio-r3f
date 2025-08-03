import { Float, Gltf, Text, useCursor, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, type Group } from "three";
import gsap from "gsap";

const Vinyl = ({
  /* children, */
  title,
  position,
  imageUrl,
}: {
  /* children: React.ReactNode; */
  title: string;
  position: [number, number, number];
  imageUrl: string;
}) => {
  const [hover, setHover] = useState(false);
  const frameRef = useRef<Group>(null);
  const textRef = useRef<Group>(null);
  const diskRef = useRef<Group>(null);
  useCursor(hover);

  useEffect(() => {
    if (frameRef.current) {
      gsap.to(frameRef.current.position, {
        y: hover ? position[1] + 0.2 : position[1],
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current.position, {
        y: hover ? position[1] + 0.42 : position[1],
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (diskRef.current) {
      gsap.to(diskRef.current.position, {
        x: hover ? position[0] + -0.2 : position[0],
        y: hover ? position[1] + 0.2 : position[1],
        z: hover ? position[2] + 0.2 : position[2],
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hover, position]);

  const texture = useTexture(imageUrl);
  const roughness = useTexture(
    "/maps/Poliigon_PlasticMoldWorn_7486_Roughness.jpg"
  );
  const normal = useTexture("/maps/Poliigon_PlasticMoldWorn_7486_Normal.png");

  return (
    <>
      <group ref={textRef} rotation-y={Math.PI * 0.25} position={position}>
        <Float rotationIntensity={0} floatingRange={[-0.01, 0.01]} speed={10}>
          <Text
            fontSize={0.07}
            anchorY="top"
            anchorX="right"
            lineHeight={0.8}
            position={[0.465, 0.4, -0.01]}
            material-toneMapped={false}
            color={hover ? "black" : "gray"}
          >
            {title}
          </Text>
        </Float>
      </group>

      <group
        rotation-y={Math.PI * 0.25}
        position={position}
        scale={3.2}
        ref={diskRef}
      >
        <Gltf src="/vinyl_record/scene.gltf" />
      </group>

      <group
        ref={frameRef}
        rotation-y={Math.PI * 0.25}
        castShadow
        position={position}
      >
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
          <boxGeometry args={[1, 1, 0.01]} />
          <meshPhysicalMaterial
            map={texture}
            side={DoubleSide}
            roughnessMap={roughness}
            normalMap={normal}
            roughness={10}
            metalness={0}
            clearcoat={10}
          />
        </mesh>
      </group>
    </>
  );
};

export { Vinyl };
