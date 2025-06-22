// Load user's name
const user = localStorage.getItem("batmarvel_user");
document.getElementById("user-name").textContent = `🦸 Welcome, ${user}!`;

// Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Theme & Video logic
const toggleBtn = document.getElementById("themeToggle");
const video = document.getElementById("bg-video");

function setTheme(theme) {
  const body = document.body;
  body.className = ''; // clear all classes
  body.classList.add(theme);

  if (theme === "batman-theme") {
    video.src = "assets/videos/batman.mp4";
    toggleBtn.textContent = "Switch to Spider-Man";
  } else {
    video.src = "assets/videos/spiderman.mp4";
    toggleBtn.textContent = "Switch to Batman";
  }

  video.load();
  video.play();
}

// Initial load
setTheme("batman-theme");

// Toggle button
toggleBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("batman-theme") ? "spiderman-theme" : "batman-theme";
  setTheme(newTheme);
});
