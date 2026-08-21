/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

// ────────────────────────────────────────────
// 1. NAVBAR — scroll style + active section
// ────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  // Scrolled style
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighting
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// Smooth scroll for ALL internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ────────────────────────────────────────────
// 2. SCROLL REVEAL
// ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings inside a grid/timeline
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      let delay = 0;
      siblings.forEach(sib => {
        if (sib === entry.target) {
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('visible');
        }
        delay += 80;
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ────────────────────────────────────────────
// 3. TYPING ANIMATION
// ────────────────────────────────────────────
const typedEl = document.getElementById('typedText');
const phrases = [
  'Web Developer',

];
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.substring(0, ci + 1);
    ci++;
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 75);
  } else {
    typedEl.textContent = phrase.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

// ────────────────────────────────────────────
// 4. COUNTER ANIMATION
// ────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ────────────────────────────────────────────
// 5. SKILL BARS — trigger on scroll into view
// ────────────────────────────────────────────
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'growBar 1.4s ease forwards';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar').forEach(bar => {
  bar.style.animation = 'none';
  bar.style.width = '0%';
  barObserver.observe(bar);
});

// ────────────────────────────────────────────
// 6. CONTACT FORM
// ────────────────────────────────────────────
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span>Sending…</span>';
  btn.disabled = true;

  // Simulate send (replace with your actual endpoint / EmailJS / etc.)
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    form.reset();
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1500);
});

// ────────────────────────────────────────────
// 7. ACTIVE NAV ON LOAD
// ────────────────────────────────────────────
window.dispatchEvent(new Event('scroll'));
