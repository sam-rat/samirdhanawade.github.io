// small helpers and DOM wiring
document.getElementById('year').textContent = new Date().getFullYear();

// Typing effect (dynamic hacker-style)
const phrases = [
  "penetration testing",
  "vulnerability assessment",
  "network security",
  "ethical hacking",
  "malware analysis"
];

const target = document.getElementById('type-target');
let pI = 0, cI = 0, deleting = false, delay = 120;

function step() {
  const phrase = phrases[pI];
  if (!deleting) {
    target.textContent = phrase.slice(0, cI + 1);
    cI++;
    if (cI === phrase.length) {
      deleting = true;
      setTimeout(step, 900);
      return;
    }
  } else {
    target.textContent = phrase.slice(0, cI - 1);
    cI--;
    if (cI === 0) {
      deleting = false;
      pI = (pI + 1) % phrases.length;
    }
  }
  setTimeout(step, deleting ? delay / 2 : delay);
}
step();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// small interactive improvements
document.addEventListener('DOMContentLoaded', () => {
  // replace placeholder avatar if not replaced by user
  const img = document.querySelector('.avatar img');
  if (!img || img.src.endsWith('avatar-placeholder.png')) {
    // create a simple SVG data uri as a better placeholder
    const svg = encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'>
        <rect width='100%' height='100%' fill='#0f0e14'/>
        <g fill='${encodeURIComponent('#9b59ff')}' transform='translate(60,60)'>
          <circle cx='190' cy='120' r='80' />
          <rect x='70' y='240' width='240' height='160' rx='18' />
        </g>
      </svg>`);
    img.src = `data:image/svg+xml;charset=utf8,${svg}`;
  }
});
