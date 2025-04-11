// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration
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
const database = getDatabase(app);

// Restore notes on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const notesRef = ref(database, `users/${userId}/notes`);

      get(notesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const notesContent = snapshot.val();
          document.getElementById("editor").innerHTML = notesContent;
          console.log("✅ Notes restored successfully!");
        } else {
          console.log("📭 No notes data found for this user.");
        }
      }).catch((error) => {
        console.error("❌ Error restoring notes:", error);
      });
    } else {
      console.log("🚫 No user signed in.");
    }
  });
});
