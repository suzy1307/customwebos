function login() {
    const username = document.getElementById('username').value.trim();
    if (username) {
      localStorage.setItem('batmarvel_user', username);
      window.location.href = 'desktop.html'; // next step
    } else {
      alert("Please enter your superhero name!");
    }
  }
  