/**
 * Globe — static, Americas-facing globe with real country + US-state outlines.
 *
 * - Composition is LOCKED (no spin). Faces North + South America.
 * - Faint gold country borders (110m) as a quiet geographic baseline.
 * - Brighter gold US state borders (10m) — the subject.
 * - Managed states (status === "managed") get a gold node + slow expanding
 *   pulse ring. Available states are passive (just their outline).
 * - Mouse-parallax: the globe leans a few degrees toward the cursor, eases back.
 * - Soft gold atmosphere rim.
 *
 * Border geometry is fetched from /geo/borders.json at runtime (async, ~80KB
 * gzipped) so it never bloats the JS bundle. three.js is dynamically imported
 * inside useEffect — SSG-safe, never touches window at build, never blocks
 * first paint. pointer-events:none so it never steals scroll/clicks.
 * Honors prefers-reduced-motion (no parallax, static rings).
 */
import { useEffect, useRef } from "react";
import { states } from "@/data/states";
import { STATE_COORDS } from "@/data/stateCoords";

type Borders = { countries: [number, number][][]; states: [number, number][][] };

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [THREE, bordersRes] = await Promise.all([
        import("three"),
        fetch(`${import.meta.env.BASE_URL}geo/borders.json`).then((r) => r.json() as Promise<Borders>).catch(() => null),
      ]);
      if (cancelled || !container) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const R = 1;

      const toVec = (lat: number, lng: number, r = R) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      // Convert arrays of [lng,lat] linestrings → LineSegments position buffer
      const linesToSegments = (lines: [number, number][][], r: number) => {
        const verts: number[] = [];
        for (const line of lines) {
          for (let i = 0; i < line.length - 1; i++) {
            const a = toVec(line[i][1], line[i][0], r);
            const b = toVec(line[i + 1][1], line[i + 1][0], r);
            verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        return g;
      };

      // ---- Renderer / scene / camera ----
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 2.7);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

      const resize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      // ---- Pivot (parallax tilt) → world (locked Americas orientation) ----
      const pivot = new THREE.Group();
      scene.add(pivot);
      const world = new THREE.Group();
      // Face North + South America: lng -90 sits front at y=0; tilt up to center ~lat 23
      world.rotation.x = 0.42;
      world.rotation.y = 0.0;
      pivot.add(world);

      // ---- Globe surface: dark shader, subtle warm rim ----
      const globeMat = new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
        fragmentShader: `
          varying vec3 vN;
          void main(){
            float rim = 1.0 - abs(dot(vN, vec3(0.0,0.0,1.0)));
            vec3 base = mix(vec3(0.028,0.026,0.022), vec3(0.05,0.044,0.032), rim);
            vec3 edge = vec3(0.76,0.61,0.31) * pow(rim, 3.5) * 0.35;
            gl_FragColor = vec4(base + edge, 1.0);
          }`,
      });
      world.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), globeMat));

      // ---- Border outlines ----
      let countryGeo: any, stateGeo: any, countryMat: any, stateMat: any;
      if (bordersRes) {
        countryGeo = linesToSegments(bordersRes.countries, R * 1.001);
        countryMat = new THREE.LineBasicMaterial({ color: 0xBB9354, transparent: true, opacity: 0.16 });
        world.add(new THREE.LineSegments(countryGeo, countryMat));

        stateGeo = linesToSegments(bordersRes.states, R * 1.0016);
        stateMat = new THREE.LineBasicMaterial({ color: 0xBB9354, transparent: true, opacity: 0.5 });
        world.add(new THREE.LineSegments(stateGeo, stateMat));
      }

      // ---- Atmosphere rim (symmetric → lives in scene) ----
      const atmoMat = new THREE.ShaderMaterial({
        side: THREE.BackSide, transparent: true, depthWrite: false,
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
        fragmentShader: `varying vec3 vN; void main(){ float i = pow(0.62 - dot(vN, vec3(0,0,1.0)), 2.4); gl_FragColor = vec4(0.82,0.66,0.36, i*0.5);} `,
      });
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(R * 1.16, 64, 64), atmoMat);
      scene.add(atmosphere);

      // ---- Managed states: node + pulse ring ----
      const dotGeo = new THREE.SphereGeometry(1, 12, 12);
      const ringGeo = new THREE.RingGeometry(0.012, 0.02, 40);
      const managed = states.filter((s) => s.status === "managed");
      type Ping = { ring: THREE.Mesh; offset: number };
      const pings: Ping[] = [];
      const zAxis = new THREE.Vector3(0, 0, 1);

      managed.forEach((s, i) => {
        const c = STATE_COORDS[s.slug];
        if (!c) return;
        const p = toVec(c.lat, c.lng);

        const node = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xfff0c8 }));
        node.position.copy(p.clone().multiplyScalar(1.004));
        node.scale.setScalar(0.013);
        world.add(node);

        const ring = new THREE.Mesh(
          ringGeo,
          new THREE.MeshBasicMaterial({ color: 0xf5d98a, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false })
        );
        ring.position.copy(p.clone().multiplyScalar(1.006));
        ring.quaternion.setFromUnitVectors(zAxis, p.clone().normalize());
        world.add(ring);
        pings.push({ ring, offset: i * 0.5 });
      });

      // ---- Mouse parallax ----
      let targetY = 0, targetX = 0;
      const onMove = (e: PointerEvent) => {
        if (reduceMotion) return;
        targetY = (e.clientX / window.innerWidth - 0.5) * 0.22;
        targetX = (e.clientY / window.innerHeight - 0.5) * 0.14;
      };
      window.addEventListener("pointermove", onMove);

      // ---- Render loop ----
      let raf = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();
        // ease pivot toward parallax target
        pivot.rotation.y += (targetY - pivot.rotation.y) * 0.05;
        pivot.rotation.x += (targetX - pivot.rotation.x) * 0.05;
        // pulse rings
        for (const p of pings) {
          const prog = reduceMotion ? 0.35 : ((t * 0.45 + p.offset) % 1);
          const scale = 1 + prog * 2.6;
          p.ring.scale.setScalar(scale);
          (p.ring.material as any).opacity = reduceMotion ? 0.45 : (1 - prog) * 0.6;
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      // fade in
      renderer.domElement.style.opacity = "0";
      renderer.domElement.style.transition = "opacity 1.4s ease";
      requestAnimationFrame(() => { renderer.domElement.style.opacity = "1"; });

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        renderer.dispose();
        globeMat.dispose(); atmoMat.dispose(); dotGeo.dispose(); ringGeo.dispose();
        countryGeo?.dispose(); stateGeo?.dispose(); countryMat?.dispose(); stateMat?.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    })();

    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}
