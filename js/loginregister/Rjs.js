console.log("%cRegister script connected", "background-color: blue; color: white; border-radius: 5px;");

// Import Firebase modules
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// Your Firebase config
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

// Handle user registration
document.getElementById("registerButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);

      // Store additional user data in Firebase Database
      set(ref(database, "users/" + user.uid), {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
      })
        .then(() => {
          alert("User registered successfully!");
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Error saving user data:", error);
          alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Registration failed: " + error.message);
    });
});
