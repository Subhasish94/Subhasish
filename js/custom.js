// Typing effect
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

    timer.innerHTML = "Launch In: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
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