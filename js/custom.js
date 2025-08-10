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
