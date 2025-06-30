// // js/saverestoreData/restoreNotes.js
// import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
//   authDomain: "logindata173.firebaseapp.com",
//   projectId: "logindata173",
//   storageBucket: "logindata173.appspot.com",
//   messagingSenderId: "353759129689",
//   appId: "1:353759129689:web:c92420b9e0deba90e5f683",
//   measurementId: "G-KB1CZ1PX5Z",
//   databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app/"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);

// window.addEventListener("load", () => {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             const noteRef = ref(db, `users/${user.uid}/note`);
//             get(noteRef).then((snapshot) => {
//                 if (snapshot.exists()) {
//                     const savedContent = snapshot.val();
//                     document.getElementById("noteInput").innerHTML = savedContent;
//                     console.log("✅ Notes restored");
//                 } else {
//                     console.log("ℹ️ No saved note found");
//                 }
//             }).catch((err) => {
//                 console.error("❌ Error restoring note:", err);
//             });
//         } else {
//             console.warn("⚠️ User not signed in");
//         }
//     });
// });
