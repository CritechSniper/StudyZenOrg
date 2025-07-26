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
  }
});

// ----------------------------------------------
// 🔹 Auth State Debug
// ----------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("🔥");
  } else {
    console.log("❌ No User");
  }
});

// ----------------------------------------------
// 🔹 Admin Access Unlocker (Secret Pass)
// ----------------------------------------------

(async function(){
  if (typeof CryptoJS === "undefined") {
    await new Promise(resolve => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
      s.onload = resolve;
      document.head.appendChild(s);
    });
  }

  const authorizeAccess = {
    btn: async (elementId, pass) => {
      console.log("Initiating access check...");

      try {
        const db = getDatabase();
        const snap = await get(ref(db, "users/accessCode"));
        if (!snap.exists()) throw new Error("Access check failed");

        const storedHash = snap.val(); // SHA256 hash

        const inputHash = CryptoJS.SHA256(pass).toString();

        if (inputHash !== storedHash) {
          console.warn("authorizeAccess(...):\nAuthorizeAccess is not defined");
          return;
        }

        // Correct password — enable the element
        const el = document.getElementById(elementId);
        if (!el) {
          console.log("authorizeAccess(...):\nNo element found");
          return;
        }

        el.classList.remove("disabled");
        el.disabled = false;
        console.log("✅ Access granted — element enabled");

        // Clear console after 5s to erase traces
        setTimeout(() => console.clear(), 5000);

      } catch (e) {
        // Fake undefined error if fetching fails or anything unexpected
        console.warn("authorizeAccess(...): \n⚠️ Initiating... \nWarning: authorizeAccess is not defined");
      }
    }
  };

  Object.defineProperty(window, "authorizeAccess", {
    value: authorizeAccess,
    writable: false,
    configurable: false,
    enumerable: false,
  });
})();

// ----------------------------------------------
// 🔹 Disable Right-Click Context Menu
// ----------------------------------------------
window.addEventListener("contextmenu", (e) => e.preventDefault());