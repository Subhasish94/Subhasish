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

// GSAP Animations
// gsap.from(".glow-text", { opacity: 0, y: -50, duration: 2 });
// gsap.from(".glow-text p", { opacity: 0, y: 50, delay: 1, duration: 2 });



// // Particles.js Initialization
// particlesJS("particles-js", {
//   "particles": {
//     "number": {
//       "value": 120,
//       "density": {
//         "enable": true,
//         "value_area": 600
//       }
//     },
//     "color": {
//       "value": "#00ffff"
//     },
//     "shape": {
//       "type": "polygon",
//       "polygon": {
//         "nb_sides": 5
//       }
//     },
//     "opacity": {
//       "value": 0.5,
//       "random": true
//     },
//     "size": {
//       "value": 3,
//       "random": true
//     },
//     "line_linked": {
//       "enable": true,
//       "distance": 100,
//       "color": "#00ffff",
//       "opacity": 0.4,
//       "width": 1
//     },
//     "move": {
//       "enable": true,
//       "speed": 2,
//       "direction": "none",
//       "random": false,
//       "straight": false,
//       "out_mode": "out",
//       "bounce": false
//     }
//   },
//   "interactivity": {
//     "detect_on": "canvas",
//     "events": {
//       "onhover": {
//         "enable": true,
//         "mode": "grab"
//       },
//       "onclick": {
//         "enable": true,
//         "mode": "push"
//       },
//       "resize": true
//     },
//     "modes": {
//       "grab": {
//         "distance": 150,
//         "line_linked": {
//           "opacity": 1
//         }
//       },
//       "bubble": {
//         "distance": 200,
//         "size": 50,
//         "duration": 2,
//         "opacity": 8,
//         "speed": 3
//       },
//       "repulse": {
//         "distance": 200,
//         "duration": 0.4
//       },
//       "push": {
//         "particles_nb": 4
//       },
//       "remove": {
//         "particles_nb": 2
//       }
//     }
//   },
//   "retina_detect": true
// });


// gsap.registerPlugin(SplitText, ScrollTrigger);

// function animateSection(sectionClass, splitType, vars) {
//   const sections = document.querySelectorAll(sectionClass);
//   sections.forEach(section => {
//     section.querySelectorAll("h1,h2,h3,h4,h5,h6,p,ul,li").forEach(el => {
//       let split = SplitText.create(el, { type: splitType });
//       gsap.from(split[splitType], {
//         ...vars,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 80%",
//           toggleActions: "play none none reverse"
//         }
//       });
//     });
//   });
// }

// // Animate all sections by their class
// animateSection(".Characters", "chars", {
//   x: 150,
//   opacity: 0,
//   duration: .5,
//   ease: "power4",
//   stagger: 0.04
// });

// animateSection(".Words", "words", {
//   y: -100,
//   opacity: 0,
//   rotation: "random(-80, 20)",
//   duration: 0.5,
//   ease: "back",
//   stagger: 0.04
// });

// animateSection(".Lines", "lines", {
//   rotationX: -100,
//   transformOrigin: "50% 50% -160px",
//   opacity: 0,
//   duration: 0.8,
//   ease: "power1",
//   stagger: 0.2
// });

// gsap.from(animatedText, {
//   scrollTrigger: {
//     trigger: animatedText,
//     start: "top 90%",
//     end: "top 40%",
//     scrub: true,
//   },
//   scale: 0.5,
//   opacity: 0,
//   duration: 2,
// });

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