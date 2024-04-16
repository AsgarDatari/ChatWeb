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

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-box");
  const message = messageInput.value;

  if (message !== "") {
    messageInput.value = "";

    db.ref("messages/" + timestamp).set({
      username,
      email,
      message,
      timestamp
    });
  }

  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function(snapshot) {
  const messages = snapshot.val();
  const date = new Date(messages.timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  const formattedDateTime = `${hours}:${minutes}`;

  const containerId = `day${day}-month${month}-year${year}`;
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.className = "message-container";
    container.innerHTML = `<h3 class = "messageDate" align= "center" >${dayOfWeek} | ${day}-${month}-${year}</h3>`;
    document.getElementById("messages").appendChild(container);
  }

  // const message = `<li class="message ${
  //   username === messages.username ? "sent" : "receive"
  // }">
  //   <img src="https://api.dicebear.com/8.x/initials/svg?seed=${
  //     messages.username
  //   }?backgroundColor=b6e3f4,c0aede,d1d4f9"> <span> <b> ${
  //   messages.username
  // } </b><br> </span>${messages.message}<br> <sup class = "chatTime"> ${formattedDateTime} </sup></li>`;
  // container.innerHTML += message;

  let messageClass;
  if (username === messages.username) {
      messageClass = "sent";
      const message = `<li class="message ${messageClass}">
      <img src="https://api.dicebear.com/8.x/initials/svg?seed=${messages.username}?backgroundColor=b6e3f4,c0aede,d1d4f9">
      ${messages.message}<br>
      <sup class="chatTime">${formattedDateTime}</sup></li>`;
      container.innerHTML += message;
  } else {
      messageClass = "receive";

      //LOOK here MRUNAL
      let userID = messages.username;
      var colors = ['#F5CB39', '#25D366', '#0085C3', '#FF9900', '#ED1C16'];
      var colorIndex = userID.length % colors.length;
      const message = `<li class="message ${messageClass}">

      <img src="https://api.dicebear.com/8.x/initials/svg?seed=${messages.username}?backgroundColor=b6e3f4,c0aede,d1d4f9">
      <span style="color: ${colorIndex};"><b>${messages.username}</b><br></span>
      ${messages.message}<br>
      <sup class="chatTime">${formattedDateTime}</sup></li>`;
      container.innerHTML += message;
  }

  container.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest"
  });
});

