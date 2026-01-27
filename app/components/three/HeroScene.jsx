'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Floating sphere with distortion
function FloatingSphere({ position, color, speed = 1, distort = 0.3, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Wireframe torus ring
function FloatingRing({ position, color, scale = 1, rotationSpeed = 0.3 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={meshRef} args={[1, 0.02, 16, 100]} position={position} scale={scale}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Torus>
    </Float>
  );
}

// Glowing icosahedron (geometric gem shape)
function FloatingGem({ position, color, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[1, 1]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Icosahedron>
    </Float>
  );
}

// Connecting lines between nodes
function ConnectionLines() {
  const linesRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector3(-1.5, 0.5, 0));
    pts.push(new THREE.Vector3(0, -0.5, 1));
    pts.push(new THREE.Vector3(1.5, 0, -0.5));
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={linesRef}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#e85d4c" opacity={0.3} transparent />
      </line>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <FloatingSphere
        position={[0, 0, 0]}
        color="#e85d4c"
        scale={0.8}
        distort={0.4}
        speed={0.8}
      />
      <FloatingSphere
        position={[-2, 0.8, -1]}
        color="#22c55e"
        scale={0.35}
        distort={0.3}
        speed={1.2}
      />
      <FloatingSphere
        position={[1.8, -0.5, 0.5]}
        color="#3b82f6"
        scale={0.25}
        distort={0.25}
        speed={1}
      />
      <FloatingRing
        position={[0, 0, 0]}
        color="#e85d4c"
        scale={1.5}
        rotationSpeed={0.2}
      />
      <group rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <FloatingRing
          position={[0, 0, 0]}
          color="#3b82f6"
          scale={1.8}
          rotationSpeed={0.15}
        />
      </group>
      <FloatingGem
        position={[2.2, 1, -0.5]}
        color="#22c55e"
        scale={0.15}
      />
      <ConnectionLines />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#e85d4c" />
        <pointLight position={[10, -5, 5]} intensity={0.3} color="#3b82f6" />
        <Scene />
      </Canvas>
    </div>
  );
}
