// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
  authDomain: "logindata173.firebaseapp.com",
  databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logindata173",
  storageBucket: "logindata173.firebasestorage.app",
  messagingSenderId: "565454636117",
  appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save note to Firebase
function saveNote() {
    const noteContent = document.getElementById("noteInput").innerHTML; // Get the HTML content including line breaks
    const userId = "user123"; // Change this to the user's ID or unique identifier
    
    // Create a reference to the user's notes
    const noteRef = ref(database, 'notes/' + userId);
    
    // Save the content to Firebase under the user's notes
    set(noteRef, {
        note: noteContent
    }).then(() => {
        alert("Note saved successfully!");
    }).catch((error) => {
        console.error("Error saving note:", error);
    });
}
