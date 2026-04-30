const preloader = document.getElementById("preloader");
const typingText = document.getElementById("typingText");
const confettiBtn = document.getElementById("confettiBtn");
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");

window.addEventListener("load", () => {
  setTimeout(() => preloader.classList.add("hidden"), 750);
});

const message = "Сегодня твой день — день красоты, любви, улыбок и самых нежных слов. Пусть этот маленький сайт станет приятным подарком для тебя.";
let charIndex = 0;

function typeWriter() {
  if (charIndex < message.length) {
    typingText.textContent += message.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 34);
  }
}
setTimeout(typeWriter, 1000);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

function launchConfetti() {
  const colors = ["#ef6d93", "#8f2f4e", "#e7ba67", "#ff9db6", "#ffffff"];
  for (let i = 0; i < 110; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.75 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3800);
  }
}

confettiBtn.addEventListener("click", launchConfetti);

openModal.addEventListener("click", () => {
  modal.classList.add("show");
  launchConfetti();
});

closeModal.addEventListener("click", () => modal.classList.remove("show"));

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("show");
});

musicBtn.addEventListener("click", async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicBtn.classList.add("playing");
      musicBtn.textContent = "♫ Играет";
    } else {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
      musicBtn.textContent = "♫ Музыка";
    }
  } catch (e) {
    alert("Чтобы музыка работала, добавь файл music.mp3 в папку audio.");
  }
});

let sparks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createSparks() {
  sparks = [];
  for (let i = 0; i < 80; i++) {
    sparks.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: Math.random() * -0.25 - 0.08,
      alpha: Math.random() * 0.7 + 0.2
    });
  }
}

function animateSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(143, 47, 78, ${s.alpha})`;
    ctx.fill();

    s.x += s.vx;
    s.y += s.vy;

    if (s.y < -10) {
      s.y = canvas.height + 10;
      s.x = Math.random() * canvas.width;
    }

    if (s.x < -10) s.x = canvas.width + 10;
    if (s.x > canvas.width + 10) s.x = -10;
  });

  requestAnimationFrame(animateSparks);
}

createSparks();
animateSparks();
