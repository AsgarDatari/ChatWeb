// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBumQaN29IZF8LqvB3kqUIgF7v1r5m2Hv0",
  authDomain: "chatweb-awful.firebaseapp.com",
  databaseURL: "https://chatweb-awful-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatweb-awful",
  storageBucket: "chatweb-awful.appspot.com",
  messagingSenderId: "693279532996",
  appId: "1:693279532996:web:cf6404be59950947e26691"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const fp_button = document.getElementById("forgot_password");
fp_button.addEventListener("click", async function(event) {
    event.preventDefault();

    var email = document.getElementById("emailSin").value;
    if (email) {
    
        const userRef = collection(db, "users");
        const db_email = query(userRef, where("email", "==", email));
        const check_email = await getDocs(db_email);
        if (check_email.empty) {
            alert("Email does not exist in the database");
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert("Password reset email sent. Check your inbox!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error sending password reset email:", errorMessage);
            alert("Error: " + errorMessage);
        });
    }
});