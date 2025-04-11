// Import Firebase modules
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

// Save notes function
function saveNotesData(userId, notesContent) {
  // Save to Firebase under users/{uid}/notes
  set(ref(database, "users/" + userId + "/notes"), notesContent)
    .then(() => {
      alert("Notes saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving notes:", error);
      alert("Error saving notes: " + error.message);
    });
}

// Event listener for saveNotes button
document.getElementById("saveNotes").addEventListener("click", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const notesContent = document.getElementById("editor").innerHTML; // Get content from Quill editor
      saveNotesData(user.uid, notesContent);
    } else {
      alert("You must be logged in to save your notes.");
    }
  });
});
