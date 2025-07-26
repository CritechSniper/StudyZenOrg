import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
  authDomain: "logindata173.firebaseapp.com",
  databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logindata173",
  storageBucket: "logindata173.appspot.com",
  messagingSenderId: "565454636117",
  appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show profile data
window.addEventListener("load", function () {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData && typeof userData === "object") {
    if (userData.type === "class") {
      // Class view
      document.getElementById("className").textContent = userData.firstName || "N/A";
      document.getElementById("classInfo").style.display = "block";
      document.getElementById("userInfo").style.display = "none";
    } else {
      // Regular user view
      document.getElementById("firstName").textContent = userData.firstName || "N/A";
      document.getElementById("lastName").textContent = userData.lastName || "N/A";
      document.getElementById("email").textContent = userData.email || "N/A";
      document.getElementById("username").textContent = userData.username || "N/A";
      document.getElementById("userInfo").style.display = "block";
      document.getElementById("classInfo").style.display = "none";
    }
    document.getElementById("noUser").style.display = "none";
  } else {
    document.getElementById("profileInfo").style.display = "none";
    document.getElementById("noUser").style.display = "block";
  }
});

// Disable right click
document.addEventListener('contextmenu', e => e.preventDefault());

// Signout function
function signout() {
  signOut(auth)
    .then(() => {
      console.log("Signed out from Firebase");
      localStorage.removeItem("user"); // 🔥 Clear local user data
      window.location.reload(); // Optional: refresh to update UI
    })
    .catch((error) => {
      console.error("Signout error:", error);
    });
}


// Export for use in HTML if needed
window.signout = signout;