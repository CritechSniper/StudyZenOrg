// // js/saverestoreData/saveNotes.js
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
//     authDomain: "logindata173.firebaseapp.com",
//     projectId: "logindata173",
//     storageBucket: "logindata173.appspot.com",
//     messagingSenderId: "353759129689",
//     appId: "1:353759129689:web:c92420b9e0deba90e5f683",
//     measurementId: "G-KB1CZ1PX5Z",
//     databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app/"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);

// const autoSave = document.getElementById('autoSave');
// const autoSaveToggle = document.getElementById('autoSavetoggle');

// window.addEventListener("load", () => {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             const noteInput = document.getElementById("noteInput");
//             const saveButton = document.getElementById("saveNote");

//             const noteRef = ref(db, `users/${user.uid}/note`);

//             // Manual save on button click
//             saveButton.addEventListener("click", () => {
//                 const content = noteInput.innerHTML;
//                 set(noteRef, content)
//                 .then(() => {
//                     console.log("✅ Note saved");
//                     saveButton.innerHTML = '✅ Saved!';
                
//                     // Restore button text after 2 seconds
//                     setTimeout(() => {
//                         saveButton.innerHTML = 'Save Notes';
//                     }, 2000);
//                 })
                
//                     .catch((err) => {
//                         console.error("❌ Save failed:", err);
//                         autoSave.innerHTML = "❌ Error Saving";
//                     });
//             });

//             // Auto-save with toggle and debounce
//             let lastSavedContent = "";
//             let saveTimeout;

//             noteInput.addEventListener("input", () => {
//                 if (!autoSaveToggle.checked) return; // Auto-save disabled

//                 const currentContent = noteInput.innerHTML;
//                 autoSave.innerHTML = "Saving...";

//                 clearTimeout(saveTimeout);

//                 saveTimeout = setTimeout(() => {
//                     if (currentContent !== lastSavedContent) {
//                         set(noteRef, currentContent)
//                             .then(() => {
//                                 console.log("💾 Auto-saved");
//                                 lastSavedContent = currentContent;
//                                 autoSave.innerHTML = "✅Saved";
//                             })
//                             .catch((err) => {
//                                 console.error("❌ Auto-save failed:", err);
//                                 autoSave.innerHTML = "❌ Error Saving";
//                             });
//                     } else {
//                         autoSave.innerHTML = "✅Saved";
//                     }
//                 }, 2000);
//             });

//             // Update status when toggle is changed
//             autoSaveToggle.addEventListener("change", () => {
//                 if (autoSaveToggle.checked) {
//                     autoSave.innerHTML = "✅ Auto-save ON";
//                 } else {
//                     autoSave.innerHTML = "🛑 Auto-save OFF";
//                 }
//             });

//             // Initial label
//             autoSave.innerHTML = autoSaveToggle.checked ? "✅ Auto-save ON" : "🛑 Auto-save OFF";

//         } else {
//             console.warn("⚠️ User not signed in");
//         }
//     });
// });
