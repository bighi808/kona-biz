---
name: data-globe-threejs
description: Build a real-time 3D data globe with Three.js, shader-driven mesh treatments, live geolocation ingestion, filtered point rendering, and animated route lines between locations.
---

# Data Globe Skill

## 1. Mission
Use this skill when the user wants a cinematic, real-time 3D globe that turns live geographic data into an interactive visual system. The output should feel like a premium telemetry surface, not a generic demo globe.

The implementation must support:

* A Three.js globe with futuristic mesh and shader treatment.
* Live or streaming geolocation data.
* Conversion of latitude and longitude into 3D globe coordinates in real time.
* A filtering stage that reduces noise and improves visual composition.
* Animated connections between locations using arcs, pulses, particles, or line trails.
* Supporting animation and styling libraries where they add clear value.

When the user asks for a minimal network aesthetic, prefer line-only rendering with no hotspot dots, but allow tiny glowing endpoint dots at route termini.

The skill should also support placeholder data coming from spreadsheet files when the user wants non-technical stakeholders to update routes or geo events directly.

## 2. Default Stack
Unless the user explicitly asks for another stack, use the following:

* Rendering: `three`
* Helper layer: `@react-three/fiber` and `@react-three/drei` for React projects
* Animation: `gsap` for timeline choreography and route reveal timing
* Interpolation and easing: built-in GSAP eases or `maath` if already installed
* Data streaming: native `WebSocket`, `EventSource`, or polling fetch depending on source format
* Spreadsheet parsing: `xlsx` when Excel input is required
* Post effects: `postprocessing` or `@react-three/postprocessing` only if already installed or explicitly requested

If dependencies are missing, state the install command before generating code. Never assume packages exist.

Typical install set:

```bash
npm install three gsap xlsx
```

React projects usually need:

```bash
npm install three @react-three/fiber @react-three/drei gsap xlsx
```

If the user wants spreadsheet edits to update a live preview automatically, prefer a small local sync layer as well:

```bash
npm install xlsx chokidar ws
```

## 3. Visual Direction
The globe should look engineered and atmospheric rather than ornamental.

Required visual traits:

* **Deep indigo-purple globe surface** — NOT gray, NOT black. Use a shader with a base color around `vec3(0.04, 0.03, 0.12)` blending to `vec3(0.08, 0.06, 0.22)` at the rim. The globe should feel like a glowing dark jewel.
* **Dotted landmass layer** — Use `THREE.Points` on a slightly larger sphere (radius 1.003) with `PointsMaterial` at size `0.008`, color `#4466cc`, opacity `0.25`. This creates the dot-matrix continent feel.
* **Bright cyan-blue edge glow** — Inner atmosphere shell (radius 1.08) with fresnel shader: `vec4(0.3, 0.5, 1.0, intensity * 0.6)`. This is the defining visual — a crisp luminous rim.
* **Soft purple outer haze** — Second atmosphere (radius 1.25) with `vec4(0.15, 0.1, 0.4, intensity * 0.25)` for depth-of-field feel.
* **Section background** — Use `radial-gradient(ellipse at 60% 50%, #0d1033 0%, #080b14 60%, #050712 100%)` — deep space indigo, NOT flat black.
* Data points in bright cyan `#55aaff`, arcs in `#6688ff`, pulse dots in `#88ccff`.
* Connections between cities should arc above the surface and animate with deliberate pacing.
* Motion should use transform and opacity driven animation only. Avoid expensive DOM-based overlays for core rendering.

#### Globe shader reference (vertex + fragment):
```glsl
// Vertex
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment — deep indigo with blue rim lighting
varying vec3 vNormal;
void main() {
  float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  vec3 base = mix(vec3(0.04, 0.03, 0.12), vec3(0.08, 0.06, 0.22), rim);
  vec3 edge = vec3(0.2, 0.3, 0.9) * pow(rim, 3.0) * 0.4;
  gl_FragColor = vec4(base + edge, 1.0);
}
```

Avoid:

* **Gray or black globe surfaces** — always use deep indigo/purple tones.
* Flat static map textures with no depth treatment.
* Rendering every incoming point blindly with no clustering, prioritization, or decay strategy.
* `MeshBasicMaterial` for the globe surface — always use a shader for rim-lit depth.

## 4. Scene Architecture
Build the globe as isolated layers so each concern can be tuned independently.

Recommended scene graph:

1. `SceneRoot`
2. `Atmosphere`
3. `GlobeMesh`
4. `WireframeOrShaderShell`
5. `LivePointLayer`
6. `RouteArcLayer`
7. `PulseLayer`
8. `StarsOrNoiseField`

For line-only mode, omit `LivePointLayer` and replace it with a `LineGlowLayer` that mirrors route arcs with a softer additive stroke.

Recommended runtime structure:

1. `data-source.ts` or equivalent for network ingestion
2. `geo.ts` for coordinate conversion helpers
3. `filters.ts` for sampling, dedupe, weighting, decay, and smoothing
4. `globe-material.ts` or shader files for globe visuals
5. `routes.ts` for arc geometry generation and line animation state
6. `excel-sync.ts` or `excel-sync-server.ts` for spreadsheet parsing and live preview updates when spreadsheet-driven data is requested

## 5. Geo Data Contract
Normalize all incoming records into a predictable internal structure before rendering.

Use a shape similar to:

```ts
type GeoDatum = {
  id: string;
  lat: number;
  lng: number;
  intensity?: number;
  category?: string;
  timestamp?: number;
  source?: string;
  sourceLabel?: string;
  targetLabel?: string;
  target?: {
    lat: number;
    lng: number;
  };
};
```

Requirements:

* Reject invalid latitude or longitude immediately.
* Clamp latitude to `[-90, 90]` and longitude to `[-180, 180]` if data is noisy.
* Convert timestamps to numeric epoch values at ingestion.
* Preserve source-target pairs for route rendering.

For spreadsheet-backed placeholder data, support a tabular schema like:

```text
id | sourceLabel | sourceLat | sourceLng | targetLabel | targetLat | targetLng | category | intensity | timestamp
```

Accept either one sheet with explicit source and target columns, or two sheets if the user already separates nodes and routes.

## 5A. Spreadsheet Placeholder Data Mode
Use this mode when the user wants non-developers to edit globe content through Excel and see the preview update automatically.

Preferred setup:

1. Store route or geo records in `.xlsx` or `.csv`.
2. Use `xlsx` to parse the file into normalized `GeoDatum` records.
3. Run a local file watcher with `chokidar`.
4. Push updates to the preview over `WebSocket` or `EventSource`.
5. Re-run normalization, filtering, and route generation when the file changes.

Important constraint:

* A browser preview should not try to watch an arbitrary local Excel file directly.
* Real-time updates from Excel require a local watcher process or backend service that detects file changes and publishes normalized JSON to the client.

Recommended architecture for local preview:

1. `excel-sync-server.ts` watches `data/routes.xlsx`.
2. On file change, it reparses the workbook.
3. The server normalizes rows into `GeoDatum[]`.
4. The server broadcasts the latest payload to connected preview clients.
5. The globe scene receives the payload and updates the render state without a page reload.

Recommended architecture for deployed apps:

1. Upload Excel through an admin flow.
2. Convert workbook rows into JSON on the server.
3. Persist normalized records in a database or object store.
4. Publish updates via websocket, SSE, or polling.

Do not describe direct Excel file watching in the browser as if it were production-safe. It is not.

## 6. Coordinate Conversion
Convert geolocation into sphere coordinates with a single shared utility so points, pulses, and arcs remain aligned.

Use radius-based spherical conversion:

```ts
const phi = (90 - lat) * (Math.PI / 180);
const theta = (lng + 180) * (Math.PI / 180);

const x = -radius * Math.sin(phi) * Math.cos(theta);
const y = radius * Math.cos(phi);
const z = radius * Math.sin(phi) * Math.sin(theta);
```

Guidance:

* Use one canonical `radius` constant for all surface-bound geometry.
* Lift points slightly off the globe surface to prevent z-fighting.
* Arc control points should use a larger radius multiplier to float above the globe.

## 7. Real-Time Data Pipeline
Process live updates through a staged pipeline instead of rendering them directly.

Recommended flow:

1. Ingest incoming data from websocket, polling endpoint, or stream.
2. Normalize field names and validate coordinates.
3. Deduplicate records by `id` or spatial bucket.
4. Apply temporal decay so old activity fades naturally.
5. Rank or threshold points by intensity, freshness, or relevance.
6. Downsample dense regions to preserve readability.
7. Convert approved points into cached 3D vectors.
8. Push only filtered render state into the scene layer.

The system should privilege visual clarity over strict one-to-one rendering of raw data.

For spreadsheet mode, insert this pre-ingestion stage ahead of step 1:

1. Detect file change in `.xlsx` or `.csv`.
2. Parse workbook rows into raw records.
3. Map spreadsheet columns into the internal `GeoDatum` shape.
4. Broadcast normalized records to the preview client.

## 8. Beauty Filter Rules
The filtering stage must intentionally improve composition.

Preferred strategies:

* Spatial dedupe: combine points falling inside the same geo bucket.
* Temporal smoothing: fade bursts in and out rather than popping them instantly.
* Intensity thresholding: ignore low-signal noise when density is high.
* Category weighting: emphasize selected classes with color and size variation.
* Max-visible caps: keep only the most relevant `N` active points per frame.
* TTL expiry: remove stale events after a short configurable lifetime.

Good defaults:

* Point TTL: `4s` to `10s`
* Max visible points: `150` to `600` depending on device and style
* Route TTL: longer than points, typically `6s` to `14s`
* Dense-region clustering: grid bucket or geohash-like grouping

Spreadsheet mode defaults:

* Reload debounce after file save: `150ms` to `500ms`
* Broadcast only after a successful parse
* Keep the previous valid payload active if a spreadsheet edit introduces malformed rows

## 9. Globe Mesh and Shader Guidance
The globe should feel like an active instrument panel.

Recommended material ideas:

* Base sphere with low-saturation emissive tint.
* Secondary shell with fresnel edge glow.
* Subtle procedural scanline or moving grid in shader space.
* Soft atmosphere using additive blending.
* Optional landmass texture only if it supports the concept. Do not default to photoreal Earth.

Shader priorities:

* Time-driven uniforms for subtle movement.
* Fresnel response for edge lighting.
* Noise or stripe modulation for futuristic mesh energy.
* Controlled opacity so overlays do not overpower data marks.

If custom GLSL is used, keep it isolated in shader files or template literals with clearly named uniforms.

## 10. Route Lines Between Locations
Connections between two geographic points should use elevated arcs, not straight lines through the sphere.

If the requested aesthetic is minimal or GitHub-like, use clean animated arcs and layered glow lines instead of point markers.
In that mode, small glowing terminal dots at the start or end of active routes are allowed and often desirable.

Implementation rules:

* Generate a start vector and end vector from geo coordinates.
* Build an arc with one or more elevated control points above the sphere.
* Render the path using `THREE.CatmullRomCurve3`, quadratic bezier logic, or sampled custom geometry.
* Animate line reveal, traveling pulse, or particle flow along the path.
* Keep route colors related to event type or source system.

Recommended animation treatments:

* Stroke reveal using dash offset or draw-range updates.
* Traveling pulse mesh that moves along sampled curve positions when explicit motion markers are desired.
* Trailing particles emitted from source to target.
* Endpoint rings or ripple pulses timed to route activation.
* Fade route opacity with a soft envelope so lines ease in, hold briefly, then dissolve instead of blinking off.

Line-only mode:

* Prefer a dual-line treatment: a crisp core line plus a softer additive glow line.
* Use draw-range reveal and opacity envelopes as the primary animation language.
* Avoid large dots, city pins, and oversized endpoint spheres unless explicitly requested.
* Tiny glowing terminal dots are acceptable when they read as subtle route anchors rather than hotspot markers.
* Keep line counts curated so the globe reads as a network, not a tangled mesh.

Endpoint dot treatment:

* **Dots must be tiny** — radius `0.006–0.01` relative to a globe radius of `1.0`. Anything above `0.015` looks like a tumor on the globe.
* Traveling pulse dots along arcs: radius `0.005–0.008`, never larger than the endpoint dots.
* Pulse ring inner/outer: `0.008–0.014`, not `0.015–0.028` which is too chunky.
* Use soft bloom or additive glow rather than solid opaque discs.
* Animate them with restrained fade or pulse behavior tied to route activation.
* Do not let endpoint dots dominate the route lines.

Globe canvas sizing:

* **Do not make the globe fill 100% of the section.** A globe that fills the entire viewport feels overwhelming and cheap.
* Default to `40–50%` of section width, vertically centered with padding.
* For split layouts (text left, globe right), use `width:45%; height:80%; right:5%; top:10%` as a starting point.
* The globe should feel like an elegant data object floating in space, not a wallpaper.

Smoothness rules:

* Never spawn or remove route lines with a hard visibility toggle.
* Reveal arcs progressively across the path before full opacity is reached.
* Fade route tails during the final portion of their lifetime.
* Drive pulse travel with eased progress rather than abrupt linear stepping when possible.

## 11. Animation Libraries and Motion Roles
Use the right tool for the right motion system.

Preferred split:

* `Three.js`: per-frame geometry, shader uniforms, object transforms
* `GSAP`: entrance choreography, hover transitions, route activation timelines, camera moves
* CSS: HUD overlays, legends, panel transitions, typography animations

Do not use CSS animation for core 3D globe rendering.
Do not mix multiple high-level animation libraries in the same responsibility zone without a reason.

Good pairings:

* GSAP timeline for route birth and endpoint pulse timing
* CSS for dashboard chrome and metric chips
* Shader time uniforms for atmospheric motion

For spreadsheet-driven previews:

* `xlsx` parses workbook content into JSON rows
* `chokidar` watches file changes locally
* `ws` or `EventSource` pushes updates into the live preview

For point and route lifecycle animation:

* Use damping, lerp, or smoothstep-style easing for appear and disappear transitions.
* Keep persistent render slots for active points so filtered data can shrink and fade out rather than vanish instantly.
* Prefer updating target scale, target color, and target position over recreating meshes every frame.

For line-only lifecycle animation:

* Reuse line geometries and materials where practical.
* Animate line reveal and fade rather than spawning extra marker meshes.

## 12. Performance Guardrails
Real-time globe work can degrade quickly if the render path is naive.

Rules:

* Prefer `BufferGeometry` and instancing for many points.
* Reuse vectors, colors, and temporary objects to reduce garbage collection.
* Cap visible records on low-end devices.
* Dispose materials, geometries, and event subscriptions during cleanup.
* Avoid rerendering React trees for every streamed event. Accumulate data into refs or external stores when necessary.
* Use additive glow sparingly to avoid overbright noise.
* In spreadsheet mode, debounce file-change events so one save operation does not trigger multiple reparses and preview flashes.

When data volume is large:

* Aggregate first.
* Render fewer but more meaningful marks.
* Degrade gracefully by reducing point counts, particle counts, and post-processing.

## 13. Interaction Model
The globe should remain legible even while animated.

### Required interactions (not optional):

* **Drag to rotate**: pointer-down starts tracking, pointer-move applies rotation delta to the world group, pointer-up releases. This is a baseline expectation — a non-interactive globe feels broken.
* **Momentum after release**: on pointer-up, apply the last velocity as a decaying spin using GSAP or lerp. The globe should coast to a stop, not freeze instantly.
* **Idle auto-rotation**: slow continuous Y rotation (~0.002 rad/frame). Must pause or dampen during drag, then resume after release with a smooth transition.
* **Cursor feedback**: `cursor: grab` default, `cursor: grabbing` during drag.

### Implementation pattern (vanilla Three.js):

```js
const world = new THREE.Group();  // parent group for globe + all data
scene.add(world);

let isDrag = false, prevX = 0, prevY = 0, velX = 0, velY = 0;
const autoSpeed = { v: 0.002 };

canvas.addEventListener("pointerdown", e => {
  isDrag = true; prevX = e.clientX; prevY = e.clientY; velX = 0; velY = 0;
  gsap.to(autoSpeed, { v: 0, duration: 0.3 });  // pause auto-rotation
});
window.addEventListener("pointermove", e => {
  if (!isDrag) return;
  const dx = e.clientX - prevX, dy = e.clientY - prevY;
  velX = dx * 0.005; velY = dy * 0.005;
  world.rotation.y += velX;
  world.rotation.x = Math.max(-1, Math.min(1, world.rotation.x + velY));  // clamp vertical
  prevX = e.clientX; prevY = e.clientY;
});
window.addEventListener("pointerup", () => {
  isDrag = false;
  gsap.to(world.rotation, { y: "+=" + velX * 8, duration: 1.5, ease: "power3.out" });  // momentum
  gsap.to(autoSpeed, { v: 0.002, duration: 2, delay: 1.5 });  // resume auto-rotation
});

// In animate loop:
if (!isDrag) world.rotation.y += autoSpeed.v;
```

### Critical architecture rule:
**All data layers (dots, arcs, rings, pulses) MUST be children of the `world` group**, not added directly to `scene`. This ensures everything rotates together when the user drags. Only the atmosphere/glow shell can live outside the group since it's view-dependent.

### Route arc animation rules:
* **Never show all arcs at full opacity simultaneously** — stagger their activation with delays.
* **Use GSAP timelines per route**: draw-range reveal (0→full), hold, opacity fade, reset. Repeat with random delay.
* **Add traveling pulse dots** that move along the arc path using sampled curve positions. These make the data feel alive.
* **Arcs must be clearly visible** — opacity 0.3–0.5, not 0.1–0.2 which disappears.

### Zoom (optional but recommended):
* Wheel/pinch zoom with min/max distance limits.
* Prevent clipping through the globe surface.

Keep HUD UI visually secondary to the globe unless the user explicitly requests an analytics dashboard.

## 14. Output Expectations
When generating code with this skill, provide:

* The globe component or scene setup.
* The geo conversion utility.
* The live data ingestion and filtering layer.
* The spreadsheet parsing layer when Excel-backed placeholder data is requested.
* The local watcher or sync server when real-time spreadsheet preview updates are requested.
* The route arc generation logic.
* The animation setup for route lines and pulses.
* Cleanup for subscriptions, RAF work, and Three.js objects.
* Minimal styling for the container and supporting interface.

If the user asks for a prototype only, favor clear structure and visually strong defaults over overengineering.

## 15. Quality Bar
The finished experience should read as a real operational visualization system.

Checklist:

* Is live data normalized before it touches rendering?
* Are latitude and longitude converted with one canonical helper?
* Does the globe surface have layered depth beyond a basic texture?
* Are noisy events filtered into a cleaner visual composition?
* Do route lines arc elegantly and animate with intent?
* Is performance protected with instancing, caps, or aggregation?
* Are cleanup and disposal handled correctly?

If any answer is no, the implementation is incomplete.