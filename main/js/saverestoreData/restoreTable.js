// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your Firebase config
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

document.addEventListener("DOMContentLoaded", () => {

  // Then proceed with Firebase logic
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const timetableRef = ref(database, `users/${userId}/timetable`);

      get(timetableRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Restore task/period cells
          for (const day in data) {
            if (day !== "Times") {
              for (const period in data[day]) {
                const id = day + period.replace("Period", "");
                const element = document.getElementById(id);
                if (element) {
                  element.value = data[day][period];
                }
              }
            }
          }

          // Restore time input fields
          if (data["Times"]) {
            for (let i = 1; i <= 9; i++) {
              const periodTime = data["Times"][`Period${i}`];
              if (periodTime) {
                const timeStart = document.getElementById(`time${i * 2 - 1}`);
                const timeEnd = document.getElementById(`time${i * 2}`);
                if (timeStart && timeEnd) {
                  timeStart.value = periodTime.start || "";
                  timeEnd.value = periodTime.end || "";
                }
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
