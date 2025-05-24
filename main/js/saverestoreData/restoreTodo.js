import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
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
            const todoList = document.getElementById("todo-list");
            const todoRef = ref(db, `users/${user.uid}/todos`);

            get(todoRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const todos = snapshot.val();

                    todos.forEach((todo, index) => {
                        let line = todoList.children[index];

                        if (line) {
                            // Line already exists → update inputs
                            const checkbox = line.querySelector("input[type='checkbox']");
                            const input = line.querySelector("input[type='text']");

                            if (checkbox) checkbox.checked = todo.checked;
                            if (input) input.value = todo.text;

                        } else {
                            // Create a new line
                            const newLine = document.createElement("div");
                            newLine.classList.add("line");

                            const checkbox = document.createElement("input");
                            checkbox.type = "checkbox";
                            checkbox.id = "tickmark"; // For styling
                            checkbox.checked = todo.checked;

                            const input = document.createElement("input");
                            input.type = "text";
                            input.value = todo.text;

                            const deleteBtn = document.createElement("button");
                            deleteBtn.innerHTML = "❌";
                            deleteBtn.classList.add("delete-btn");
                            deleteBtn.addEventListener("click", () => {
                                newLine.remove();
                            });

                            newLine.appendChild(checkbox);
                            newLine.appendChild(input);
                            newLine.appendChild(deleteBtn);

                            todoList.appendChild(newLine);
                        }
                    });
                } else {
                    console.log("📭 No todos found");
                }
            }).catch((err) => {
                console.error("❌ Error restoring todos:", err);
            });
        } else {
            console.warn("⚠️ User not signed in");
        }
    });
});
