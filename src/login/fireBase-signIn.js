// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQKfyKb2y3XLIYEqqbKKN-uBjjUIkm9zU",
  authDomain: "chatweb-13450.firebaseapp.com",
  projectId: "chatweb-13450",
  storageBucket: "chatweb-13450.appspot.com",
  messagingSenderId: "16463201291",
  appId: "1:16463201291:web:d5dbd2a9ee4c16f060730e",
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
      window.location.href="../chat/chat.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.location.href="./loginFailed.html";
    });

});
