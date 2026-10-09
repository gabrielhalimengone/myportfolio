import * as THREE from "three";

const host = document.getElementById("hero-sculpture");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

function roundedPath(width, height, radius) {
    const p = new THREE.Shape();
    const x = -width / 2, y = -height / 2;
    p.moveTo(x + radius, y);
    p.lineTo(x + width - radius, y);
    p.quadraticCurveTo(x + width, y, x + width, y + radius);
    p.lineTo(x + width, y + height - radius);
    p.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    p.lineTo(x + radius, y + height);
    p.quadraticCurveTo(x, y + height, x, y + height - radius);
    p.lineTo(x, y + radius);
    p.quadraticCurveTo(x, y, x + radius, y);
    return p;
}

function interfaceTexture(layer) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const c = canvas.getContext("2d");
    c.fillStyle = layer === 2 ? "rgba(22,13,44,.88)" : "rgba(28,17,57,.55)";
    c.fillRect(0, 0, 1024, 768);
    const fill = (x, y, w, h, color, radius = 6) => {
        c.fillStyle = color;
        c.beginPath(); c.roundRect(x, y, w, h, radius); c.fill();
    };
    c.fillStyle = "#d8c5ff";
    c.font = "500 20px monospace";
    c.fillText(["01 / STRUCTURE", "02 / COMPOSITION", "03 / INTERACTION"][layer], 44, 54);
    for (let i = 0; i < 3; i++) fill(903 + i * 27, 35, 9, 9, "#9b72f4", 4);
    fill(32, 81, 960, 1, "#644891", 0);
    if (layer === 0) {
        c.strokeStyle = "rgba(176,139,255,.3)";
        c.lineWidth = 1;
        for (let x = 45; x < 1020; x += 52) { c.beginPath(); c.moveTo(x, 111); c.lineTo(x, 725); c.stroke(); }
        for (let y = 111; y < 750; y += 52) { c.beginPath(); c.moveTo(45, y); c.lineTo(978, y); c.stroke(); }
        c.strokeStyle = "#ac81fb";
        c.strokeRect(97, 163, 780, 468);
    } else if (layer === 1) {
        fill(46, 119, 178, 600, "rgba(123,78,226,.13)");
        for (let i = 0; i < 5; i++) { fill(64, 152 + i * 67, 14, 14, "#8155ce"); fill(96, 155 + i * 67, 97, 8, "#674699"); }
        fill(268, 131, 390, 26, "#8b62c6");
        fill(268, 182, 200, 9, "#543d79");
        for (let i = 0; i < 3; i++) { fill(270 + i * 232, 242, 198, 148, "rgba(123,78,226,.2)"); fill(292 + i * 232, 270, 63, 9, "#7652b2"); fill(292 + i * 232, 303, 98, 26, "#a781ee"); }
        for (let i = 0; i < 8; i++) fill(284 + i * 79, 656 - (i % 4 * 32 + 80), 42, i % 4 * 32 + 80, i % 2 ? "#6c40aa" : "#9570d2");
    } else {
        fill(49, 132, 480, 36, "#c4a4f5");
        fill(49, 201, 366, 10, "#8964ba");
        fill(49, 226, 266, 10, "#674697");
        fill(49, 287, 172, 57, "#8953d8");
        fill(263, 287, 172, 57, "rgba(154,106,230,.16)");
        fill(49, 425, 530, 1, "#644891");
        for (let i = 0; i < 3; i++) { fill(49, 475 + i * 57, 20, 20, "#a371f4"); fill(94, 480 + i * 57, 280 - i * 38, 10, "#6c479f"); }
        c.strokeStyle = "#9c6bea"; c.lineWidth = 16;
        c.beginPath(); c.arc(788, 460, 103, -.5, 5.1); c.stroke();
        fill(721, 618, 140, 10, "#8964ba");
        fill(748, 649, 87, 8, "#583b7d");
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function startSculpture() {
    if (!host) return;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, .1, 60);
    camera.position.set(0, 0, 15);
    scene.add(new THREE.AmbientLight(0xd5bcff, 1.1));
    const key = new THREE.DirectionalLight(0xe9d8ff, 3.5);
    key.position.set(-3, 6, 8); scene.add(key);
    const side = new THREE.DirectionalLight(0x7841ff, 4.5);
    side.position.set(5, -1, 2); scene.add(side);
    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const ring = roundedPath(4.4, 3.32, .13);
    ring.holes.push(new THREE.Path(roundedPath(4.32, 3.24, .1).getPoints(14)));
    const edgeGeometry = new THREE.ExtrudeGeometry(ring, { depth: .085, bevelEnabled: true, bevelSize: .012, bevelThickness: .016, bevelSegments: 3, steps: 1, curveSegments: 14 });
    const planes = [];
    for (let i = 0; i < 3; i++) {
        const group = new THREE.Group();
        const rim = new THREE.Mesh(edgeGeometry, new THREE.MeshPhysicalMaterial({ color: 0x9d72f2, metalness: .65, roughness: .26, clearcoat: 1, emissive: 0x7033dd, emissiveIntensity: .14 }));
        group.add(rim);
        const face = new THREE.Mesh(new THREE.PlaneGeometry(4.31, 3.23), new THREE.MeshBasicMaterial({ map: interfaceTexture(i), transparent: true, side: THREE.DoubleSide, depthWrite: false }));
        face.position.z = .09;
        face.renderOrder = i + 1;
        group.add(face);
        const outline = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(roundedPath(4.38, 3.3, .12).getPoints(48)), new THREE.LineBasicMaterial({ color: 0xeadcff, transparent: true, opacity: .65 }));
        outline.position.z = .115; group.add(outline);
        sculpture.add(group); planes.push(group);
    }
    let frame = 0, start = performance.now(), scrollProgress = 0, visible = true;
    const clamp = THREE.MathUtils.clamp;
    const ease = value => 1 - Math.pow(1 - value, 4);
    function draw(now) {
        frame = 0;
        const progress = reducedMotion.matches ? 1 : clamp((now - start) / 1450, 0, 1);
        const spread = ease(progress);
        sculpture.rotation.set(.17, -.51 + scrollProgress * .13, -.12);
        sculpture.position.set(.04, .1 - scrollProgress * .3, 0);
        planes.forEach((plane, i) => {
            const offset = i - 1;
            const stage = ease(clamp((progress - i * .1) / .8, 0, 1));
            plane.position.set(-offset * .7 * spread, -offset * .31 * spread, offset * .78 * spread);
            plane.rotation.y = (1 - stage) * .25;
            plane.scale.setScalar(.87 + stage * .13);
        });
        renderer.render(scene, camera);
        host.classList.add("is-rendered");
        host.dataset.motionState = progress < 1 ? "entering" : "settled";
        if (progress < 1 && visible && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    }
    function requestDraw() { if (!frame && visible) frame = requestAnimationFrame(draw); }
    function resize() {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        const aspect = width / height;
        const vertical = aspect < 1.1 ? 3 : 2.65;
        camera.left = -vertical * aspect; camera.right = vertical * aspect;
        camera.top = vertical; camera.bottom = -vertical;
        camera.updateProjectionMatrix(); renderer.setSize(width, height); requestDraw();
    }
    new ResizeObserver(resize).observe(host);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) requestDraw(); else cancelAnimationFrame(frame); frame = 0; }).observe(host);
    window.addEventListener("scroll", () => { scrollProgress = reducedMotion.matches ? 0 : clamp(scrollY / 700, 0, 1); requestDraw(); }, { passive: true });
    reducedMotion.addEventListener("change", () => { scrollProgress = 0; requestDraw(); });
    document.addEventListener("visibilitychange", () => { visible = !document.hidden && host.getBoundingClientRect().bottom > 0; requestDraw(); });
    resize();
    window.addEventListener("pagehide", () => { cancelAnimationFrame(frame); renderer.dispose(); }, { once: true });
}

try { startSculpture(); } catch (error) { console.warn("Static hero illustration in use.", error); }
