import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// ------------------ Firebase Config ------------------
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

// ------------------ DOM Ready ------------------
window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeSelect = document.getElementById("theme-select");
  const changePassBtn = document.getElementById("change-password-btn");
  const deleteAccBtn = document.getElementById("delete-account-btn");
  const overlay = document.querySelector('.loader-overlay');
  const loader = document.querySelector('.loaderS');

  // ------------------ 1. Loader Animation ------------------
  setTimeout(() => {
    if (overlay) overlay.style.opacity = '0';
    if (loader) loader.style.opacity = '0';

    setTimeout(() => {
      if (overlay) overlay.style.display = 'none';
      if (loader) loader.style.display = 'none';
    }, 500);
  }, 1400);

  // ------------------ 2. Theme Selector ------------------
  if (themeSelect) {
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    themeSelect.addEventListener('change', () => {
      const selectedTheme = themeSelect.value;
      localStorage.setItem('selectedTheme', selectedTheme);
      applyTheme(selectedTheme);
    });
  }

  function applyTheme(theme) {
    body.classList.remove('light-theme');

    if (theme === 'light') {
      body.classList.add('light-theme');
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!prefersDark) {
        body.classList.add('light-theme');
      }
    }
  }

  // ------------------ 3. Auth Check & Button Control ------------------
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Not logged in — disable buttons and show alerts
      disableButtonsWithAlert(changePassBtn, deleteAccBtn);
      return;
    }

    console.log("🔥 Logged in:", user.uid);

    // Get user data from Firebase
    const userRef = ref(database, "users/" + user.uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("✅ User data loaded:", userData);

          if (userData.type === "class") {
            disableButtons(changePassBtn, deleteAccBtn); // Silent disable
          } else {
            enableButtons(changePassBtn, deleteAccBtn); // Enable for normal user
          }
        } else {
          console.warn("⚠️ No user data found in database.");
          disableButtonsWithAlert(changePassBtn, deleteAccBtn);
        }
      })
      .catch((error) => {
        console.error("🚫 Error fetching user data:", error);
        disableButtonsWithAlert(changePassBtn, deleteAccBtn);
      });
  });
});

// ------------------ Helper Functions ------------------

function disableButtons(changeBtn, deleteBtn) {
  [changeBtn, deleteBtn].forEach(btn => {
    if (btn) {
      btn.classList.add("disabled");
      btn.disabled = true;
    }
  });
}

function disableButtonsWithAlert(changeBtn, deleteBtn) {
  [changeBtn, deleteBtn].forEach(btn => {
    if (btn) {
      btn.classList.add("disabled");
      btn.disabled = true;
      btn.addEventListener("click", () => {
        alert("Please log in first to perform this action.");
      });
    }
  });
}

function enableButtons(changeBtn, deleteBtn) {
  if (changeBtn) {
    changeBtn.classList.remove("disabled");
    changeBtn.disabled = false;
    changeBtn.addEventListener("click", () => {
      console.log("Changing password...");
      // You can show a modal or navigate to password change here
    });
  }

  if (deleteBtn) {
    deleteBtn.classList.remove("disabled");
    deleteBtn.disabled = false;
    deleteBtn.addEventListener("click", signout);
  }
}

// ------------------ Sign Out Function ------------------

function signout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("✅ Signed out successfully.");
      localStorage.removeItem("user"); // Clear local data
      window.location.reload(); // Optional: update page state after sign out
    })
    .catch((error) => {
      console.error("❌ Error signing out:", error);
    });
}
