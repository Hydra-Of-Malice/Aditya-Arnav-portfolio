import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 900;

/**
 * Stands in for the reference's slow-motion field of flowers: a low-angle
 * meadow of small pale and green forms that sway in a long wave.
 */
function Meadow() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * 30,
        z: -Math.random() * 26 - 1,
        s: 0.05 + Math.random() * 0.12,
        p: Math.random() * Math.PI * 2,
      })),
    [],
  );
  const colors = useMemo(() => {
    const a = new Float32Array(COUNT * 3);
    const green = new THREE.Color('#00fb96');
    const pale = new THREE.Color('#dbdcca');
    for (let i = 0; i < COUNT; i++) {
      const c = Math.random() < 0.18 ? green : pale;
      a.set([c.r, c.g, c.b], i * 3);
    }
    return a;
  }, []);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      const sway = Math.sin(t * 0.7 + s.x * 0.4 + s.p) * 0.25;
      dummy.position.set(s.x + sway * 0.3, -1.2 + Math.sin(t * 0.5 + s.p) * 0.05 + s.s * 6, s.z);
      dummy.rotation.set(0, 0, sway);
      dummy.scale.setScalar(s.s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 8, 8]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshStandardMaterial vertexColors roughness={0.9} />
    </instancedMesh>
  );
}

export default function VisionScene({ active }: { active: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 4], fov: 55 }} frameloop={active ? 'always' : 'never'}>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 4, 22]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 6, 3]} intensity={2.4} color="#fff2d6" />
      <pointLight position={[-6, 1, -4]} intensity={30} color="#00fb96" />
      <Meadow />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, -10]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
    </Canvas>
  );
}
