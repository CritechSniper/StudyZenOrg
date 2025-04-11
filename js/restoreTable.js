// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your Firebase config (logindata173)
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

// Restore timetable when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const timetableRef = ref(database, `users/${userId}/timetable`);

      get(timetableRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const day in data) {
            for (const period in data[day]) {
              const id = day + period.replace("Period", "");
              const element = document.getElementById(id);
              if (element) {
                element.value = data[day][period];
              }
            }
          }
          console.log("✅ Timetable restored successfully!");
        } else {
          console.log("📭 No timetable data found for this user.");
        }
      }).catch((error) => {
        console.error("❌ Error restoring timetable:", error);
      });

    } else {
      console.log("🚫 No user signed in.");
    }
  });
});
