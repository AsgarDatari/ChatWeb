// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, where, query, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

const submitSup = document.getElementById("signInBtn");
submitSup.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("emailSin").value;
    const password = document.getElementById("passwordSin").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        
        const statusCollection = collection(db, 'status');
        const db_status = await getDocs(query(statusCollection, where("email", "==", user.email)));
        if(db_status.empty){
            throw new Error("No user found with this email");
        }
        let uname = "";
        db_status.forEach(async (doc) => {
            uname = doc.data().email;
            console.log(uname);
            const docRef = doc.ref;
            await updateDoc(docRef, {
                status: "Online"
            });
        });

        const db_username = await getDocs(query(collection(db, "users"), where("email", "==", user.email)));
        if(db_username.empty){
          throw new Error("No user found with this email");
        }
        let username = "";
        db_username.forEach((doc) => {
            username = doc.data().username;
            console.log(username);
        });

       localStorage.setItem("username", username);
       localStorage.setItem("email", email);

       window.location.href = "../chat/chat.html";

    } catch (error) {
        console.error("Error signing in:", error.message);
        document.getElementById('invalid-login').innerHTML = "Entered login credentials are invalid";
    }
});
