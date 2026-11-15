import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { projects } from '../assets/js/data/projects.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('hero project links are named and outside the decorative fallback', () => {
    assert.match(html, /id="hero-sculpture">/);
    const links = html.match(/<nav class="hero-project-links"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(links);
    assert.match(links, /FitZone/);
    assert.match(links, /https:\/\/gabriel-contact.pages.dev\//);
    assert.equal((links.match(/rel="noopener noreferrer"/g) || []).length, 2);
    assert.doesNotMatch(links, /aria-hidden="true"[^>]*>[^<]*Voir le projet/);
    for (const name of ['fitzone-preview.webp', 'gabriel-hero.jpg', 'nfc-preview.png']) {
        assert.ok(existsSync(new URL(`../public/images/${name}`, import.meta.url)));
    }
});

test('hero background keeps motion support without a visible pause control', () => {
    const styles = readFileSync(new URL('../assets/css/a2.css', import.meta.url), 'utf8');
    const motion = readFileSync(new URL('../src/hero/background.js', import.meta.url), 'utf8');
    assert.match(html, /class="hero-background"/);
    assert.doesNotMatch(html, /hero-motion-control/);
    assert.doesNotMatch(styles, /hero-motion-button/);
    assert.match(styles, /prefers-reduced-motion:\s*reduce/);
    assert.match(motion, /IntersectionObserver/);
});

test('selected projects have explicit contributions and interface challenges', () => {
    for (const id of [6, 0, 1, 7]) {
        const project = projects.find(item => item.id === id);
        assert.ok(project.contribution?.length > 20);
        assert.ok(project.challenge?.length > 20);
        assert.ok(project.points.length > 0);
    }
});
