window.onload = () => {
    const user = localStorage.getItem('bestieUser') || 'Bestie';
    document.getElementById('user-name').innerHTML = `👩‍💻👨‍💻 Welcome, ${user.toLowerCase()}!`;
  
    updateClock();
    setInterval(updateClock, 1000);
  
    updateIconsVisibility();
  };
  
  // ⏰ Clock Function
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('clock').textContent = time;
  }
  
  // 🎯 Show/Hide CommitLog and GiftVault based on localStorage
  function updateIconsVisibility() {
    const clue1Unlocked = localStorage.getItem('clue1Unlocked') === 'true';
    const treasureUnlocked = localStorage.getItem('treasureUnlocked') === 'true';
  
    const commitLogIcon = document.getElementById('commitLogIcon');
    const giftIcon = document.querySelectorAll('.icon')[4]; // Assuming 5th icon = GiftVault
  
    if (clue1Unlocked) {
      commitLogIcon.style.opacity = '1';
      commitLogIcon.style.pointerEvents = 'auto';
    } else {
      commitLogIcon.style.opacity = '0.5';
      commitLogIcon.style.pointerEvents = 'none';
    }
  
    if (treasureUnlocked) {
      giftIcon.style.opacity = '1';
      giftIcon.style.pointerEvents = 'auto';
    } else {
      giftIcon.style.opacity = '0.3';
      giftIcon.style.pointerEvents = 'none';
    }
  }
  