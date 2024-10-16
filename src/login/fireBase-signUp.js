import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

var userName_signUp = '';

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const submitSup = document.getElementById("signUpBtn");
submitSup.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("emailSup").value;
    const password = document.getElementById("passwordSup").value;
    const userName = document.getElementById("userNameSup").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const usersCollection = collection(db, 'users');
        addDoc(usersCollection, {
            userId: user.uid,
            username: userName,
            email: email,
            request: "pending"
        });

        const statusCollection = collection(db, 'status');
        await addDoc(statusCollection, {
            email: user.email,
            username: userName,
            status: "Offline",
        });

        alert("Your account is pending admin approval. You will receive an email once your account is verified.");

        window.location.href = "login.html";

    } catch (error) {
        console.error("Error signing up:", error.message);
        // Handle errors during signup or Firestore document addition
        document.getElementById('invalid-signUp').innerHTML = "Error: " + error.message; // Display the error message
    }
});