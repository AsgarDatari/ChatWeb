import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const statusCollectionRef = collection(db, "status");

async function updateOnlineUsers() {
  const db_status = await getDocs(query(statusCollectionRef, where("status", "==", "Online")));
  const onlineUsersElement = document.getElementById("onlineUsers");
  onlineUsersElement.innerHTML = "";

  if (db_status.empty) {
    throw new Error("No user found with this email");
  }

  db_status.forEach(async (doc) => {
    const uemail = doc.data().email;
    const uname = doc.data().username;

    if (uname !== localStorage.getItem("username")) {
      const message = `<li class="onlineUsername">
        <b>${uname}</b>
        <ul type="none">
          <li class="onlineEmail">${uemail}</li>
        </ul>
      </li>`;
      onlineUsersElement.innerHTML += message;
    }

    const docRef = doc.ref;
    await updateDoc(docRef, { status: "Online" });
  });
}

updateOnlineUsers();

setInterval(updateOnlineUsers, 10000);

document.getElementById("refresh-btn").addEventListener("click", updateOnlineUsers);


const email = localStorage.getItem("email");
const db_offline_check = await getDocs(
  query(statusCollectionRef, where("email", "==", email))
);

function offlineFuntion(e) {
  e.preventDefault();
  if (db_offline_check.empty) {
    throw new Error("No user found with this email");
  }
  let uname = "";
  db_offline_check.forEach(async (doc) => {
    var uname = doc.data().email;
    console.log(uname);
    const docRef = doc.ref;
    await updateDoc(docRef, { status: "Offline" });
    window.location.href = "../../index.html";
  });
}


document
  .getElementById("signOutButton")
  .addEventListener("click", offlineFuntion);
document
  .getElementById("singOut-icon")
  .addEventListener("click", offlineFuntion);
