import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Stands in for the reference's cinematic hero footage: a slowly breathing
 * dark form lit by two warm lights, drifting bokeh, and a little parallax
 * that follows the pointer.
 */
function Blob() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.08;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.25, 2, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, pointer.x * 0.6, 2, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, -0.4 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15, 2, delta);
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      <mesh scale={2.6}>
        {/* detail 8 = 1,620 triangles. The noise wavelength is far larger than a
            triangle, so higher detail costs frames and shows nothing. */}
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial color="#2a0f06" roughness={0.28} metalness={0.55} distort={0.42} speed={1.4} />
      </mesh>
      <mesh scale={3.9} rotation={[Math.PI / 2.6, 0.3, 0]}>
        <torusGeometry args={[1, 0.012, 16, 160]} />
        <meshBasicMaterial color="#ff8a3d" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 12]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[-5, 2, 3]} intensity={60} color="#ff4d1a" distance={14} decay={2} />
      <pointLight position={[4, -3, 2]} intensity={40} color="#ffb347" distance={14} decay={2} />
      <pointLight position={[0, 4, -3]} intensity={25} color="#ff7a00" distance={14} decay={2} />
      <Blob />
      <Sparkles count={140} scale={[14, 8, 6]} size={5} speed={0.25} opacity={0.6} color="#ffb27a" />
    </Canvas>
  );
}
