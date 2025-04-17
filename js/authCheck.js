import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// 🔐 Your Firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
    authDomain: "logindata173.firebaseapp.com",
    databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "logindata173",
    storageBucket: "logindata173.firebasestorage.app",
    messagingSenderId: "565454636117",
    appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🎲 Generate a 4-digit random code
function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

// 🧠 Write code to database under user/code
function storeCode() {
  const code = generateRandomCode();
  set(ref(db, 'user/code'), {
    value: code,
    timestamp: Date.now()
  }).then(() => {
    console.log("✅ Code saved:", code);
  }).catch((error) => {
    console.error("❌ Error saving code:", error);
  });
}

// 🕒 Reset every 24 hours (86,400,000 ms)
function startCodeScheduler() {
  storeCode(); // run now
  setInterval(() => {
    storeCode();
  }, 86400000); // 24 hours in ms
}

// 🚀 Start it
startCodeScheduler();
