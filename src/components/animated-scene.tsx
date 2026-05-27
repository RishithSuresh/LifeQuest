"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

function EnergyCore() {
  const coreRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += 0.01;
    coreRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1.3} floatIntensity={1.4}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#6ea8ff"
          emissive="#9f7aea"
          emissiveIntensity={1.4}
          metalness={0.65}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function OrbitRings() {
  const ringGroup = useRef<Group>(null);

  const ringData = useMemo(
    () => [
      { radius: 2.4, color: "#00d1ff" },
      { radius: 3.1, color: "#f0b45f" },
      { radius: 3.8, color: "#ab7fff" },
    ],
    [],
  );

  useFrame(() => {
    if (!ringGroup.current) return;
    ringGroup.current.rotation.x += 0.004;
    ringGroup.current.rotation.y += 0.006;
  });

  return (
    <group ref={ringGroup}>
      {ringData.map((ring) => (
        <mesh key={ring.radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.018, 16, 100]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

export function AnimatedScene() {
  return (
    <div className="h-full w-full rounded-[2rem] border border-white/10 bg-black/20">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <color attach="background" args={["#080a12"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={2} color="#76b0ff" />
        <pointLight position={[-3, -2, -2]} intensity={1.6} color="#b17dff" />
        <OrbitRings />
        <EnergyCore />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
