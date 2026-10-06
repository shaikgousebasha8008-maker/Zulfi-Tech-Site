import { useEffect, useRef } from "react";
import {
  AmbientLight, BufferAttribute, BufferGeometry, Color, DirectionalLight, ExtrudeGeometry, Group, LinearSRGBColorSpace,
  Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Points, PointsMaterial, Scene, Shape, WebGLRenderer,
} from "three";

// The ZulfiEra swirl logo in 3D: six bevelled petals (violet, gold, blue), a gold spark at the centre,
// and star dust in brand colours. It turns slowly and tilts toward the pointer. The flat SVG logo
// stays visible when WebGL is unavailable; with reduced motion it renders one still frame.
const PETAL = [[10, 16], [70, 20, 88, 92, 30, 108], [60, 80, 46, 36, 10, 16]]; // the SVG petal, y flipped

export default function Swirl3D({ className = "" }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    } catch {
      return; // no WebGL: the flat logo stays
    }
    stage.classList.add("webgl");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = LinearSRGBColorSpace; // the colours below are tuned for this
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const k = 0.022;
    const shape = new Shape();
    shape.moveTo(PETAL[0][0] * k, PETAL[0][1] * k);
    for (const c of PETAL.slice(1)) shape.bezierCurveTo(...c.map((v) => v * k));
    const petalGeo = new ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.05, bevelSegments: 5, curveSegments: 40 });
    petalGeo.translate(0, 0, -0.11);
    const mat = (color, emissive, metalness, roughness) => new MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.35, metalness, roughness });
    const gold = mat(0xe6a02a, 0x3a2000, 0.75, 0.32);
    const violet = mat(0x9333ea, 0x2a0752, 0.3, 0.3);
    const blue = mat(0x3b82f6, 0x0a2352, 0.3, 0.3);
    const logo = new Group();
    [violet, gold, blue, violet, gold, blue].forEach((m, i) => {
      const p = new Mesh(petalGeo, m);
      p.rotation.z = (-i * Math.PI) / 3;
      logo.add(p);
    });
    const spark = new Shape();
    const r = 0.38, w = 0.09;
    spark.moveTo(0, r);
    spark.quadraticCurveTo(w, w, r, 0);
    spark.quadraticCurveTo(w, -w, 0, -r);
    spark.quadraticCurveTo(-w, -w, -r, 0);
    spark.quadraticCurveTo(-w, w, 0, r);
    const sparkMesh = new Mesh(
      new ExtrudeGeometry(spark, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.03, bevelSegments: 3 }),
      new MeshStandardMaterial({ color: 0xffe7a3, emissive: 0xf2b233, emissiveIntensity: 0.9, metalness: 0.6, roughness: 0.25 }),
    );
    sparkMesh.position.z = 0.05;
    logo.add(sparkMesh);
    scene.add(logo);

    // Intensities are the tuned "classic" values times π (three.js dropped the old light scaling);
    // decay 0 keeps the classic falloff.
    const PI = Math.PI;
    scene.add(new AmbientLight(0x7c6ce0, 0.35 * PI));
    const key = new DirectionalLight(0xffffff, 0.95 * PI);
    key.position.set(3, 4, 6);
    scene.add(key);
    const light = (color, intensity, x, y, z) => { const l = new PointLight(color, intensity * PI, 22, 0); l.position.set(x, y, z); scene.add(l); };
    light(0xa855f7, 1.5, -4.5, -2, 4);
    light(0x60a5fa, 1.4, 4.5, -3, 3.5);
    light(0xffd27a, 1.2, 0, 0, 2.4);

    const N = 900, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const palette = [0xf2b233, 0xa855f7, 0x60a5fa, 0xe9d5ff].map((c) => new Color(c));
    for (let i = 0; i < N; i++) {
      const rr = 3.4 + Math.random() * 7, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos.set([rr * Math.sin(ph) * Math.cos(th), rr * Math.sin(ph) * Math.sin(th), rr * Math.cos(ph) - 3], i * 3);
      const c = palette[i % palette.length];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const dustGeo = new BufferGeometry();
    dustGeo.setAttribute("position", new BufferAttribute(pos, 3));
    dustGeo.setAttribute("color", new BufferAttribute(col, 3));
    const dust = new Points(dustGeo, new PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false }));
    scene.add(dust);

    const size = () => {
      const wd = stage.clientWidth, ht = stage.clientHeight;
      if (!wd || !ht) return;
      renderer.setSize(wd, ht, false);
      camera.aspect = wd / ht;
      camera.position.z = wd < 520 ? 11 : 9.5;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size);
    ro.observe(stage);
    size();

    let mx = 0, my = 0;
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("pointermove", onMove);
    logo.rotation.set(-0.2, 0.3, 0);
    let raf = 0;
    const t0 = performance.now();
    const frame = (now) => {
      const t = (now - t0) / 1000;
      logo.rotation.z = -t * 0.35;
      logo.rotation.x += (-0.2 + my * 0.6 - logo.rotation.x) * 0.05;
      logo.rotation.y += (0.3 + mx * 0.9 - logo.rotation.y) * 0.05;
      logo.position.y = Math.sin(t * 1.2) * 0.08;
      sparkMesh.scale.setScalar(1 + Math.sin(t * 3) * 0.08);
      dust.rotation.y = t * 0.03;
      dust.rotation.x = Math.sin(t * 0.2) * 0.1;
      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      petalGeo.dispose(); dustGeo.dispose();
      [gold, violet, blue].forEach((m) => m.dispose());
      renderer.dispose();
      stage.classList.remove("webgl");
    };
  }, []);

  return (
    <div className={`swirl3d ${className}`} ref={stageRef} role="img" aria-label="The ZulfiEra swirl logo in 3D">
      <svg className="swirl3d-flat" aria-hidden="true"><use href="#zm" /></svg>
      <canvas ref={canvasRef} />
    </div>
  );
}
