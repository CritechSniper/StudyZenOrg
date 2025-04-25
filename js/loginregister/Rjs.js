console.log("%cRegister script connected", "background-color: blue; color: white; border-radius: 5px;");

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
  authDomain: "logindata173.firebaseapp.com",
  databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logindata173",
  storageBucket: "logindata173.firebasestorage.app",
  messagingSenderId: "565454636117",
  appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById("registerButton").addEventListener("click", function () {
  const firstName = document.getElementById("firstName").value.trim(); // Class name
  const lastName = document.getElementById("lastName").value.trim();   // Optional section
  const emailInput = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const isClassAccount = !emailInput && !lastName && !username;

  const email = isClassAccount ? `${firstName.toLowerCase()}@fakeuser.com` : emailInput;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);

      // Build user data
      const userData = {
        firstName: firstName,
        createdAt: new Date().toISOString()
      };

      if (!isClassAccount) {
        userData.lastName = lastName;
        userData.email = emailInput;
        userData.username = username;
      } else {
        userData.type = "class";
        if (lastName) {
          userData.section = lastName;
        }
      }

      // Store user data in Firebase Realtime Database
      set(ref(database, "users/" + user.uid), userData)
        .then(() => {
          console.log("User data saved to database");

          // Only send email verification for real accounts
          if (!isClassAccount) {
            sendEmailVerification(user)
              .then(() => {
                alert("Verification email sent! Check your inbox.");
              })
              .catch((error) => {
                console.error("Error sending verification email:", error);
              });
          }

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
