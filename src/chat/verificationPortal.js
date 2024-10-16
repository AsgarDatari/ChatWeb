import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBumQaN29IZF8LqvB3kqUIgF7v1r5m2Hv0",
    authDomain: "chatweb-awful.firebaseapp.com",
    projectId: "chatweb-awful",
    storageBucket: "chatweb-awful.appspot.com",
    messagingSenderId: "693279532996",
    appId: "1:693279532996:web:cf6404be59950947e26691",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const listDiv = document.getElementById("userList");

async function getUserStatus() {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("request", "==", "pending"));

        const querySnapshot = await getDocs(q);
        listDiv.innerHTML = '';

        if (querySnapshot.empty) {
            listDiv.innerHTML = '<p>No pending users found.</p>';
        } else {
            querySnapshot.forEach((userDoc) => {
                const userData = userDoc.data();
                const userId = userDoc.id;

                const userDiv = document.createElement("div");
                userDiv.innerHTML = `
          <p>${userData.username} (${userData.email})  :  <button onclick="approveUser('${userId}')">Approve</button> </p>
        `;
                listDiv.appendChild(userDiv);
            });
        }
    } catch (error) {
        listDiv.innerHTML = '<p>Error loading users. Please try again...</p>';
    }
}

async function approveUser(userId) {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { request: 'approved' });
        getUserStatus();
    } catch (error) {
        console.error("Error approving user: ", error);
    }
}

window.approveUser = approveUser;
window.onload = getUserStatus;
