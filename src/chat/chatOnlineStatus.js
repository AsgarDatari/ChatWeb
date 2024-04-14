import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, where, query, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBumQaN29IZF8LqvB3kqUIgF7v1r5m2Hv0",
    authDomain: "chatweb-awful.firebaseapp.com",
    databaseURL: "https://chatweb-awful-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatweb-awful",
    storageBucket: "chatweb-awful.appspot.com",
    messagingSenderId: "693279532996",
    appId: "1:693279532996:web:cf6404be59950947e26691",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const statusCollectionRef = collection(db, 'status');
const db_status = await getDocs(query(statusCollectionRef, where("status", "==", "Online")));
function onlineFunction(e){
    document.getElementById("onlineUsers").innerHTML = "";
    e.preventDefault();
    if (db_status.empty) {
        throw new Error("No user found with this email");
    }
    let uname = "";
    db_status.forEach(async (doc) => {
        uname = doc.data().email;
        console.log(uname);
        const message = `<li class="onlineUser">
            ${uname}
        </li>`;
        document.getElementById("onlineUsers").innerHTML += message;

        const docRef = doc.ref;
        await updateDoc(docRef, { status: "Online" });
    });
}

const email = localStorage.getItem("email");
const db_offline_check = await getDocs(query(statusCollectionRef, where("email", "==", email)));

function offlineFuntion(e){
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

document.getElementById("submitButton").addEventListener("click", onlineFunction);

document.getElementById("signOutButton").addEventListener("click", offlineFuntion);

