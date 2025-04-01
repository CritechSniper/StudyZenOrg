console.log("%cLogin script connected", "background-color: blue; color: white; border-radius: 5px;");

// Import Firebase modules
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// Firebase config
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

// Handle login
document.getElementById("loginButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log("User logged in:", user);

      // Retrieve user data from Firebase Database
      get(ref(database, "users/" + user.uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data:", userData);

            // Save user data to local storage
            localStorage.setItem("user", JSON.stringify(userData));

            alert("Login successful!");
            window.location.href = "profile.html"; // Redirect to homepage
          } else {
            console.log("No user data found");
            alert("User data not found. Please register again.");
          }
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        });
    })
    .catch((error) => {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    });
});
