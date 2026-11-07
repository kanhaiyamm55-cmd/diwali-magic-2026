
const $ = (selector) => document.querySelector(selector);

// ==========================================
// 1. DIWALI SURPRISE MESSAGES
// ==========================================

const modal = $("#surpriseModal");

const messages = {
  family: {
    kicker: "TO MY FIRST HOME",
    title: "For my Family ♡",
    message: `Mummy, Papa and my dear family — thank you for every sacrifice, every prayer, every lesson and every hug that made me who I am.

No success, no celebration and no light could ever be brighter than the love you have given me.

My biggest wish is to make you proud and give you countless reasons to smile.

I may not say it every day, but I love you more than words can explain.

Happy Diwali! ❤️`
  },

  friends: {
    kicker: "TO MY FAVOURITE TROUBLEMAKERS",
    title: "For my Friends ✳",
    message: `Life would be a very boring movie without your random jokes, crazy plans, endless talks and unforgettable memories.

Thanks for being the plot twists, the comic relief and the people who make ordinary days legendary.

May your life be full of wins, laughter, good vibes and unforgettable memories.

Stay crazy, stay brilliant.

Happy Diwali, legends! 🎉`
  },

  special: {
    kicker: "A LITTLE SECRET",
    title: "For Someone Special ∞",
    message: `Some people do not need to do anything extraordinary to make a day feel special.

Their presence is enough.

You are one of those rare people who bring a little extra warmth, a little extra smile and a little magic into ordinary moments.

I hope this Diwali brings you the happiness you quietly wish for and all the beautiful things you truly deserve.

Keep shining. ✨❤️`
  }
};


// ==========================================
// 2. OPEN AND CLOSE SURPRISE
// ==========================================

function openSurprise(type) {
  const item = messages[type];
  if (!item) return;

  $("#modalKicker").textContent = item.kicker;
  $("#modalTitle").textContent = item.title;
  $("#modalMessage").textContent = item.message;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  burst(window.innerWidth / 2, window.innerHeight / 2, 95);
}

function closeSurprise() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-surprise]").forEach(button => {
  button.addEventListener("click", () => {
    openSurprise(button.dataset.surprise);
  });
});

$("#modalClose").addEventListener("click", closeSurprise);

modal.addEventListener("click", event => {
  if (event.target.dataset.close) closeSurprise();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeSurprise();
});


// ==========================================
// 3. FIREWORKS ENGINE
// ==========================================

const canvas = $("#fireworks");
const ctx = canvas.getContext("2d");

let W, H;
let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  W = window.innerWidth;
  H = window.innerHeight;

  canvas.width = W * dpr;
  canvas.height = H * dpr;

  canvas.style.width = W + "px";
  canvas.style.height = H + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burst(x, y, count = 70) {
  const colors = [
    "#f5d58e",
    "#e6a84f",
    "#fff0c2",
    "#d87950",
    "#f7f0dd"
  ];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.1 + Math.random() * 5.2;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 55 + Math.random() * 45,
      max: 100,
      size: 1 + Math.random() * 2.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, W, H);

  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.035;
    p.vx *= 0.99;
    p.life--;

    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = p.color;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

function randomBurst() {
  burst(
    W * (0.18 + Math.random() * 0.64),
    H * (0.12 + Math.random() * 0.42),
    55
  );
}


// ==========================================
// 4. FIREWORKS BUTTON
// ==========================================

$("#igniteBtn").addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(randomBurst, i * 180);
  }
});


// ==========================================
// 5. WISH GENERATOR
// ==========================================

$("#wishBtn").addEventListener("click", () => {
  const wishes = [
    "May your dreams find their way home. ✨",
    "May your home overflow with laughter and light. 🪔",
    "May the coming year surprise you beautifully. 🌟",
    "May every new beginning bring you closer to joy. ❤️",
    "May Goddess Lakshmi bless your home with prosperity. 🪷",
    "May your life shine brighter than a thousand diyas. 🪔",
    "May happiness, peace and success always follow you. ✨"
  ];

  $("#wishResult").textContent =
    wishes[Math.floor(Math.random() * wishes.length)];

  for (let i = 0; i < 7; i++) {
    setTimeout(randomBurst, i * 160);
  }
});


// ==========================================
// 6. SCROLL REVEAL
// ==========================================

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


// ==========================================
// 7. MOBILE NAVIGATION
// ==========================================

$("#menuToggle").addEventListener("click", () => {
  $("#navLinks").classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    $("#navLinks").classList.remove("show");
  });
});


// ==========================================
// 8. CURSOR GLOW
// ==========================================

const glow = $("#cursorGlow");

window.addEventListener("pointermove", event => {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});


// ==========================================
// 9. SOUND SYSTEM - DEFAULT ON
// ==========================================

let audioContext = null;
let soundOn = true;
let soundTimer = null;

const soundButton = $("#soundToggle");

function updateSoundButton() {
  const label = soundButton.querySelector("i");
  const icon = soundButton.querySelector("span");

  if (label) label.textContent = soundOn ? "Sound on" : "Sound off";
  if (icon) icon.textContent = soundOn ? "♫" : "♪";

  soundButton.setAttribute("aria-pressed", String(soundOn));
}

// Immediately show Sound ON
updateSoundButton();

function playChime() {
  if (!soundOn || !audioContext) return;

  const notes = [523.25, 659.25, 783.99, 659.25];
  const freq = notes[Math.floor(Math.random() * notes.length)];

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = "sine";
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.025, audioContext.currentTime + 0.04
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001, audioContext.currentTime + 0.7
  );

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + 0.72);
}

async function unlockSound() {
  if (!soundOn) return;

  try {
    if (!audioContext) {
      audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    if (!soundTimer) {
      playChime();
      soundTimer = setInterval(playChime, 3000);
    }
  } catch (error) {
    console.log("Audio unavailable:", error);
  }
}

// Sound begins on first visitor interaction
document.addEventListener("pointerdown", event => {
  if (!event.target.closest("#soundToggle")) {
    unlockSound();
  }
}, { once: true });

soundButton.addEventListener("click", async () => {
  if (soundOn) {
    soundOn = false;
    clearInterval(soundTimer);
    soundTimer = null;
  } else {
    soundOn = true;
    await unlockSound();
  }

  updateSoundButton();
});


// ==========================================
// 10. DIWALI GREETING VOICE
// ==========================================

let voiceFinished = false;
let voiceStarted = false;
let visitorInteracted = false;

const greetingText =
  "Hello and welcome to Diwali Magic 2026. " +
  "May this beautiful festival of lights fill your home " +
  "with happiness, love, peace and prosperity. " +
  "May every diya bring new hope, every sparkle bring a smile, " +
  "and every moment bring beautiful memories. " +
  "Wishing you and your family a wonderful and blessed Diwali. " +
  "Happy Diwali!";

function speakGreeting() {
  if (!("speechSynthesis" in window)) return;
  if (voiceFinished || voiceStarted) return;

  voiceStarted = true;

  const message = new SpeechSynthesisUtterance(greetingText);

  message.lang = "en-IN";
  message.rate = 0.88;
  message.pitch = 1.15;
  message.volume = 1;

  message.onend = () => {
    voiceFinished = true;
    voiceStarted = false;
  };

  message.onerror = () => {
    voiceStarted = false;
  };

  window.speechSynthesis.speak(message);
}

// Try to speak after one second
window.addEventListener("load", () => {
  setTimeout(() => {
    speakGreeting();
  }, 1000);
});

// If browser blocks automatic speech,
// start greeting on the visitor's first tap.
document.addEventListener("pointerdown", () => {
  visitorInteracted = true;

  if (!voiceFinished && !voiceStarted) {
    speakGreeting();
  }
}, { once: true });


// ==========================================
// 11. INITIAL DIWALI SPARKLE
// ==========================================

setTimeout(() => {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    burst(W * 0.78, H * 0.25, 38);
  }
}, 900);
