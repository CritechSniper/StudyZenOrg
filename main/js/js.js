const localUser = JSON.parse(localStorage.getItem("user"));

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

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-btn");
  if (toggleButton) {
    toggleButton.onclick = toggleSidebar;
  } else {
    console.error("Toggle button not found in the DOM.");
  }

  if (localUser && localUser.type === "class") {
		
    const saveBtn = document.getElementById("saveTable");
    if (saveBtn) saveBtn.classList.remove("disabled");

    // const element = document.getElementById("yourElementId"); element.classList.add("disabled");
  }
});


import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("🔥 Logged in user info:", user);
  } else {
    console.warn("❌ No user is currently logged in.");
  }
});

const authorizeAccess = {
  btn: function (elementId, pass) {
    const correctPass = "W@leed!@#";

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
window.authorizeAccess = authorizeAccess; //make it usable