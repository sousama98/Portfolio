"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

type Props = {
  onStart: () => void;
};

function AirplaneJourney({ reducedMotion }: { reducedMotion: boolean }) {
  const planeGroup = useMemo(() => new THREE.Group(), []);

  const flightCurve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(2.8, 0.3, 0), // India marker
        new THREE.Vector3(0, 1.5, -0.2), // Arc apex
        new THREE.Vector3(-2.8, 0.3, 0) // USA marker
      ),
    []
  );

  const routePoints = useMemo(() => flightCurve.getPoints(120), [flightCurve]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = reducedMotion ? 0.08 : 0.14;
    const progress = (t * speed) % 1;
    const point = flightCurve.getPoint(progress);
    const lookAhead = flightCurve.getPoint(Math.min(progress + 0.012, 1));
    planeGroup.position.copy(point);
    planeGroup.lookAt(lookAhead);
    planeGroup.rotateY(Math.PI / 2);
  });

  return (
    <>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <cylinderGeometry args={[3.7, 3.7, 0.08, 64]} />
        <meshStandardMaterial color="#0f2a3a" roughness={0.8} />
      </mesh>

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={routePoints.length}
            array={new Float32Array(routePoints.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f8fafc" linewidth={2} />
      </line>

      <group position={[2.8, 0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.65, 0.45, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.15, 0.01]}>
          <boxGeometry args={[0.65, 0.15, 0.01]} />
          <meshBasicMaterial color="#ff9933" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.65, 0.15, 0.01]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -0.15, 0.01]}>
          <boxGeometry args={[0.65, 0.15, 0.01]} />
          <meshBasicMaterial color="#138808" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[0.045, 0.06, 24]} />
          <meshBasicMaterial color="#1e3a8a" />
        </mesh>
      </group>

      <group position={[-2.8, 0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.65, 0.45, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {[0.15, 0, -0.15].map((y) => (
          <mesh key={y} position={[0, y, 0.01]}>
            <boxGeometry args={[0.65, 0.075, 0.01]} />
            <meshBasicMaterial color="#b91c1c" />
          </mesh>
        ))}
        <mesh position={[-0.2, 0.15, 0.01]}>
          <boxGeometry args={[0.26, 0.24, 0.01]} />
          <meshBasicMaterial color="#1d4ed8" />
        </mesh>
      </group>

      <primitive object={planeGroup}>
        <mesh castShadow>
          <capsuleGeometry args={[0.06, 0.44, 8, 16]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.58} roughness={0.34} />
        </mesh>
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.15, 0.06, 0.55]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
        <mesh position={[0, 0.1, -0.07]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.12]} />
          <meshStandardMaterial color="#fb923c" />
        </mesh>
        <mesh position={[0, 0.02, -0.27]} castShadow>
          <boxGeometry args={[0.03, 0.14, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </primitive>
    </>
  );
}

export default function LoadingExperience({ onStart }: Props) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const handle = (evt: MediaQueryListEvent) => setReducedMotion(evt.matches);
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + (prev < 85 ? 6 : 3));
        if (next >= 100) {
          setReady(true);
          window.clearInterval(interval);
        }
        return next;
      });
    }, reducedMotion ? 90 : 70);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#15344a] via-[#12657a] to-[#14a8b1]">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 3.8, 6.4], fov: 46 }}>
        <ambientLight intensity={0.38} />
        <directionalLight
          position={[4, 6, 2]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <AirplaneJourney reducedMotion={reducedMotion} />
        <Environment preset="sunset" />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-9">
        <div className="fade-in-up mx-auto max-w-3xl rounded-3xl border border-white/25 bg-[#07232f]/55 p-6 text-[#effcff] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#b8e6ee]">Quest Boot Sequence</p>
              <h1 className="display-font mt-2 text-3xl font-bold">Welcome to Sourabrata Samanta&apos;s Portfolio</h1>
            </div>
            <p className="ui-chip border-white/30 bg-white/10 text-[#cdf4f8]">3D System Loader</p>
          </div>

          <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6ce2d8] via-[#36c3cc] to-[#178cb0] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-[#c8ecf2]">
            <span>Loading assets and world systems</span>
            <span className="font-bold">{progress}%</span>
          </div>

          <button
            type="button"
            onClick={onStart}
            disabled={!ready}
            className="ui-btn-primary pointer-events-auto mt-6 px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-45"
          >
            {ready ? "Start Quest" : "Preparing..."}
          </button>
        </div>
      </div>
    </div>
  );
}
