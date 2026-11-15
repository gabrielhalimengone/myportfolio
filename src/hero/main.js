import * as THREE from "three";
import "./background.js";

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

function interfaceTexture(layer, onUpdate) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const c = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const fill = (x, y, w, h, color, radius = 6) => {
        c.fillStyle = color;
        c.beginPath(); c.roundRect(x, y, w, h, radius); c.fill();
    };
    const titles = ["03 / CARTE NFC - PROFIL NUMERIQUE", "02 / FITZONE - SITE FITNESS", "01 / GABRIEL"];
    c.fillStyle = "#0d0818";
    c.fillRect(0, 0, 1024, 768);
    c.fillStyle = "#e5d6ff";
    c.font = "600 24px monospace";
    c.fillText(titles[layer], 44, 54);
    for (let i = 0; i < 3; i++) fill(903 + i * 27, 35, 9, 9, "#b279ff", 4);
    fill(32, 81, 960, 1, "#644891", 0);

    function drawCover(image, x, y, width, height, focusY = .5) {
        const scale = Math.max(width / image.width, height / image.height);
        const sourceWidth = width / scale, sourceHeight = height / scale;
        const sourceX = (image.width - sourceWidth) / 2;
        const sourceY = Math.max(0, Math.min(image.height - sourceHeight, image.height * focusY - sourceHeight / 2));
        c.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
    }

    {
        const image = new Image();
        image.onload = () => {
            c.save(); c.beginPath(); c.rect(32, 82, 960, 654); c.clip();
            drawCover(image, 32, 82, 960, 654, layer === 2 ? .53 : .5);
            c.restore();
            fill(32, 82, 960, 654, "rgba(9,5,18,.12)", 0);
            texture.needsUpdate = true;
            onUpdate();
        };
        image.src = ["/images/nfc-preview.png", "/images/fitzone-preview.webp", "/images/gabriel-hero.jpg"][layer];
    }
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
    renderer.domElement.setAttribute("aria-hidden", "true");
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
        const rim = new THREE.Mesh(edgeGeometry, new THREE.MeshPhysicalMaterial({ color: 0x9d72f2, metalness: .45, roughness: .38, clearcoat: 1, emissive: 0x7033dd, emissiveIntensity: .06 }));
        group.add(rim);
        const face = new THREE.Mesh(new THREE.PlaneGeometry(4.31, 3.23), new THREE.MeshBasicMaterial({ map: interfaceTexture(i, requestDraw), transparent: true, side: THREE.DoubleSide, depthWrite: false }));
        face.position.z = .09;
        face.renderOrder = i + 1;
        group.add(face);
        const outline = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(roundedPath(4.38, 3.3, .12).getPoints(48)), new THREE.LineBasicMaterial({ color: 0xeadcff, transparent: true, opacity: .65 }));
        outline.position.z = .115; group.add(outline);
        sculpture.add(group); planes.push(group);
    }
    let frame = 0, start = performance.now(), scrollProgress = 0, scrollTarget = 0, lastTime = start, visible = true;
    let activeLayer = -1;
    const emphasis = [0, 0, 0];
    const clamp = THREE.MathUtils.clamp;
    const ease = value => 1 - Math.pow(1 - value, 4);
    function draw(now) {
        frame = 0;
        const delta = Math.min((now - lastTime) / 1000, .05);
        lastTime = now;
        scrollProgress = reducedMotion.matches ? 0 : THREE.MathUtils.damp(scrollProgress, scrollTarget, 9, delta);
        const progress = reducedMotion.matches ? 1 : clamp((now - start) / 1000, 0, 1);
        const spread = ease(progress);
        sculpture.rotation.set(.12 - scrollProgress * .12, -.32 + scrollProgress * .3, -.08 + scrollProgress * .07);
        sculpture.position.set(.04, .1 + scrollProgress * .16, 0);
        planes.forEach((plane, i) => {
            const offset = i - 1;
            const stage = ease(clamp((progress - i * .1) / .8, 0, 1));
            plane.position.set(-offset * (.8 + scrollProgress * .5) * spread, -offset * (.28 + scrollProgress * .18) * spread, offset * (.65 + scrollProgress * .25) * spread);
            plane.rotation.y = (1 - stage) * .25 + offset * scrollProgress * .06;
            plane.scale.setScalar(.87 + stage * .13);
            emphasis[i] = reducedMotion.matches ? Number(i === activeLayer) : THREE.MathUtils.damp(emphasis[i], Number(i === activeLayer), 12, delta);
            const amount = emphasis[i];
            plane.position.lerp(new THREE.Vector3(-.1, 0, 2.6), amount);
            plane.rotation.y += amount * .28;
            plane.rotation.z = amount * .06;
            plane.scale.multiplyScalar(1 + amount * .035);
            plane.children[1].renderOrder = amount > .1 ? 10 : i + 1;
        });
        renderer.render(scene, camera);
        host.classList.add("is-rendered");
        host.dataset.motionState = progress < 1 ? "entering" : "settled";
        host.dataset.scrollProgress = scrollProgress.toFixed(3);
        host.dataset.activeLayer = String(activeLayer);
        const changingSelection = emphasis.some((value, i) => Math.abs(value - Number(i === activeLayer)) > .001);
        if ((progress < 1 || Math.abs(scrollTarget - scrollProgress) > .001 || changingSelection) && visible && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    }
    function requestDraw() { if (!frame && visible) frame = requestAnimationFrame(draw); }
    const links = [...host.querySelectorAll("[data-layer]")];
    const setActive = value => { activeLayer = value; requestDraw(); };
    links.forEach(link => {
        link.addEventListener("pointerenter", () => { if (matchMedia("(hover: hover)").matches) setActive(Number(link.dataset.layer)); });
        link.addEventListener("focus", () => setActive(Number(link.dataset.layer)));
        link.addEventListener("pointerleave", () => setActive(Number(document.activeElement?.dataset.layer ?? -1)));
        link.addEventListener("blur", () => setActive(-1));
    });
    function resize() {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        const aspect = width / height;
        const vertical = Math.max(2.35, 3.6 / aspect);
        camera.left = -vertical * aspect; camera.right = vertical * aspect;
        camera.top = vertical; camera.bottom = -vertical;
        camera.updateProjectionMatrix(); renderer.setSize(width, height); requestDraw();
    }
    new ResizeObserver(resize).observe(host);
    function updateScroll() {
        const hero = host.closest(".hero");
        const top = hero.getBoundingClientRect().top;
        scrollTarget = reducedMotion.matches ? 0 : clamp(-top / Math.max(hero.offsetHeight * .7, 350), 0, 1);
        requestDraw();
    }
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) updateScroll(); else { cancelAnimationFrame(frame); frame = 0; } }).observe(host);
    document.addEventListener("scroll", updateScroll, { passive: true, capture: true });
    reducedMotion.addEventListener("change", () => { scrollProgress = 0; updateScroll(); });
    document.addEventListener("visibilitychange", () => { visible = !document.hidden && host.getBoundingClientRect().bottom > 0; requestDraw(); });
    resize();
    window.addEventListener("pagehide", () => { cancelAnimationFrame(frame); renderer.dispose(); }, { once: true });
}

try { startSculpture(); } catch (error) { console.warn("Static hero illustration in use.", error); }
