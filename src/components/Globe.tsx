/**
 * Globe — gold-on-near-black Three.js globe for the hero backdrop.
 *
 * Adapted from the data-globe skill (fresnel rim, floating arcs, tiny endpoint
 * dots) but recolored to the Kona.biz palette. Arcs radiate from Kona, Hawaii
 * to every state in src/data/states.ts; managed states glow brighter.
 *
 * SSG-safe: three.js is loaded via dynamic import() inside useEffect, so it
 * never enters the synchronous SSG/Node bundle and never touches window at
 * build time. The component renders an empty container during SSG; the canvas
 * mounts and fades in client-side only. Honors prefers-reduced-motion.
 *
 * pointer-events:none — this is a background, not an interactive object, so it
 * never steals scroll or clicks from the hero text/CTAs.
 */
import { useEffect, useRef } from "react";
import { states } from "@/data/states";
import { STATE_COORDS, KONA_ORIGIN } from "@/data/stateCoords";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (cancelled || !container) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const RADIUS = 1;

      // lat/lng -> sphere vector (skill's canonical conversion)
      const toVec = (lat: number, lng: number, r = RADIUS) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      // ---- Renderer / scene / camera ----
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 3.05);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      const resize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      // ---- World group (everything that should rotate together) ----
      const world = new THREE.Group();
      scene.add(world);

      // ---- Globe surface: dark shader with warm gold rim ----
      const globeMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
            vec3 base = mix(vec3(0.035,0.032,0.028), vec3(0.07,0.06,0.045), rim);
            vec3 edge = vec3(0.76,0.61,0.31) * pow(rim, 3.0) * 0.5;
            gl_FragColor = vec4(base + edge, 1.0);
          }
        `,
      });
      const globe = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 64, 64), globeMat);
      world.add(globe);

      // ---- Faint fibonacci point cloud for engineered texture ----
      const N = 1400;
      const positions = new Float32Array(N * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = golden * i;
        positions.set(
          [Math.cos(t) * r * 1.004, y * 1.004, Math.sin(t) * r * 1.004],
          i * 3
        );
      }
      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pointsMat = new THREE.PointsMaterial({
        size: 0.006,
        color: 0xc29b4f,
        transparent: true,
        opacity: 0.22,
      });
      world.add(new THREE.Points(pointsGeo, pointsMat));

      // ---- Atmosphere shell (gold fresnel glow), outside world group ----
      const atmoMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0,0,1.0)), 2.2);
            gl_FragColor = vec4(0.82, 0.66, 0.36, intensity * 0.55);
          }
        `,
      });
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.18, 64, 64), atmoMat);
      scene.add(atmosphere);

      // ---- Arcs from Kona to each state + endpoint dots ----
      const origin = toVec(KONA_ORIGIN.lat, KONA_ORIGIN.lng);
      type ArcRec = { line: THREE.Line; pulse: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset: number };
      const arcs: ArcRec[] = [];

      const dotGeo = new THREE.SphereGeometry(1, 8, 8);
      const goldDot = new THREE.MeshBasicMaterial({ color: 0xd4af6a, transparent: true, opacity: 0.9 });
      const brightDot = new THREE.MeshBasicMaterial({ color: 0xf5d98a, transparent: true, opacity: 1 });
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xf5d98a, transparent: true, opacity: 0.9 });

      states.forEach((s, i) => {
        const c = STATE_COORDS[s.slug];
        if (!c) return;
        const end = toVec(c.lat, c.lng);
        const managed = s.status === "managed";

        // Elevated control point at the midpoint, pushed out from the sphere
        const mid = origin.clone().add(end).multiplyScalar(0.5);
        const dist = origin.distanceTo(end);
        mid.normalize().multiplyScalar(RADIUS + dist * 0.42 + 0.06);
        const curve = new THREE.QuadraticBezierCurve3(origin.clone(), mid, end.clone());

        const pts = curve.getPoints(48);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lineMat = new THREE.LineBasicMaterial({
          color: managed ? 0xf5d98a : 0xc29b4f,
          transparent: true,
          opacity: managed ? 0.5 : 0.32,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        world.add(line);

        // tiny endpoint dot
        const dot = new THREE.Mesh(dotGeo, managed ? brightDot : goldDot);
        dot.position.copy(end);
        dot.scale.setScalar(managed ? 0.012 : 0.008);
        world.add(dot);

        // traveling pulse along the arc
        const pulse = new THREE.Mesh(dotGeo, pulseMat.clone());
        pulse.scale.setScalar(0.007);
        world.add(pulse);

        arcs.push({ line, pulse, curve, offset: i / states.length });
      });

      // Kona origin marker (brighter, larger)
      const konaDot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xfff0c8 }));
      konaDot.position.copy(origin);
      konaDot.scale.setScalar(0.016);
      world.add(konaDot);

      // ---- Orient so North America faces the camera ----
      // Rotate world so longitude ~-100 sits toward +Z.
      world.rotation.y = Math.PI * 0.15;
      world.rotation.x = 0.18;

      // ---- Animate ----
      let raf = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();
        if (!reduceMotion) {
          world.rotation.y += 0.0016;
          // traveling pulses
          for (const a of arcs) {
            const p = (t * 0.18 + a.offset) % 1;
            const pos = a.curve.getPoint(p);
            a.pulse.position.copy(pos);
            (a.pulse.material as THREE.MeshBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.9;
          }
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      // Fade the canvas in once it's painting
      renderer.domElement.style.opacity = "0";
      renderer.domElement.style.transition = "opacity 1.4s ease";
      requestAnimationFrame(() => { renderer.domElement.style.opacity = "1"; });

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        renderer.dispose();
        globeMat.dispose();
        atmoMat.dispose();
        pointsGeo.dispose();
        pointsMat.dispose();
        dotGeo.dispose();
        arcs.forEach((a) => { a.line.geometry.dispose(); (a.line.material as THREE.Material).dispose(); });
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    })();

    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}
