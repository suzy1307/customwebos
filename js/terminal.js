const output = document.getElementById('output');
const input = document.getElementById('commandInput');

let stage = 0;

const stages = [
  {
    prompt: "📜 Clue 1:\n\"Find what’s hidden in plain sight,\nA command that shows your files right.\"",
    answer: "ls",
    success: "✅ A hidden file appears: .clue1.txt\n💬 It whispers: \"The real treasure is only found by those who READ...\""
  },
  {
    prompt: "📜 Clue 2:\n\"If .clue1.txt you can read,\nThe next path will soon proceed.\"",
    answer: "cat .clue1.txt",
    success: "✅ New file found: /tmp/gotham-secrets/clue2.sh\n💬 Alfred left a script..."
  },
  {
    prompt: "📜 Clue 3:\n\"Run the script Alfred planted,\nOnly then your clue will be granted.\"",
    answer: "/tmp/gotham-secrets/clue2.sh",
    success: "✅ Hidden date file found: ~/bat_cave/hidden_date.txt"
  },
  {
    prompt: "📜 Clue 4:\n\"Type the command that brings forth dates,\nTo see what the cave of time creates.\"",
    answer: "cal",
    success: "✅ The final key appears: secret.sh"
  },
  {
    prompt: "🗝️ Final Lock:\nTo reveal your final treasure, enter the command:",
    answer: "~/bat_cave/secret.sh",
    success: "🎉 𝙃𝘼𝙋𝙋𝙔 𝘽𝙄𝙍𝙏𝙃𝘿𝘼𝙔 𝘽𝙀𝙎𝙏𝙄𝙀 💛\nFrom your Bat-Friend 💻🦇"
  }
];

function printLine(text) {
  output.textContent += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

function handleCommand(e) {
  if (e.key !== 'Enter') return;

  const cmd = input.value.trim();
  printLine(`\n> ${cmd}`);
  input.value = '';

  // Allow exit only after final clue is solved
  if (cmd === "exit") {
    if (stage === stages.length) {
      printLine("🔐 Returning to the Desktop...");
      localStorage.setItem('commitLogReady', 'true');  // ✅ Set here only after full completion
      setTimeout(() => {
        window.location.href = "../desktop.html";
      }, 1200);
    } else {
      printLine("⛔ You can't exit yet! Complete all clues to unlock the way back.");
    }
    return;
  }

  const current = stages[stage];
  if (cmd === current.answer) {
    printLine(current.success);

    // Unlock CommitLog after first clue
    if (stage === 0) {
      localStorage.setItem('clue1Unlocked', 'true');
      printLine("🔓 You’ve unlocked the 📜 CommitLog on the desktop 💛");
    }

    // Final stage logic
    if (stage === stages.length - 1) {
      localStorage.setItem('treasureUnlocked', 'true');
      setTimeout(() => {
        printLine("\n🔓 The 🎁 GiftVault icon has been unlocked on your desktop!");
        printLine("🕹️ Type `exit` to return to your desktop and continue your quest 💛");
      }, 1500);
    }

    stage++;
    localStorage.setItem('terminalStage', stage); // Save progress

    if (stage < stages.length) {
      setTimeout(() => printLine(`\n${stages[stage].prompt}`), 1200);
    }
  } else {
    printLine("❌ That's not it. Try again, Detective.");
  }
}

input.addEventListener('keydown', handleCommand);

// Initial startup
setTimeout(() => {
  printLine("🦇 Tonight’s mission comes from Alfred...");
  setTimeout(() => {
    printLine("He left clues behind… hidden deep in the system.\n");
    printLine("💡 Solve all riddles to uncover the final birthday message.\n");
    printLine(stages[0].prompt);
  }, 1500);
}, 1000);
