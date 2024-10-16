// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, where, query, getDocs, updateDoc, addDoc  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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
        console.log("Attempting to sign in...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully:", userCredential);
        
        const user = userCredential.user;
        
        const db_username_admin = await getDocs(query(collection(db, "admin"), where("email", "==", user.email)));

        if (!db_username_admin.empty) {
            let username = "";
            db_username_admin.forEach((doc) => {
                username = doc.data().username;
            });
            
            const statusCollection = collection(db, 'status');
            const db_status = await getDocs(query(statusCollection, where("email", "==", user.email)));
            if (db_status.empty) {
                await addDoc(statusCollection, {
                    email: user.email,
                    username: username,
                    status: "Online",
                });
            }
            else{
                for (const doc of db_status.docs) {
                    const userData = doc.data();
                    const currentStatus = userData.status;
                    
                    if (currentStatus === "Offline") {
                        const docRef = doc.ref;
                        await updateDoc(docRef, {
                            status: "Online"
                        });
                    }
                }
            }
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            window.location.href = "../chat/admin_chat.html";
            
        } else {
            const db_user = await getDocs(query(collection(db, "users"), where("email", "==", user.email)));
            if (db_user.empty) {
                throw new Error("No user found with this email");
            }
        
            let isApproved = false;
            let username = "";
            db_user.forEach((doc) => {
                const userData = doc.data();
                username = userData.username;
                if (userData.request === "approved") {
                    isApproved = true;
                }
            });

            if (!isApproved) {
                alert("User has not been approved by the admin.");
                window.location.href = "../login/login.html";
                return; // Stop further execution
            }

            const statusCollection = collection(db, 'status');
            const db_status = await getDocs(query(statusCollection, where("email", "==", user.email)));
            if (db_status.empty) {
                throw new Error("No user found with this email");
            }

            for (const doc of db_status.docs) {
                const userData = doc.data();
                const currentStatus = userData.status;
                
                if (currentStatus === "Offline") {
                    const docRef = doc.ref;
                    await updateDoc(docRef, {
                        status: "Online"
                    });
                }
            }
            
            localStorage.setItem("username", username);
            localStorage.setItem("email", user.email);
        
            window.location.href = "../chat/chat.html";
        }
    } catch (error) {
        console.error("Error signing in:", error.code, error.message);
        document.getElementById('invalid-login').innerHTML = "Entered login credentials are invalid";
    }
});
