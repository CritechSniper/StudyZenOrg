import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

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

// Save table function
function saveTimetableData(userId) {
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  const timetableData = {};

  days.forEach((day) => {
    timetableData[day] = {};
    for (let i = 1; i <= 7; i++) {
      const cell = document.getElementById(`${day}${i}`);
      if (cell) {
        timetableData[day][`Period${i}`] = cell.value;
      }
    }
  });

  // Save to Firebase under users/{uid}/timetable
  set(ref(database, "users/" + userId + "/timetable"), timetableData)
    .then(() => {
      alert("Timetable saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving timetable:", error);
      alert("Error saving timetable: " + error.message);
    });
}

// Event listener for saveTable button
document.getElementById("saveTable").addEventListener("click", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      saveTimetableData(user.uid);
    } else {
      alert("You must be logged in to save your timetable.");
    }
  });
});

