// js/saverestoreData/saveNotes.js
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
    authDomain: "logindata173.firebaseapp.com",
    projectId: "logindata173",
    storageBucket: "logindata173.appspot.com",
    messagingSenderId: "353759129689",
    appId: "1:353759129689:web:c92420b9e0deba90e5f683",
    measurementId: "G-KB1CZ1PX5Z",
    databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.addEventListener("load", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const noteInput = document.getElementById("noteInput");
            const saveButton = document.getElementById("saveNote");

            const noteRef = ref(db, `users/${user.uid}/note`);

            // Manual save on button click
            saveButton.addEventListener("click", () => {
                const content = noteInput.innerHTML;
                console.log("Saving content:", content);
                set(noteRef, content)
                    .then(() => console.log("✅ Note saved"), alert("Note saved successfully!"))
                    .catch((err) => console.error("❌ Save failed:", err));
            });

            // Auto-save every 5 seconds if content changed
            let lastSavedContent = "";

            setInterval(() => {
                const currentContent = noteInput.innerHTML;
                if (currentContent !== lastSavedContent) {
                    set(noteRef, currentContent)
                        .then(() => {
                            console.log("💾 Auto-saved");
                            lastSavedContent = currentContent;
                        })
                        .catch((err) => console.error("❌ Auto-save failed:", err));
                }
            }, 5000); // 5000 ms = 5 sec

        } else {
            console.warn("⚠️ User not signed in");
        }
    });
});
