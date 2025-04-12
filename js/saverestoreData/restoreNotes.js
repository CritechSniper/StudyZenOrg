// Import Firebase modules
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your Firebase config (same as in saveNotes.js)
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

// Function to retrieve note from Firebase
function restoreNote() {
    const userId = "user123"; // Change this to the user's ID or unique identifier
    
    // Create a reference to the user's saved note
    const noteRef = ref(database, 'notes/' + userId);

    // Get the data from Firebase
    get(noteRef).then((snapshot) => {
        if (snapshot.exists()) {
            const savedNote = snapshot.val().note;
            // Set the content of the noteInput div to the saved note
            document.getElementById("noteInput").innerHTML = savedNote;
        } else {
            console.log("No saved note found for this user.");
        }
    }).catch((error) => {
        console.error("Error retrieving note:", error);
    });
}

// Call restoreNote function to load the saved note when the page loads
window.onload = function() {
    restoreNote();
};
