// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

var userName_signIn = '';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBumQaN29IZF8LqvB3kqUIgF7v1r5m2Hv0",
  authDomain: "chatweb-awful.firebaseapp.com",
  databaseURL: "https://chatweb-awful-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatweb-awful",
  storageBucket: "chatweb-awful.appspot.com",
  messagingSenderId: "693279532996",
  appId: "1:693279532996:web:cf6404be59950947e26691"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const submitSup = document.getElementById("signInBtn");
submitSup.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailSin").value;
    const password = document.getElementById("passwordSin").value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      userName_signIn = user.email;
      localStorage.setItem("userName", userName_signIn);
      window.location.href="../chat/chat.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // window.location.href="./loginFailed.html";
      document.getElementById('invalid-login').innerHTML = "entered login credintial are invalid";
    });
});