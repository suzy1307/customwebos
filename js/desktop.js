window.onload = () => {
  const user = localStorage.getItem('bestieUser') || 'Bestie';
  const usernameEl = document.getElementById('user-name');
  if (usernameEl) {
    usernameEl.innerHTML = `👩‍💻👨‍💻 Welcome, ${user.toLowerCase()}!`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  updateIconsVisibility();
};

// ⏰ Clock Function
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.textContent = time;
}

// 🎯 Icon Unlock Logic
function updateIconsVisibility() {
  const clue1Unlocked = localStorage.getItem('clue1Unlocked') === 'true';
  const commitLogReady = localStorage.getItem('commitLogReady') === 'true';
  const clue2Unlocked = localStorage.getItem('clue2Unlocked') === 'true';
  const treasureUnlocked = localStorage.getItem('treasureUnlocked') === 'true';

  const icons = {
    terminal: document.getElementById('terminalIcon'),
    commitLog: document.getElementById('commitLogIcon'),
    library: document.getElementById('libraryIcon'),
    devProfile: document.getElementById('devProfileIcon'),
    gift: document.getElementById('giftIcon'),
  };

  // Terminal - always enabled
  if (icons.terminal) {
    icons.terminal.classList.remove('locked');
    icons.terminal.style.opacity = "1";
    icons.terminal.style.pointerEvents = "auto";
    icons.terminal.onclick = () => window.open("apps/terminal.html", "_blank");
  }

  // CommitLog - unlocked only after clue1 and user exits terminal
  if (icons.commitLog) {
    if (clue1Unlocked && commitLogReady) {
      icons.commitLog.classList.remove('locked');
      icons.commitLog.style.opacity = "1";
      icons.commitLog.style.pointerEvents = "auto";
      icons.commitLog.onclick = () => window.open("apps/commitlog.html", "_blank");
    } else {
      icons.commitLog.classList.add('locked');
      icons.commitLog.style.opacity = "0.3";
      icons.commitLog.style.pointerEvents = "none";
      icons.commitLog.onclick = () =>
        alert("🔒 This log is still locked.\nSolve the Bat-Terminal and exit to unlock it.");
    }
  }

  // Library - unlocked by clue2
  if (icons.library) {
    if (clue2Unlocked) {
      icons.library.classList.remove('locked');
      icons.library.style.opacity = "1";
      icons.library.style.pointerEvents = "auto";
      icons.library.onclick = () => window.open("apps/library.html", "_blank");
    } else {
      icons.library.classList.add('locked');
      icons.library.style.opacity = "0.3";
      icons.library.style.pointerEvents = "none";
      icons.library.onclick = () =>
        alert("🔒 Library is locked.\nClue 3 awaits inside the second CommitLog profile! 🧠");
    }
  }

  // DevProfile - unlocked by clue2
  if (icons.devProfile) {
    if (clue2Unlocked) {
      icons.devProfile.classList.remove('locked');
      icons.devProfile.style.opacity = "1";
      icons.devProfile.style.pointerEvents = "auto";
      icons.devProfile.onclick = () => window.open("apps/devprofile.html", "_blank");
    } else {
      icons.devProfile.classList.add('locked');
      icons.devProfile.style.opacity = "0.3";
      icons.devProfile.style.pointerEvents = "none";
      icons.devProfile.onclick = () =>
        alert("🔒 Your profile is locked.\nClue 3 must be solved to unlock your promotion reveal!");
    }
  }

  // GiftVault - unlocked by treasure
  if (icons.gift) {
    if (treasureUnlocked) {
      icons.gift.classList.remove('locked');
      icons.gift.style.opacity = "1";
      icons.gift.style.pointerEvents = "auto";
      icons.gift.onclick = () => window.open("apps/giftvault.html", "_blank");
    } else {
      icons.gift.classList.add('locked');
      icons.gift.style.opacity = "0.3";
      icons.gift.style.pointerEvents = "none";
      icons.gift.onclick = () =>
        alert("🔒 Solve all clues to unlock the final treasure!");
    }
  }
}
