/**
 * Fondo de tinta del hero (Three.js TSL + R3F).
 * Orillas onduladas + gotas que viajan entre piscinas.
 * https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/
 */
import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { useEffect, useState, type ReactNode } from "react";
import { Mesh, NoToneMapping, PlaneGeometry, SRGBColorSpace } from "three";
import {
  abs,
  Break,
  cos,
  Discard,
  dot,
  float,
  floor,
  Fn,
  fract,
  If,
  Loop,
  max,
  min,
  mix,
  normalize,
  reflect,
  screenSize,
  screenUV,
  select,
  sin,
  time,
  vec2,
  vec3,
  vec4,
} from "three/tsl";
import { MeshBasicNodeMaterial, WebGPURenderer } from "three/webgpu";

extend({ Mesh, PlaneGeometry });

const inkMaterial = new MeshBasicNodeMaterial();
inkMaterial.transparent = true;
inkMaterial.depthWrite = false;

/** Escala del mundo ortográfico: Y ∈ [-SCALE, SCALE] = alto del canvas. */
const SCALE = 3;

/** Unión suave (goo). https://iquilezles.org/articles/smin/ */
const smoothUnion = Fn(
  ([distanceA, distanceB, blendRadius]: [any, any, any]) => {
    const h = max(blendRadius.sub(abs(distanceA.sub(distanceB))), 0).div(
      blendRadius,
    );
    return min(distanceA, distanceB).sub(h.mul(h).mul(blendRadius).mul(0.25));
  },
);

/** SDF de esfera. */
const sdSphere = Fn(([point, radius]: [any, any]) =>
  point.length().sub(radius),
);

/**
 * Orilla líquida: armónicos lentos a velocidades distintas (no un bloque rígido).
 */
const inkShoreWave = Fn(([x, amp, phase]: [any, any, any]) => {
  const nx = x.mul(1.85).add(phase);
  const t = time;

  const w1 = sin(nx.add(t.mul(0.18)));
  const w2 = sin(nx.mul(1.55).add(t.mul(-0.12)).add(1.1));
  const w3 = sin(nx.mul(2.4).add(t.mul(0.09)).add(2.0));
  const w4 = cos(nx.mul(0.7).add(t.mul(0.07)).add(0.5));
  const w5 = sin(nx.mul(3.6).add(t.mul(-0.15)).add(1.6));

  const shape = w1
    .mul(0.46)
    .add(w2.mul(0.32))
    .add(w3.mul(0.2))
    .add(w4.mul(0.28))
    .add(w5.mul(0.1));

  const breath = float(1).add(sin(t.mul(0.22).add(phase)).mul(0.06));

  return amp.mul(breath).mul(shape);
});

/**
 * Piscina 3D con canto tubular en la orilla.
 */
const sdInkShore = Fn(([point, dEdge, radius]: [any, any, any]) => {
  const body = max(dEdge, abs(point.z).sub(radius.mul(0.65)));
  const lip = vec2(dEdge, point.z).length().sub(radius);
  return min(body, lip);
});

/** Hash 0..1 estable (para “aleatoriedad” por viaje). */
const hash11 = Fn(([n]: [any]) =>
  fract(sin(n.mul(127.1).add(311.7)).mul(43758.5453)),
);

/**
 * Gotas entre piscinas (pocas, tamaños distintos).
 * La X se elige al azar en cada viaje (mitad de ciclo).
 */
const DROPS = [
  { radius: 0.07, speed: 0.36, phase: 0.0, seed: 12.4 },
  { radius: 0.028, speed: 0.52, phase: 2.4, seed: 47.1 },
  { radius: 0.045, speed: 0.3, phase: 4.1, seed: 91.8 },
] as const;

/**
 * Orillas ±0.85 + gotas que llegan al borde y cambian de columna al fundirse.
 */
const distanceToInkScene = Fn(([samplePoint]: [any]) => {
  const aspect = screenSize.x.div(screenSize.y);
  const halfHeight = float(SCALE);
  const halfWidth = halfHeight.mul(aspect);
  const unit = min(halfWidth, halfHeight);
  const amp = halfHeight.mul(0.11);
  const radius = halfHeight.mul(0.085);
  const goo = unit.mul(0.28);

  const topShoreY = halfHeight
    .mul(0.85)
    .add(inkShoreWave(samplePoint.x.div(halfWidth), amp, float(0.2)));
  const topInk = sdInkShore(samplePoint, topShoreY.sub(samplePoint.y), radius);

  const botShoreY = halfHeight
    .mul(-0.85)
    .add(inkShoreWave(samplePoint.x.div(halfWidth), amp, float(2.8)));
  const botInk = sdInkShore(samplePoint, samplePoint.y.sub(botShoreY), radius);

  let scene: any = min(topInk, botInk);

  // Más allá del viewport: el cambio de carril y la fusión no se ven.
  const yTop = halfHeight.mul(1.35);
  const yBot = halfHeight.mul(-1.35);
  const pi = float(3.14159265);

  for (const drop of DROPS) {
    const clock = time.mul(drop.speed).add(drop.phase);
    const travel = float(0.5).add(cos(clock).mul(0.5));
    const y = mix(yBot, yTop, travel);

    // Nuevo “carril” X en cada mitad de ciclo (al tocar techo o suelo).
    const trip = floor(clock.div(pi));
    const hSide = hash11(trip.add(drop.seed));
    const hPos = hash11(trip.add(drop.seed).add(19.7));
    const side = select(hSide.lessThan(0.5), float(-1), float(1));
    // Bandas laterales: evita el centro del texto.
    const nx = side.mul(mix(float(0.18), float(0.72), hPos));
    const x = unit.mul(nx).add(sin(clock.mul(0.5)).mul(unit.mul(0.02)));

    const r = unit
      .mul(drop.radius)
      .mul(float(1).add(sin(clock.mul(1.8)).mul(0.1)));
    const droplet = sdSphere(samplePoint.sub(vec3(x, y, 0)), r);
    scene = smoothUnion(scene, droplet, goo);
  }

  return scene;
});

const surfaceNormal = Fn(([surfacePoint]: [any]) => {
  const e = float(0.0001);
  const o = vec2(e, 0);
  const d = (point: any) => distanceToInkScene(point) as any;

  return normalize(
    vec3(
      d(surfacePoint.add(o.xyy)).sub(d(surfacePoint.sub(o.xyy))),
      d(surfacePoint.add(o.yxy)).sub(d(surfacePoint.sub(o.yxy))),
      d(surfacePoint.add(o.yyx)).sub(d(surfacePoint.sub(o.yyx))),
    ),
  );
});

const inkLighting = Fn(([rayOrigin, hitPoint]: [any, any]) => {
  const normal = surfaceNormal(hitPoint);
  const viewDirection = normalize(rayOrigin.sub(hitPoint));

  const fromCenter = normalize(vec3(hitPoint.x, hitPoint.y, 0));
  const towardCenter = fromCenter.negate();
  const lightDirection = normalize(towardCenter.mul(1.05).add(vec3(0, 0, 0.45)));

  const NdotV = max(0, dot(viewDirection, normal));
  const onSurface = NdotV.mul(0.55).add(0.45);
  const facingCenter = max(0, dot(normal, towardCenter));

  const diffuse = max(0, dot(lightDirection, normal)).mul(0.015);

  const reflected = normalize(reflect(lightDirection.negate(), normal));
  const phong = max(0, dot(viewDirection, reflected)).pow(11);
  const fresnel = float(1).sub(NdotV).pow(1.6);
  const specular = phong
    .mul(fresnel.add(0.2))
    .mul(facingCenter.add(0.35))
    .mul(1.65)
    .mul(onSurface);

  const rim = fresnel.mul(facingCenter).mul(onSurface).mul(0.4);

  return vec3(diffuse.add(specular).add(rim));
});

const marchInkRay = Fn(() => {
  const ndc = vec2(
    screenUV.x.mul(2).sub(1),
    float(1).sub(screenUV.y).mul(2).sub(1),
  );
  const aspect = screenSize.x.div(screenSize.y);
  const rayOrigin = vec3(
    ndc.x.mul(aspect).mul(SCALE),
    ndc.y.mul(SCALE),
    -SCALE,
  );
  const rayDirection = vec3(0, 0, 1);
  const distanceTravelled = float(0).toVar();
  const rayPosition = rayOrigin.toVar();

  Loop({ start: 1, end: 72 }, () => {
    const distanceToInk = distanceToInkScene(rayPosition);
    distanceTravelled.addAssign(distanceToInk);
    rayPosition.assign(rayOrigin.add(rayDirection.mul(distanceTravelled)));

    If(distanceToInk.lessThan(0.005), () => {
      Break();
    });
    If(distanceTravelled.greaterThan(40), () => {
      Break();
    });
  });

  If(distanceTravelled.greaterThan(40), () => {
    Discard();
  });

  return vec4(inkLighting(rayOrigin, rayPosition), 1);
})();

inkMaterial.colorNode = marchInkRay;

function InkFullscreenQuad() {
  const { width, height } = useThree((state) => state.viewport);

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={inkMaterial} attach="material" />
    </mesh>
  );
}

function WebGPUCanvas({
  children,
  frameloop = "always",
}: {
  children: ReactNode;
  frameloop?: "always" | "demand" | "never";
}) {
  const [canvasFrameloop, setCanvasFrameloop] = useState<
    "always" | "demand" | "never"
  >("never");
  const [isRendererReady, setIsRendererReady] = useState(false);

  useEffect(() => {
    if (!isRendererReady) return;
    setCanvasFrameloop(frameloop);
  }, [isRendererReady, frameloop]);

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      frameloop={canvasFrameloop}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 }}
      gl={async ({ canvas }) => {
        const renderer = new WebGPURenderer({
          canvas: canvas as HTMLCanvasElement,
          antialias: true,
          alpha: true,
        });
        renderer.toneMapping = NoToneMapping;
        renderer.outputColorSpace = SRGBColorSpace;
        try {
          await renderer.init();
          setIsRendererReady(true);
          return renderer;
        } finally {
          window.dispatchEvent(new CustomEvent("portfolio:hero-ready"));
        }
      }}
    >
      <AdaptiveDpr />
      {children}
    </Canvas>
  );
}

export default function HeroInkCanvas() {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () =>
      setFrameloop(reducedMotion.matches ? "never" : "always");

    apply();
    reducedMotion.addEventListener("change", apply);
    return () => reducedMotion.removeEventListener("change", apply);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <WebGPUCanvas frameloop={frameloop}>
        <InkFullscreenQuad />
      </WebGPUCanvas>
      <div
        className="hero-grain pointer-events-none absolute inset-0 z-1"
        aria-hidden="true"
      />
    </div>
  );
}
