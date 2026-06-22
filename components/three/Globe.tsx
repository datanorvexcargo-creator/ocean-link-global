'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { CITIES, ROUTES } from '@/lib/routes';

function latLngToVec3(lat: number, lng: number, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function buildArcGeom(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  segments = 96,
) {
  const start = latLngToVec3(from.lat, from.lng, 2.02);
  const end = latLngToVec3(to.lat, to.lng, 2.02);
  const midDir = start.clone().add(end).normalize();
  const distance = start.distanceTo(end);
  const lift = 1 + Math.min(0.55, distance * 0.18);
  const mid = midDir.multiplyScalar(2 * lift);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const points = curve.getPoints(segments);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return { geometry };
}

function EarthSphere({
  reduced,
  texture,
}: {
  reduced: boolean;
  texture: THREE.Texture | null;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (reduced) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
    }
  });

  const arcs = useMemo(
    () => ROUTES.map(([a, b]) => buildArcGeom(CITIES[a], CITIES[b], reduced ? 32 : 96)),
    [reduced],
  );

  const cityPositions = useMemo(
    () => CITIES.map((c) => latLngToVec3(c.lat, c.lng, 2.025)),
    [],
  );

  return (
    <group ref={group} rotation={[0.18, 0, 0]}>
      {/* Real Earth */}
      <mesh>
        <sphereGeometry args={[2, 96, 64]} />
        {texture ? (
          <meshStandardMaterial map={texture} roughness={0.95} metalness={0.05} />
        ) : (
          <meshBasicMaterial color="#0a1f4a" />
        )}
      </mesh>

      {/* Atmosphere outer halo */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2, 64, 48]} />
        <meshBasicMaterial color="#4f78fb" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.09}>
        <sphereGeometry args={[2, 48, 32]} />
        <meshBasicMaterial color="#86a4ff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Equator + meridians */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.005, 0.004, 4, 128]} />
        <meshBasicMaterial color="#cddbff" transparent opacity={0.2} />
      </mesh>
      {[0, 60, 120].map((angle) => (
        <mesh key={angle} rotation={[0, (angle * Math.PI) / 180, Math.PI / 2]}>
          <torusGeometry args={[2.005, 0.0035, 4, 96]} />
          <meshBasicMaterial color="#cddbff" transparent opacity={0.1} />
        </mesh>
      ))}

      {/* Route arcs */}
      {arcs.map((arc, i) => (
        <ArcLine key={i} geometry={arc.geometry} delay={i * 0.18} />
      ))}

      {/* City markers */}
      {cityPositions.map((pos, i) => (
        <CityMarker key={i} position={pos} />
      ))}
    </group>
  );
}

function ArcLine({ geometry, delay }: { geometry: THREE.BufferGeometry; delay: number }) {
  const lineRef = useRef<THREE.Line>(null);
  const totalCount = geometry.attributes.position.count;

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = Math.max(0, clock.elapsedTime - delay);
    const progress = Math.min(1, t / 1.6);
    const eased = 1 - Math.pow(1 - progress, 3);
    const count = Math.floor(eased * totalCount);
    geometry.setDrawRange(0, count);
  });

  return (
    <primitive
      ref={lineRef as any}
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: '#e53935', transparent: true, opacity: 0.95 }),
        )
      }
    />
  );
}

function CityMarker({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.8 + position.x) * 0.22;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.03, 14, 14]} />
        <meshBasicMaterial color="#ff5a4f" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 14, 14]} />
        <meshBasicMaterial color="#e53935" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const N = 350;
    const positions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 7 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_s, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref as any} geometry={geom}>
      <pointsMaterial color="#86a4ff" size={0.025} transparent opacity={0.55} />
    </points>
  );
}

export function Globe({
  className,
  cameraZoom = 5.5,
}: {
  className?: string;
  cameraZoom?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/textures/earth.jpg',
      (tex) => {
        tex.anisotropy = 8;
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.error('Earth texture failed to load', err);
      },
    );
  }, []);

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.5, cameraZoom], fov: 38 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} color="#9ab4ff" />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#86a4ff" />
        <Stars />
        <EarthSphere reduced={reduced} texture={texture} />
      </Canvas>
    </div>
  );
}
