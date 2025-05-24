console.log("%cLogin script connected", "background-color: blue; color: white; border-radius: 5px;");

// Import Firebase modules
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
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
  const usernameInput = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!usernameInput || !password) {
    alert("Please enter both username and password.");
    return;
  }

  // Step 1: Search users by username
  get(ref(database, "users")).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      let matchedUser = null;
      let matchedUID = null;

      for (const uid in users) {
        const user = users[uid];
        if (
          (user.username && user.username === usernameInput) || // Match for regular users
          (user.firstName && user.type === "class" && user.firstName === usernameInput) // Match for class accounts
        ) {
          matchedUser = user;
          matchedUID = uid;
          break;
        }
      }

      if (matchedUser) {
        // Get email for login
        const emailToUse = matchedUser.email || `${matchedUser.firstName.toLowerCase()}@fakeuser.com`;

        // Step 2: Sign in with found email and entered password
        signInWithEmailAndPassword(auth, emailToUse, password)
          .then((userCredential) => {
            console.log("User logged in:", userCredential.user);

            // Save user data to local storage
            localStorage.setItem("user", JSON.stringify(matchedUser));

            alert("Login successful!");
            window.location.href = "profile.html";
          })
          .catch((error) => {
            console.error("Login failed:", error);
            alert("Login failed: " + error.message);
          });
      } else {
        alert("No account found with that username.");
      }
    } else {
      alert("No users registered.");
    }
  }).catch((error) => {
    console.error("Error fetching user data:", error);
    alert("Error checking username: " + error.message);
  });
});
