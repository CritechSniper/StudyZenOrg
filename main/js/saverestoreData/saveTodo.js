// js/saverestoreData/saveTodo.js
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

let lastSavedData = "";
let debounceTimeout;

function serializeTodoList() {
    const lines = document.querySelectorAll("#todo-list .line");
    const todos = [];

    lines.forEach(line => {
        const checkbox = line.querySelector('input[type="checkbox"]');
        const input = line.querySelector('input[type="text"]');

        todos.push({
            checked: checkbox.checked,
            text: input.value
        });
    });

    return todos;
}

function setupAutoSave(user) {
    const todoRef = ref(db, `users/${user.uid}/todos`);

    const triggerAutoSave = () => {
        const currentData = JSON.stringify(serializeTodoList());

        if (currentData !== lastSavedData) {
            set(todoRef, JSON.parse(currentData))
                .then(() => {
                    console.log("✅ Todo auto-saved");
                    lastSavedData = currentData;
                })
                .catch((err) => {
                    console.error("❌ Failed to auto-save todos:", err);
                });
        }
    };

    const scheduleAutoSave = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(triggerAutoSave, 1500); // Debounce time: 1.5 sec
    };

    // Add listeners to inputs
    document.addEventListener("input", event => {
        if (event.target.closest("#todo-list")) {
            scheduleAutoSave();
        }
    });

    // Add listener to checkbox changes
    document.addEventListener("change", event => {
        if (event.target.closest("#todo-list")) {
            scheduleAutoSave();
        }
    });

    // Also save when a new line is added or removed
    const observer = new MutationObserver(scheduleAutoSave);
    observer.observe(document.getElementById("todo-list"), { childList: true, subtree: true });
}

window.addEventListener("load", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setupAutoSave(user);
        } else {
            console.warn("⚠️ User not signed in");
        }
    });
});
