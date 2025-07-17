// ----------------------------------------------
// 🔹 Firebase Imports
// ----------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// ----------------------------------------------
// 🔹 Firebase Config & Init
// ----------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
  authDomain: "logindata173.firebaseapp.com",
  databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logindata173",
  storageBucket: "logindata173.appspot.com",
  messagingSenderId: "565454636117",
  appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ----------------------------------------------
// 🔹 Theme Handling (Global for All Pages)
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  } else if (savedTheme === "system") {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
      document.body.classList.add("light-theme");
    }
  }
});

// ----------------------------------------------
// 🔹 Sidebar Toggle
// ----------------------------------------------
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggle-btn");

  if (!sidebar || !toggleButton) {
    console.error("Sidebar or toggle button not found!");
    return;
  }

  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-btn");
  if (toggleButton) {
    toggleButton.onclick = toggleSidebar;
  } else {
    console.error("Toggle button not found in the DOM.");
  }
});

// ----------------------------------------------
// 🔹 Auth State Debug
// ----------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("🔥 Logged in user info:", user);
  } else {
    console.log("❌ No user is currently logged in.");
  }
});

// ----------------------------------------------
// 🔹 Admin Access Unlocker (Secret Pass)
// ----------------------------------------------
const authorizeAccess = {
  btn: (elementId, pass) => {
    const correctPass = "W@leed!@#";

    // Anti-inspection placeholder
    setTimeout(() => {
      console.log("%c ", "font-size:1px; color:transparent;");
    }, 50);

    if (pass !== correctPass) {
      console.warn("❌ Incorrect password. Access denied.");
      return;
    }

    const target = document.getElementById(elementId);
    if (!target) {
      console.error(`❌ No element found with ID "${elementId}"`);
      return;
    }

    target.classList.remove("disabled");
    target.removeAttribute("disabled");

    console.log(`✅ Element #${elementId} is now enabled.`);
  }
};

window.authorizeAccess = authorizeAccess;

// ----------------------------------------------
// 🔹 Disable Right-Click Context Menu
// ----------------------------------------------
window.addEventListener("contextmenu", (e) => e.preventDefault());