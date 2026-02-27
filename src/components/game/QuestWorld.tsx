"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, PerformanceMonitor, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { type ZoneContent, type ZoneId, zones } from "@/content/content";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type Direction = "up" | "down" | "left" | "right";

type Props = {
  lowMotion: boolean;
  zoomScale: number;
  isMobile: boolean;
  selectedZoneId: ZoneId;
  onZoneSelect: (zone: ZoneId) => void;
  onZoneChange: (zone: ZoneId) => void;
  onZoneTrigger: (zone: ZoneContent) => void;
  onPathCountChange: (count: number, total: number) => void;
  onSecretFound: (id: string) => void;
  foundSecrets: string[];
  mobileInput: Record<Direction, boolean>;
};

type RouteNode = {
  id: ZoneId;
  x: number;
  z: number;
  colorA: string;
  colorB: string;
  planetColor: string;
  planetEmissive: string;
  planetShort: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
  hasRing?: boolean;
};

const route: RouteNode[] = [
  { id: "home", x: -12, z: 0, colorA: "#6b7280", colorB: "#4b5563", planetColor: "#b7b9be", planetEmissive: "#52525b", planetShort: "mercury", orbitRadius: 4.2, orbitSpeed: 0.85, orbitPhase: 0.2 },
  { id: "education", x: -8, z: 0, colorA: "#eab308", colorB: "#ca8a04", planetColor: "#f9df94", planetEmissive: "#a16207", planetShort: "venus", orbitRadius: 5.7, orbitSpeed: 0.72, orbitPhase: 0.9 },
  { id: "projects", x: -4, z: 0, colorA: "#22c55e", colorB: "#0ea5e9", planetColor: "#60a5fa", planetEmissive: "#0369a1", planetShort: "earth", orbitRadius: 7.2, orbitSpeed: 0.63, orbitPhase: 1.6 },
  { id: "experience", x: 0, z: 0, colorA: "#ef4444", colorB: "#b91c1c", planetColor: "#ef8f76", planetEmissive: "#7f1d1d", planetShort: "mars", orbitRadius: 8.7, orbitSpeed: 0.55, orbitPhase: 2.3 },
  { id: "certifications", x: 4, z: 0, colorA: "#d6d3d1", colorB: "#a8a29e", planetColor: "#d9c3a0", planetEmissive: "#92400e", planetShort: "jupiter", orbitRadius: 10.2, orbitSpeed: 0.45, orbitPhase: 3.0 },
  { id: "contact", x: 8, z: 0, colorA: "#f59e0b", colorB: "#d97706", planetColor: "#eab676", planetEmissive: "#92400e", planetShort: "saturn", orbitRadius: 11.7, orbitSpeed: 0.38, orbitPhase: 3.7, hasRing: true },
  { id: "thank-you", x: 12, z: 0, colorA: "#22d3ee", colorB: "#0891b2", planetColor: "#8fe8ff", planetEmissive: "#0e7490", planetShort: "uranus", orbitRadius: 13.2, orbitSpeed: 0.32, orbitPhase: 4.4 },
];

const zoneById = new Map(zones.map((zone) => [zone.id, zone]));
const skillLabels = [
  "PYTHON",
  "SQL",
  "AWS",
  "AZURE",
  "RAG",
  "LANGCHAIN",
  "MLOPS",
  "POWER BI",
  "TABLEAU",
  "DOCKER",
];

type MeteorData = {
  position: THREE.Vector3;
  speed: number;
  drift: number;
  scale: number;
};

function ZoneIcon({ id }: { id: ZoneId }) {
  const cls = "h-4 w-4 text-white";
  if (id === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={cls}>
        <path d="M3 11.5L12 4l9 7.5" />
        <path d="M6.5 10.5V20h11V10.5" />
      </svg>
    );
  }
  if (id === "education") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
        <path d="M2.5 8L12 3l9.5 5L12 13 2.5 8Z" />
        <path d="M6 10.3V15c0 1.8 2.9 3.2 6 3.2s6-1.4 6-3.2v-4.7" />
      </svg>
    );
  }
  if (id === "projects") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={cls}>
        <rect x="3" y="4" width="8" height="7" rx="1.5" />
        <rect x="13" y="4" width="8" height="7" rx="1.5" />
        <rect x="3" y="13" width="8" height="7" rx="1.5" />
        <rect x="13" y="13" width="8" height="7" rx="1.5" />
      </svg>
    );
  }
  if (id === "experience") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={cls}>
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />
      </svg>
    );
  }
  if (id === "certifications") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={cls}>
        <circle cx="12" cy="9.2" r="4.2" />
        <path d="M9 13.2 7.5 20l4.5-2.5 4.5 2.5-1.5-6.8" />
      </svg>
    );
  }
  if (id === "contact") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={cls}>
        <rect x="3.2" y="5.3" width="17.6" height="13.4" rx="2" />
        <path d="m4.6 7 7.4 5.4L19.4 7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={cls}>
      <path d="M5 13.5c1.2 3.3 4 5.5 7 5.5s5.8-2.2 7-5.5" />
      <path d="M8.5 10.5a3.5 3.5 0 1 1 7 0v1.2h-7z" />
    </svg>
  );
}

function LevelIcon({
  node,
  sunCenter,
  onSelect,
}: {
  node: RouteNode;
  sunCenter: [number, number, number];
  onSelect: (nodeId: ZoneId) => void;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const zone = zoneById.get(node.id);
  const showPointer = () => {
    document.body.style.cursor = "pointer";
  };
  const hidePointer = () => {
    document.body.style.cursor = "default";
  };

  useFrame(({ clock }) => {
    if (!groupRef.current || !zone) return;
    const t = clock.getElapsedTime() * node.orbitSpeed * 0.2 + node.orbitPhase;
    groupRef.current.position.set(
      sunCenter[0] + Math.cos(t) * node.orbitRadius,
      0,
      sunCenter[2] + Math.sin(t) * node.orbitRadius
    );
  });

  if (!zone) return null;

  return (
    <group ref={groupRef}>
      <mesh
        receiveShadow
        onPointerDown={(event) => {
          event.stopPropagation();
          onSelect(node.id);
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={showPointer}
        onPointerOut={hidePointer}
      >
        <sphereGeometry args={[0.78, 28, 28]} />
        <meshStandardMaterial
          color={node.planetColor}
          emissive={node.planetEmissive}
          emissiveIntensity={0.15}
          roughness={0.85}
          metalness={0.12}
        />
      </mesh>
      {node.hasRing && (
        <mesh rotation={[-Math.PI / 2.7, 0, 0]} position={[0, 0.02, 0]}>
          <torusGeometry args={[1.08, 0.08, 10, 60]} />
          <meshStandardMaterial color="#e2e8f0" emissive="#cbd5e1" emissiveIntensity={0.12} />
        </mesh>
      )}
      <mesh
        position={[0, 0.52, 0]}
        onPointerDown={(event) => {
          event.stopPropagation();
          onSelect(node.id);
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={showPointer}
        onPointerOut={hidePointer}
      >
        <boxGeometry args={[1.8, 1.4, 1.8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <Html position={[0, 1.05, 0]} center zIndexRange={[5, 0]}>
        <div
          className="pointer-events-none w-[80px] rounded-xl border border-white/70 px-2 py-1 text-center shadow-xl"
          style={{
            background: `linear-gradient(140deg, ${node.colorA}, ${node.colorB})`,
          }}
        >
          <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-md bg-white/25">
            <ZoneIcon id={node.id} />
          </div>
          <p className="mt-1 text-[9px] font-bold tracking-wide text-white">{zone.name}</p>
          <p className="text-[8px] font-semibold tracking-wide text-cyan-100">{node.planetShort}</p>
        </div>
      </Html>
    </group>
  );
}

function MeteorField() {
  const meteorData = useMemo<MeteorData[]>(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        position: new THREE.Vector3(
          -36 + (i % 7) * 12 + Math.random() * 4,
          5 + Math.floor(i / 7) * 4 + Math.random() * 2,
          -20 + Math.random() * 40
        ),
        speed: 0.05 + Math.random() * 0.03,
        drift: 0.015 + Math.random() * 0.01,
        scale: 0.05 + Math.random() * 0.08,
      })),
    []
  );
  const refs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(() => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const config = meteorData[i];
      mesh.position.x += config.speed;
      mesh.position.y -= config.drift;
      if (mesh.position.x > 24 || mesh.position.y < -2) {
        mesh.position.x = -34 - Math.random() * 8;
        mesh.position.y = 8 + Math.random() * 5;
        mesh.position.z = -20 + Math.random() * 40;
      }
    });
  });

  return (
    <group>
      {meteorData.map((meteor, i) => (
        <mesh
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={meteor.position}
          rotation={[0.5, 0.2, 0.9]}
        >
          <sphereGeometry args={[meteor.scale, 8, 8]} />
          <meshStandardMaterial color="#f8fafc" emissive="#cbd5e1" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({
  lowMotion,
  zoomScale,
  isMobile,
  selectedZoneId,
  onZoneSelect,
  onZoneChange,
  onZoneTrigger,
  onPathCountChange,
  onSecretFound,
  foundSecrets,
  onPerformance,
}: Props & { onPerformance: (dpr: number) => void }) {
  const { camera } = useThree();
  const message = "Click a planet to open its page.";
  const progressIndex = useRef(0);
  const openedZones = useRef(new Set<ZoneId>());
  const konamiBuffer = useRef<string[]>([]);
  const sunCenter: [number, number, number] = [-15.5, 1.9, 0];
  const orbitAzimuth = useRef(0.95);
  const orbitElevation = useRef(0.42);
  const dragging = useRef(false);
  const dragPointerId = useRef<number | null>(null);

  useEffect(() => {
    const onDown = (event: KeyboardEvent) => {
      const normalized = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      konamiBuffer.current = [...konamiBuffer.current.slice(-9), normalized];
      if (JSON.stringify(konamiBuffer.current) === JSON.stringify(KONAMI) && !foundSecrets.includes("konami")) {
        onSecretFound("konami");
      }
    };

    window.addEventListener("keydown", onDown);
    return () => {
      window.removeEventListener("keydown", onDown);
    };
  }, [foundSecrets, onSecretFound]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging.current = true;
      dragPointerId.current = event.pointerId;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      if (dragPointerId.current !== null && event.pointerId !== dragPointerId.current) return;
      orbitAzimuth.current -= event.movementX * 0.006;
      orbitElevation.current = THREE.MathUtils.clamp(orbitElevation.current - event.movementY * 0.004, 0.18, 1.05);
    };

    const onPointerUp = () => {
      dragging.current = false;
      dragPointerId.current = null;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  useFrame(({ clock }) => {
    const selected = route.find((node) => node.id === selectedZoneId) ?? route[0];
    const t = clock.getElapsedTime() * selected.orbitSpeed * 0.2 + selected.orbitPhase;
    const px = sunCenter[0] + Math.cos(t) * selected.orbitRadius;
    const pz = sunCenter[2] + Math.sin(t) * selected.orbitRadius;

    onZoneChange(selected.id);

    const distance = 8.2 * zoomScale;
    const camTarget = new THREE.Vector3(
      px + Math.cos(orbitAzimuth.current) * Math.cos(orbitElevation.current) * distance,
      1.1 + Math.sin(orbitElevation.current) * distance * 0.85,
      pz + Math.sin(orbitAzimuth.current) * Math.cos(orbitElevation.current) * distance
    );
    camera.position.lerp(camTarget, lowMotion ? 0.05 : 0.08);
    camera.lookAt(px, 1, pz);
  });

  return (
    <>
      <PerformanceMonitor onDecline={() => onPerformance(1)} onIncline={() => onPerformance(isMobile ? 1.1 : 1.35)} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 9, 5]}
        castShadow
        intensity={0.7}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      <pointLight position={[-15.5, 1.9, 0]} intensity={1.15} color="#fcd34d" distance={45} />
      <mesh position={[-15.5, 1.9, 0]}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.8} />
      </mesh>
      <Html position={[-15.5, 4.6, 0]} center zIndexRange={[6, 0]}>
        <div className="rounded-xl border border-white/40 bg-white/10 px-3 py-2 text-center text-xs text-white backdrop-blur-sm">
          <p className="font-bold tracking-wide text-white">WELCOME</p>
          <p className="mt-1 text-white">Feel free to explore and have fun</p>
        </div>
      </Html>
      <Stars radius={120} depth={60} count={4000} factor={3} saturation={0} fade speed={0.5} />
      <MeteorField />

      {skillLabels.map((skill, index) => (
        <Html
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          position={[
            -27 + (index % 5) * 7.2,
            6 + Math.floor(index / 5) * 2.2,
            -18 + (index % 2) * 36,
          ]}
          center
          zIndexRange={[2, 0]}
        >
          <div className="rounded-full border border-white/35 bg-white/8 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-cyan-100 backdrop-blur-sm">
            {skill}
          </div>
        </Html>
      ))}

      {route.map((node) => (
        <LevelIcon
          key={node.id}
          node={node}
          sunCenter={sunCenter}
          onSelect={(nodeId) => {
            onZoneSelect(nodeId);
            const expected = route[progressIndex.current];
            if (nodeId === expected.id && !openedZones.current.has(nodeId)) {
              openedZones.current.add(nodeId);
              onPathCountChange(openedZones.current.size, route.length);
              progressIndex.current = Math.min(progressIndex.current + 1, route.length - 1);
            }
            const zone = zoneById.get(nodeId);
            if (zone) onZoneTrigger(zone);
          }}
        />
      ))}

      <mesh position={[-10.5, 0.3, 1.5]} castShadow>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[2.2, 0.45, -1.7]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0ea5a8" emissive="#0ea5a8" emissiveIntensity={0.2} />
      </mesh>

      <Html position={[0, 3.5, 0]} center>
        <div className="w-[320px] rounded-lg bg-[#052833]/75 px-4 py-2 text-center text-xs text-cyan-50">{message}</div>
      </Html>
    </>
  );
}

export default function QuestWorld(props: Props) {
  const [dpr, setDpr] = useState(props.isMobile ? 1 : 1.2);

  return (
    <Canvas shadows dpr={dpr} camera={{ position: [2, 4, 6], fov: props.isMobile ? 56 : 50 }} className="scan-lines">
      <color attach="background" args={["#020617"]} />
      <Scene {...props} onPerformance={setDpr} />
    </Canvas>
  );
}
