/* ===== Navbar scroll state ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== Mobile menu ===== */
const navToggle = document.getElementById('navToggle');
const navLinksList = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinksList.classList.toggle('mobile-open');
});

document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinksList.classList.remove('mobile-open');
  });
});

/* ===== Active section highlight ===== */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop;
    if (window.scrollY >= top - 200) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
});

/* ===== Scroll reveal ===== */
const revealTargets = document.querySelectorAll(
  '.highlight-card, .project-card, .timeline-item, .achievement, .contact-card, .about-stats, .skills-columns'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i % 3 * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

/* ===== Skill bar fill on view ===== */
const skillSection = document.querySelector('.skills');
const skillRows = document.querySelectorAll('.skill-row');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillRows.forEach(row => {
        const pct = row.dataset.pct;
        row.querySelector('.bar-fill').style.width = pct + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillSection) skillObserver.observe(skillSection);

/* ===== Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();
