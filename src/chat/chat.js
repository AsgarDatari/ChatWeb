import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

window.onload = document.getElementById("profile-username").innerHTML =
  localStorage.getItem("username");

const email = localStorage.getItem("email");
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
const username = localStorage.getItem("username");

document.getElementById("message-btn").addEventListener("click", sendMessage);

function sendMessage(e) {
  e.preventDefault();

  const messageInput = document.getElementById("message-box");
  const message = messageInput.value;

  if (message.trim() !== "") {
    const timestamp = Date.now();
    messageInput.value = "";

    db.ref("messages/" + timestamp).set({
      username,
      email,
      message,
      timestamp: timestamp,
    });
  }

  document.getElementById("messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

// Fetch messages from Firebase Realtime Database
const fetchChat = db.ref("messages/");

<<<<<<< Updated upstream
fetchChat.on("child_added", function(snapshot) {
  const messages = snapshot.val();
  const messageTime = new Date(messages.timestamp);
  const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const message = `<li class="message ${
    username === messages.username ? "sent" : "receive"
  }">
    <img src="https://api.dicebear.com/8.x/initials/svg?seed=${messages.username}?backgroundColor=b6e3f4,c0aede,d1d4f9">
    <span>
      <b>${messages.username}</b><br>
      ${messages.message}<br>
      <small>${formattedTime}</small>
    </span>
  </li>`;

  document.getElementById("messages").innerHTML += message;

  document.getElementById("messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
=======
fetchChat.on("child_added",  function (snapshot) {
  {
    const messages = snapshot.val();
    const messageTime = new Date(messages.timestamp);
    const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const message = `<li class="message ${
      username === messages.username ? "sent" : "receive"
    }">
    <img src="https://api.dicebear.com/8.x/initials/svg?seed=${
      messages.username
    }?backgroundColor=b6e3f4,c0aede,d1d4f9"> <span> <b> ${
      messages.username
    } </b><br> </span>${messages.message}<br>
    <small>${formattedTime}</small> </li>`;
    document.getElementById("messages").innerHTML += message;
  }
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
>>>>>>> Stashed changes
});
