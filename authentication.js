import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";


        const firebaseConfig = {
            apiKey: "AIzaSyA50_RJ_bIx7Ryr9u6ThXkteB6NpxNaQR4",
            authDomain: "webapp-c1c62.firebaseapp.com",
            databaseURL: "https://webapp-c1c62-default-rtdb.firebaseio.com",
            projectId: "webapp-c1c62",
            storageBucket: "webapp-c1c62.appspot.com",
            messagingSenderId: "1015106008334",
            appId: "1:1015106008334:web:c239f8234a239f78ebd35f"
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const auth = getAuth();


        document.getElementById('signup_submit').addEventListener('click', (e) => {
        e.preventDefault();

            let email = document.getElementById('signup_email').value;
            let password = document.getElementById('signup_password').value;
            let username = document.getElementById('signup_username').value;


            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                   const user = userCredential.user;

                    set(ref(db, 'users/' + user.uid),{
                        username: username,
                        email: email
                    });

                    alert('Created');
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
            });

        document.getElementById('signin_submit').addEventListener('click', (e) => {
         e.preventDefault();
            
            let email = document.getElementById('signin_email').value;
            let password = document.getElementById('signin_password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert('Login Successfully');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });

        });