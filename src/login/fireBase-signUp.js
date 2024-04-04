// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBumQaN29IZF8LqvB3kqUIgF7v1r5m2Hv0",
    authDomain: "chatweb-awful.firebaseapp.com",
    projectId: "chatweb-awful",
    storageBucket: "chatweb-awful.appspot.com",
    messagingSenderId: "693279532996",
    appId: "1:693279532996:web:cf6404be59950947e26691"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const submitSup = document.getElementById("signUpBtn");
submitSup.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailSup").value;
    const password = document.getElementById("passwordSup").value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        window.location.href="../chat/chat.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.location.href="./loginFailed.html";
    });

});
