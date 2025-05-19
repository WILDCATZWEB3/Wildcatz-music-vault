let currentUser = null;

function signUp() {
  const user = document.getElementById("signupUsername").value;
  const pass = document.getElementById("signupPassword").value;
  if (!user || !pass) return alert("Fill all fields");

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[user]) return alert("User already exists");

  users[user] = { password: pass, uploads: [] };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created. Please log in.");
}

function signIn() {
  const user = document.getElementById("signinUsername").value;
  const pass = document.getElementById("signinPassword").value;
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[user] || users[user].password !== pass) {
    return alert("Invalid credentials");
  }

  currentUser = user;
  document.getElementById("authSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";
  document.getElementById("welcomeUser").innerText = `Welcome, ${user}`;
  renderSongs();
}

function signOut() {
  currentUser = null;
  document.getElementById("authSection").style.display = "block";
  document.getElementById("appSection").style.display = "none";
}

function uploadSong() {
  const title = document.getElementById("songTitle").value;
  const url = document.getElementById("songLink").value;
  if (!title || !url) return alert("Fill all fields");

  const users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].uploads.push({ title, url, by: currentUser });
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("songTitle").value = '';
  document.getElementById("songLink").value = '';
  renderSongs();
}

function renderSongs(filter = "") {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const allSongs = Object.values(users).flatMap(user => user.uploads);
  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  allSongs
    .filter(song => song.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(song => {
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `<strong>${song.title}</strong> by ${song.by}<br><a href="${song.url}" target="_blank">Listen</a>`;
      songList.appendChild(card);
    });
}

function searchSongs() {
  const filter = document.getElementById("searchBox").value;
  renderSongs(filter);
}