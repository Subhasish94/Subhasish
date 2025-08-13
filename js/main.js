import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// Starfield Three.js Scene
let scene, camera, renderer, stars;

function initStarfield() {
  const banner = document.getElementById("universe-banner");
  const width = banner.clientWidth;
  const height = banner.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.domElement.id = 'starfield';
  banner.appendChild(renderer.domElement);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 2000;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 1, sizeAttenuation: true });
  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}

initStarfield();

// ================= button ================
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('mouseenter', e => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    if (btn.classList.contains('btn-cyan')) {
      ripple.style.backgroundColor = 'rgba(0,0,0,0.6)';
      btn.style.backgroundColor = '#000';
      btn.style.color = '#00ffff';
      btn.style.borderColor = '#00ffff';
    } else {
      ripple.style.backgroundColor = 'rgba(0,255,255,0.6)';
      btn.style.backgroundColor = '#00ffff';
      btn.style.color = '#000';
    }

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  btn.addEventListener('mouseleave', () => {
    if (btn.classList.contains('btn-cyan')) {
      btn.style.backgroundColor = '#00ffff';
      btn.style.color = '#000';
      btn.style.borderColor = 'transparent';
    } else {
      btn.style.backgroundColor = '#000';
      btn.style.color = '#00ffff';
    }
  });
});
// =============== custom cursor ============
const cursorSVG = document.getElementById('cursorSVG');
const cursorCircle = document.getElementById('cursorCircle');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function updateCursor() {
  cursorSVG.style.left = mouseX + 'px';
  cursorSVG.style.top = mouseY + 'px';
  cursorCircle.style.left = mouseX + 'px';
  cursorCircle.style.top = mouseY + 'px';
  requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Hover over links and buttons → switch cursor
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorSVG.style.opacity = '0';
    cursorCircle.style.opacity = '1';
  });
  el.addEventListener('mouseleave', () => {
    cursorSVG.style.opacity = '1';
    cursorCircle.style.opacity = '0';
  });
});

updateCursor();
// =========================
gsap.registerPlugin(ScrollTrigger);

// Custom text splitter
function splitText(el, type = "chars") {
  let text = el.textContent;
  el.textContent = ""; // clear original

  if (type === "chars") {
    text.split("").forEach(char => {
      let em = document.createElement("em");
      em.textContent = char;
      el.appendChild(em);
    });
  }

  if (type === "words") {
    text.split(" ").forEach(word => {
      let em = document.createElement("em");
      em.textContent = word + " ";
      el.appendChild(em);
    });
  }

  if (type === "lines") {
    text.split("\n").forEach(line => {
      let em = document.createElement("em");
      em.textContent = line;
      el.appendChild(em);
    });
  }

  return el.querySelectorAll("em");
}

// Animate sections
function animateSection(sectionClass, splitType, vars) {
  const sections = document.querySelectorAll(sectionClass);

  sections.forEach(section => {
    section.querySelectorAll("h1,h2,h3,h4,h5,h6,p,ul,li").forEach(el => {
      let parts = splitText(el, splitType);

      gsap.from(parts, {
        ...vars,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  });
}

// Animate characters
animateSection(".Characters", "chars", {
  x: 150,
  opacity: 0,
  duration: 0.5,
  ease: "power4",
  stagger: 0.04
});

// Animate words
animateSection(".Words", "words", {
  y: -100,
  opacity: 0,
  rotation: gsap.utils.random(-80, 20),
  duration: 0.5,
  ease: "back",
  stagger: 0.04
});

// Animate lines
animateSection(".Lines", "lines", {
  rotationX: -100,
  transformOrigin: "50% 50% -160px",
  opacity: 0,
  duration: 0.8,
  ease: "power1",
  stagger: 0.2
});

// Special case for animated text
let animatedText = document.querySelector(".animated-text");
if (animatedText) {
  let chars = splitText(animatedText, "chars");

  gsap.from(chars, {
    scrollTrigger: {
      trigger: animatedText,
      start: "top 90%",
      end: "top 40%",
      scrub: true,
    },
    scale: 0.5,
    opacity: 0,
    duration: 2,
    stagger: 0.05
  });
}


// ================= counter ==============
document.addEventListener("DOMContentLoaded", function () {
  function incrementCounter(element) {
    const targetCount = parseInt(element.textContent, 10);
    let countNum = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      countNum = Math.floor(progress * targetCount);
      element.textContent = countNum;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetCount;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  window.addEventListener("scroll", function () {
    document.querySelectorAll(".stats-item").forEach(function (counterSection) {
      const rect = counterSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (!counterSection.classList.contains("counted") && rect.top < windowHeight - 50) {
        counterSection.classList.add("counted");
        const countElement = counterSection.querySelector(".count");
        if (countElement) {
          incrementCounter(countElement);
        }
      }
    });
  });
});




// ================== progressbar =============

const containers = document.querySelectorAll('.progress-container');

containers.forEach(container => {
  const circle = container.querySelector('.progress-ring__circle');
  const r = circle.r.baseVal.value;
  const c = 2 * Math.PI * r;
  circle.style.strokeDasharray = c;
  circle.style.strokeDashoffset = c;
  container._progressData = { circle, c };
});

function animateProgressBars() {
  containers.forEach(container => {
    const percent = +container.dataset.percent;
    const { circle, c } = container._progressData;
    const text = container.querySelector('.progress-text');

    gsap.set(circle, { strokeDashoffset: c });
    text.textContent = "0%";

    gsap.to(circle, {
      strokeDashoffset: c - (percent / 100) * c,
      duration: 1.5,
      ease: "power2.out"
    });

    const counter = { val: 0 };
    gsap.to(counter, {
      val: percent,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        text.textContent = `${Math.round(counter.val)}%`;
      }
    });
  });
}

ScrollTrigger.create({
  trigger: ".progress-grid",
  start: "top 80%",
  end: "bottom top",
  toggleActions: "play none none reset",
  onEnter: animateProgressBars,
  onLeaveBack: animateProgressBars
});