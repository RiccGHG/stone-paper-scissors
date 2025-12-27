const emojis = ["🎮", "🪨", "📄", "✂️", "🎲", "🎯"];
const count = 12; // wie viele Emojis
const layer = document.getElementById("bg-emoji-layer");

for (let i = 0; i < count; i++) {
  const span = document.createElement("span");
  span.className = "bg-emoji";
  span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  span.style.top = Math.random() * 100 + "vh";
  span.style.left = Math.random() * 100 + "vw";
  span.style.transform = `rotate(${Math.random() * 360}deg)`;

  layer.appendChild(span);
}