let text = "Coming Soon";
let i = 0;
let deleting = false;
let typingText = document.getElementById("typing-text");

function type() {
    if (!deleting) {
        typingText.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) {
            deleting = true;
            setTimeout(type, 1000);
            return;
        }
    } else {
        typingText.textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) {
            deleting = false;
        }
    }
    setTimeout(type, deleting ? 80 : 150);
}
type();

// Countdown
let launchDate = new Date("2025-09-15T00:00:00").getTime();
let timer = document.getElementById("timer");

function updateCountdown() {
    let now = new Date().getTime();
    let diff = launchDate - now;

    if (diff <= 0) {
        timer.innerHTML = "We're Live!";
        return;
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    timer.innerHTML = "Launch In: " + days + "D " + hours + "H " + minutes + "M " + seconds + "S";
}

updateCountdown();
setInterval(updateCountdown, 1000);


function updateClock() {
    const clock = document.getElementById('clock');
    const ampm = document.getElementById('ampm');
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Determine AM/PM
    let period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // if hour == 0, set to 12

    // Pad with leading zeros
    let h = hours.toString().padStart(2, '0');
    let m = minutes.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');

    clock.textContent = `${h}:${m}:${s}`;
    ampm.textContent = period;
}

setInterval(updateClock, 1000);
updateClock();


// === JS: Starfield animation setup ===
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    // === JS: Create stars array with random properties ===
    const starsCount = 200;
    const stars = [];

    function randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: randomRange(0.4, 1.3),
        alpha: randomRange(0.3, 1),
        alphaChange: randomRange(0.001, 0.005),
        speed: randomRange(0.1, 0.4)
      });
    }

    // === JS: Main animation loop for stars twinkling and moving ===
    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let star of stars) {
        star.y += star.speed;
        if (star.y > height) star.y = 0;

        star.alpha += star.alphaChange;
        if (star.alpha <= 0.3 || star.alpha >= 1) star.alphaChange *= -1;

        ctx.beginPath();
        let glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
        glow.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    draw();