// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// const firebaseConfig = {
// apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
// authDomain: "logindata173.firebaseapp.com",
// projectId: "logindata173",
// storageBucket: "logindata173.appspot.com",
// messagingSenderId: "353759129689",
// appId: "1:353759129689:web:c92420b9e0deba90e5f683",
// measurementId: "G-KB1CZ1PX5Z",
// databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app/"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// document.getElementById("accessButton").addEventListener("click", async () => {
// const inputCode = document.getElementById("accessCode").value.trim();

// if (!inputCode || inputCode.length !== 4) {
//     alert("Please enter a valid 4-digit code.");
//     return;
// }

// const codeRef = ref(db, "users/dailyCode");
// const snapshot = await get(codeRef);

// if (snapshot.exists()) {
//     const storedCode = snapshot.val().toString();
//     if (inputCode === storedCode) {
//     alert("✅ Access Granted!");
//     localStorage.setItem("access", "accessgranted24h");
//     localStorage.setItem("accessTime", Date.now()); // Store the code in local storage
//     window.location.href = "home.html";
//     } else {
//     alert("❌ Wrong Code");
//     }
// } else {
//     alert("⚠️ No code found in database.");
// }
// });
