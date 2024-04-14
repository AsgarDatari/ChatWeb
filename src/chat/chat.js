import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, where, query, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

window.onload = document.getElementById("profile-username").innerHTML =
  localStorage.getItem("userName");

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
const username = localStorage.getItem("userName");

document.getElementById("message-btn").addEventListener("click", sendMessage);

function sendMessage(e) {
  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-box");
  const message = messageInput.value;

  if(message !== ''){
    messageInput.value = "";
    
    db.ref("messages/" + timestamp).set({
      username,
      email,
      message,
    });
  }
  
  document
  .getElementById("messages")
  .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  {
    const messages = snapshot.val();
    const message = `<li class="message ${
      username === messages.username ? "sent" : "receive"
    }">
    <img src="user-icon-png.png"><span> <b> ${messages.username} </b> <sup> ${messages.email} </sup> <br> </span>${
      messages.message
    }</li>`;

    document.getElementById("messages").innerHTML += message;
  }
  document
  .getElementById("messages")
  .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
});



