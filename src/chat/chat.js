window.onload = document.getElementById("profile-username").innerHTML =
  localStorage.getItem("userName");

const firebaseConfig = {
  apiKey: "AIzaSyBumQaN29IZF8LqvB3kqUIgF7v1r5m2Hv0",
  authDomain: "chatweb-awful.firebaseapp.com",
  databaseURL:
    "https://chatweb-awful-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatweb-awful",
  storageBucket: "chatweb-awful.appspot.com",
  messagingSenderId: "693279532996",
  appId: "1:693279532996:web:cf6404be59950947e26691",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const username = localStorage.getItem("userName");

document.getElementById("message-btn").addEventListener("click", sendMessage);

function sendMessage(e) {
  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-box");
  const message = messageInput.value;

  messageInput.value = "";

  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class="message ${
    username === messages.username ? "sent" : "receive"
  }">
  <img src="user-icon-png.png"><span>${messages.username}: <br></span>${
    messages.message
  }</li>`;

  document.getElementById("messages").innerHTML += message;
});
