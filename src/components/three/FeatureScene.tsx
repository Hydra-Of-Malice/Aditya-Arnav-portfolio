import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { Feature } from '../../site';

type SceneId = Feature['scene'];

/* --------------------------------------------------------------------------
   (01) AI Systems — a node graph on a sphere shell.
-------------------------------------------------------------------------- */
function Agents() {
  const group = useRef<THREE.Group>(null);
  const { positions, edges } = useMemo(() => {
    const n = 26;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)).multiplyScalar(1.4));
    }
    const lines: number[] = [];
    pts.forEach((p, i) => {
      const near = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      near.forEach(({ j }) => lines.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z));
    });
    return { positions: pts, edges: new Float32Array(lines) };
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh position={p} key={i}>
          <sphereGeometry args={[i % 5 === 0 ? 0.09 : 0.05, 16, 16]} />
          <meshStandardMaterial color={i % 5 === 0 ? '#00fb96' : '#ffffff'} emissive={i % 5 === 0 ? '#00fb96' : '#222'} emissiveIntensity={0.8} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6f6f6f" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

/* --------------------------------------------------------------------------
   (02) Backend — a stack of slabs with a ring of traffic around it.
-------------------------------------------------------------------------- */
function Backend() {
  const ring = useRef<THREE.Mesh>(null);
  const stack = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ring.current) ring.current.rotation.z -= delta * 0.6;
    if (stack.current) {
      stack.current.rotation.y += delta * 0.25;
      stack.current.children.forEach((c, i) => {
        c.position.y = (i - 2) * 0.42 + Math.sin(state.clock.elapsedTime * 1.6 + i) * 0.04;
      });
    }
  });
  return (
    <group rotation={[0.35, 0, 0]}>
      <group ref={stack}>
        {[0, 1, 2, 3, 4].map((i) => (
          <RoundedBox args={[2.2, 0.26, 1.4]} radius={0.08} smoothness={4} key={i}>
            <meshStandardMaterial color={i === 2 ? '#00fb96' : '#1a1a1a'} roughness={0.35} metalness={0.2} />
          </RoundedBox>
        ))}
      </group>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 8, 120]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------------------
   (03) Frontend — a floating card with UI blocks hovering above it.
-------------------------------------------------------------------------- */
function Frontend() {
  const blocks = useMemo(
    () => [
      { p: [-0.8, 0.5, 0.25] as const, s: [0.9, 0.16, 0.1] as const },
      { p: [0.4, 0.5, 0.25] as const, s: [1.2, 0.16, 0.1] as const },
      { p: [-0.55, 0.1, 0.35] as const, s: [1.4, 0.5, 0.1] as const },
      { p: [0.75, 0.1, 0.35] as const, s: [0.9, 0.5, 0.1] as const },
      { p: [0, -0.5, 0.25] as const, s: [2.4, 0.16, 0.1] as const },
    ],
    [],
  );
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group rotation={[-0.3, 0.35, 0]}>
        <RoundedBox args={[3.2, 2, 0.12]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#f2f2f2" roughness={0.6} />
        </RoundedBox>
        {blocks.map((b, i) => (
          <RoundedBox args={[...b.s]} radius={0.04} smoothness={3} position={[...b.p]} key={i}>
            <meshStandardMaterial color={i === 3 ? '#00fb96' : '#111'} roughness={0.5} />
          </RoundedBox>
        ))}
      </group>
    </Float>
  );
}

/* --------------------------------------------------------------------------
   (04) Data & Vision — a point field folded into a wave.
-------------------------------------------------------------------------- */
function DataField() {
  const points = useRef<THREE.Points>(null);
  const { positions, count, side } = useMemo(() => {
    const side = 48;
    const arr = new Float32Array(side * side * 3);
    let k = 0;
    for (let i = 0; i < side; i++)
      for (let j = 0; j < side; j++) {
        arr[k++] = (i / (side - 1) - 0.5) * 4.4;
        arr[k++] = 0;
        arr[k++] = (j / (side - 1) - 0.5) * 3;
      }
    return { positions: arr, count: side * side, side };
  }, []);

  useFrame((state) => {
    const p = points.current;
    if (!p) return;
    const attr = p.geometry.getAttribute('position') as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const x = attr.getX(i);
      const z = attr.getZ(i);
      attr.setY(i, Math.sin(x * 1.6 + t * 1.4) * 0.25 + Math.cos(z * 2.2 + t) * 0.18);
    }
    attr.needsUpdate = true;
    p.rotation.y = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <group rotation={[0.55, 0, 0]}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00fb96" size={0.035} sizeAttenuation />
      </points>
      <gridHelper args={[4.4, side / 4, '#1c1c1c', '#1c1c1c']} position={[0, -0.6, 0]} />
    </group>
  );
}

const scenes: Record<SceneId, { bg: string; node: React.ReactNode }> = {
  agents: { bg: '#0b0b0b', node: <Agents /> },
  backend: { bg: '#e6e6e6', node: <Backend /> },
  frontend: { bg: '#d6d6d6', node: <Frontend /> },
  data: { bg: '#0d0d0d', node: <DataField /> },
};

/**
 * One canvas that swaps between the four scenes so the feature list only
 * ever pays for a single WebGL context.
 */
export default function FeatureScene({ scene, active }: { scene: SceneId; active: boolean }) {
  const s = scenes[scene];
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 40 }} frameloop={active ? 'always' : 'never'}>
      <color attach="background" args={[s.bg]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 3]} intensity={12} color="#00fb96" />
      {s.node}
    </Canvas>
  );
}
