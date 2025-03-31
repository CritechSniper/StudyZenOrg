// Import Firebase from CDN (no need for firebase-config.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase config (same as register.html)
const firebaseConfig = {
    apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
    authDomain: "logindata173.firebaseapp.com",
    databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "logindata173",
    storageBucket: "logindata173.firebasestorage.app",
    messagingSenderId: "565454636117",
    appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

console.log("Ljs.js loaded! ✅");

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("#loginButton");

    if (!loginButton) {
        console.error("Login button not found!");
        return;
    }

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password!");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in as:", user.email);

                // Fetch user data from database
                return get(ref(database, "users/" + user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        console.log("User data:", userData);

                        // Store user info in localStorage
                        localStorage.setItem("user", JSON.stringify({
                            uid: user.uid,
                            email: user.email,
                            firstName: userData.firstName || "User"
                        }));

                        alert("Login successful! 🎉");
                        window.location.href = "dashboard.html"; // Redirect to dashboard
                    } else {
                        console.error("User data not found!");
                        alert("User data not found!");
                    }
                });
            })
            .catch((error) => {
                console.error("Login failed:", error.message);
                alert("Login failed: " + error.message);
            });
    });
});
