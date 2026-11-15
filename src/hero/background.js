const background = document.querySelector('.hero-background');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let visible = false;

function updateMotion() {
    background.dataset.running = String(!motionPreference.matches && visible && !document.hidden);
}

if (background) {
    const hero = background.closest('.hero');
    const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateMotion();
    });
    observer.observe(hero);
    motionPreference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    window.addEventListener('pagehide', () => {
        observer.disconnect();
        motionPreference.removeEventListener('change', updateMotion);
        document.removeEventListener('visibilitychange', updateMotion);
    }, { once: true });
}
