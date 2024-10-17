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
const listDivApprove = document.getElementById("userListApprove");
const listDivBan = document.getElementById("userListBan");
const listDiv = document.getElementById("userList");


async function getUserStatus() {
    // Approved to ban
    listDiv.innerHTML = '<p>Active Users.</p>';
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("request", "==", "approved"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            listDiv.innerHTML += '<p>No active users found.</p>';
        } else {
            querySnapshot.forEach((userDoc) => {
                const userData = userDoc.data();
                const userId = userDoc.id;

                listDiv.innerHTML += `
                    <p>${userData.username} (${userData.email})  :  <button onclick="banUser('${userId}')">Ban</button> </p>
                `;
            });
        }
    } catch (error) {
        listDiv.innerHTML = '<p>Error loading users. Please try again...</p>';
    }

    // Unapproved to approved.
    listDivApprove.innerHTML = '<p>Approve Users.</p>';
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("request", "==", "pending"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            listDivApprove.innerHTML += '<p>No pending users found.</p>';
        } else {
            querySnapshot.forEach((userDoc) => {
                const userData = userDoc.data();
                const userId = userDoc.id;

                listDivApprove.innerHTML += `
                    <p>${userData.username} (${userData.email})  :  <button onclick="approveUser('${userId}')">Approve</button> </p>
                `;
            });
        }
    } catch (error) {
        listDivApprove.innerHTML = '<p>Error loading users. Please try again...</p>';
    }

    // Ban to Unban
    listDivBan.innerHTML = '<p>Ban Users.</p>';
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("request", "==", "ban"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            listDivBan.innerHTML += '<p>No banned users found.</p>';
        } else {
            querySnapshot.forEach((userDoc) => {
                const userData = userDoc.data();
                const userId = userDoc.id;

                listDivBan.innerHTML += `
                    <p>${userData.username} (${userData.email})  :  <button onclick="approveUser('${userId}')">Approve Again</button> </p>
                `;
            });
        }
    } catch (error) {
        listDivBan.innerHTML = '<p>Error loading users. Please try again...</p>';
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
async function banUser(userId) {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { request: 'ban' });
        getUserStatus();
    } catch (error) {
        console.error("Error approving user: ", error);
    }
}

window.approveUser = approveUser;
window.banUser = banUser;
window.onload = getUserStatus;

const style = document.createElement('style');
style.textContent = `
    button {
        background-color: #54c1ec;
        color: white !important;
        opacity: 100% !important;
        border: none;
        border-radius: 5px;
        margin: 5px 0px 0px 10px;
        padding: 5px 10px;
        box-shadow: 0 0 2px;
        font-family: "Poppins", sans-serif;
        font-size: 0.9rem;
        transition: 0.2s ease-out;
    }
    button:hover {
        background-color: #0e99d4;
}
`;
document.head.appendChild(style);