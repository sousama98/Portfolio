"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingExperience from "./LoadingExperience";
import QuestPanel from "@/components/ui/QuestPanel";
import HUD from "@/components/ui/HUD";
import MobileControls from "@/components/ui/MobileControls";
import { zones, type ZoneContent, type ZoneId } from "@/content/content";

const QuestWorld = dynamic(() => import("./QuestWorld"), { ssr: false });

const isClientMobile = () =>
  typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const webglSupported = () => {
  if (typeof window === "undefined") return true;
  const canvas = document.createElement("canvas");
  const webgl2 = canvas.getContext("webgl2");
  const webgl = canvas.getContext("webgl");
  return Boolean(window.WebGLRenderingContext && (webgl2 || webgl));
};

export default function QuestPortfolio() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [activeZone, setActiveZone] = useState<ZoneId>("home");
  const [selectedZoneId, setSelectedZoneId] = useState<ZoneId>("home");
  const [panelZone, setPanelZone] = useState<ZoneContent | null>(null);
  const [pathCount, setPathCount] = useState(0);
  const [totalPaths, setTotalPaths] = useState(7);
  const [zoomScale, setZoomScale] = useState(1);
  const [lowMotion, setLowMotion] = useState(false);
  const [supportsWebgl, setSupportsWebgl] = useState<boolean | null>(null);
  const [foundSecrets, setFoundSecrets] = useState<string[]>([]);
  const [mobileInput, setMobileInput] = useState({ up: false, down: false, left: false, right: false });

  const isMobile = useMemo(isClientMobile, []);
  const flowOrder: ZoneId[] = ["home", "education", "projects", "experience", "certifications", "contact", "thank-you"];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setLowMotion(media.matches);
    const handleChange = (event: MediaQueryListEvent) => setLowMotion(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setSupportsWebgl(webglSupported());
  }, []);

  const addSecret = (secretId: string) => {
    setFoundSecrets((prev) => (prev.includes(secretId) ? prev : [...prev, secretId]));
  };

  const nextLabel = activeZone === "home"
    ? "About"
    : zones.find((zone) => zone.id === flowOrder[Math.min(flowOrder.indexOf(activeZone) + 1, flowOrder.length - 1)])?.name ?? "Thank You";

  const goNextPage = () => {
    if (activeZone === "home") {
      router.push("/about");
      return;
    }

    const currentIndex = flowOrder.indexOf(activeZone);
    const nextIndex = Math.min(currentIndex + 1, flowOrder.length - 1);
    const nextZoneId = flowOrder[nextIndex];
    setSelectedZoneId(nextZoneId);
    setActiveZone(nextZoneId);
    const zone = zones.find((item) => item.id === nextZoneId);
    if (zone) setPanelZone(zone);
  };

  if (supportsWebgl === null) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16 text-ink">
        <p className="ui-chip mb-4 w-fit text-cyan-900">System Check</p>
        <h1 className="display-font text-4xl font-bold">Checking 3D capability</h1>
        <p className="mt-4 text-[color:var(--ink-soft)]">Detecting WebGL support on this device...</p>
      </main>
    );
  }

  if (supportsWebgl === false) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16 text-ink">
        <div className="quest-panel rounded-3xl p-7">
          <p className="ui-chip w-fit text-cyan-900">Fallback Mode</p>
          <h1 className="display-font mt-4 text-4xl font-bold">3D mode unavailable</h1>
          <p className="mt-4 text-[color:var(--ink-soft)]">
            WebGL is not available on this browser/device. Open the readable fallback route for the same portfolio
            content.
          </p>
          <Link className="ui-btn-primary mt-6 inline-block px-5 py-2.5 text-sm" href="/work">
            Open /work fallback
          </Link>
        </div>
      </main>
    );
  }

  if (!started) {
    return <LoadingExperience onStart={() => setStarted(true)} />;
  }

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <HUD
        pageName={zones.find((zone) => zone.id === activeZone)?.name ?? "Home"}
        pathCount={pathCount}
        totalPaths={totalPaths}
        lowMotion={lowMotion}
        onZoomIn={() => setZoomScale((prev) => Math.max(0.65, prev - 0.12))}
        onZoomOut={() => setZoomScale((prev) => Math.min(1.85, prev + 0.12))}
        onNext={goNextPage}
        nextLabel={nextLabel}
        onToggleMotion={() => setLowMotion((prev) => !prev)}
      />

      <QuestWorld
        lowMotion={lowMotion}
        zoomScale={zoomScale}
        isMobile={isMobile}
        selectedZoneId={selectedZoneId}
        onZoneSelect={setSelectedZoneId}
        onZoneChange={setActiveZone}
        onZoneTrigger={setPanelZone}
        onPathCountChange={(count, total) => {
          setPathCount(count);
          setTotalPaths(total);
        }}
        onSecretFound={addSecret}
        foundSecrets={foundSecrets}
        mobileInput={mobileInput}
      />

      {isMobile && (
        <MobileControls
          onPress={(direction, active) => {
            setMobileInput((prev) => ({ ...prev, [direction]: active }));
          }}
        />
      )}

      {panelZone && <QuestPanel zone={panelZone} onClose={() => setPanelZone(null)} />}

      <div className="quest-panel fixed bottom-4 right-4 z-20 rounded-2xl p-3 text-xs text-[color:var(--ink-soft)]">
        <p>Paths completed: {pathCount}/{totalPaths}</p>
      </div>
    </main>
  );
}
