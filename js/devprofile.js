const profilePic = document.getElementById("profile-pic");
const certificate = document.getElementById("certificate");
const confettiWrapper = document.getElementById("confetti-wrapper");

profilePic.addEventListener("click", () => {
  certificate.classList.toggle("show");

  if (certificate.classList.contains("show")) {
    launchConfetti();
    setTimeout(() => {
      confettiWrapper.innerHTML = "";
    }, 3000);
  }
});

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    confetti.style.backgroundColor =
      ["#f9d423", "#ff4e50", "#e1eec3", "#f7797d", "#c6ffdd"][
        Math.floor(Math.random() * 5)
      ];
    confettiWrapper.appendChild(confetti);
  }
}
