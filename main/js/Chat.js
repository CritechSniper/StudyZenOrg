const siteContent = document.querySelector(".siteContent");
const localUser = JSON.parse(localStorage.getItem("user"));
const confirmedUser = localStorage.getItem("confirmedName");
const LogC = document.querySelector(".LogC");

if (localUser && localUser.type === "class") {
    console.log("Verified class under:", localUser.firstName);
    document.getElementById("classN").textContent = `You are in class ${localUser.firstName}`;
} else {
    window.location.href = "main/home.html";
}
if (confirmedUser) {
	console.log("Confirmed user:", confirmedUser);
	LogC.style.display = "none";
	siteContent.classList.remove("blurred");
} else {
	LogC.style.display = "block";
	siteContent.classList.add("blurred");
}
const input1 = document.getElementById("otpInput");
const input2 = document.getElementById("messageInp");
const button1 = document.getElementById("verifyOTP");
const button2 = document.getElementById("sendMessage");

input1.addEventListener("input", () => {
    if (input1.value.trim() === "") {
        button1.disabled = true;
        button1.classList.add("disabled");
    } else {
        button1.disabled = false;
        button1.classList.remove("disabled");
    }
});
input2.addEventListener("input", () => {
    if (input2.value.trim() === "") {
        button2.disabled = true;
        button2.classList.add("disabled");
    } else {
        button2.disabled = false;
        button2.classList.remove("disabled");
    }
});

emailjs.init("P5eZLF1ISh-znncVt");

const users = {
"2022": "2022@iischoolabudhabi.com",
};

let generatedOTP = "";
let selectedUser = "";

function generateOTP() {
return Math.floor(1000 + Math.random() * 9000);
}

function getValidUntilTime() {
const now = new Date();
now.setMinutes(now.getMinutes() + 15);
return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function handleUserSelect(selectElement) {
    selectedUser = selectElement.value;
    const email = users[selectedUser];
    
    if (!email) {
        alert("❌ No email found for selected user.");
        return;
    }
    
    console.log("Selected user:", selectedUser);
    console.log("Email to send:", email);
    
    generatedOTP = generateOTP();
    document.getElementById("email").textContent = email;
    document.getElementById("otpConfirmation").style.display = "block";
    document.getElementById("otpConfirmationM").textContent = `Send OTP to ${email}?`;

}
function confirmed () {
    const email = users[selectedUser];
    if (!email) {
        alert("❌ No email found for selected user.");
        return;
    }
    document.getElementById("otpConfirmation").style.display = "none";
    document.getElementById("otpSection").style.display = "block";

    emailjs.send("service_wbs40m3", "template_vw8poch", {
        email: email,
        to_name: selectedUser,
        passcode: generatedOTP,
        time: getValidUntilTime()
    })

    .then(() => {
        alert("✅ OTP sent to " + email);
    })
    .catch((error) => {
        console.error("❌ Email failed:", error);
        alert("❌ Failed to send email.");
    });
}

function verifyOTP() {
const input = document.getElementById("otpInput").value.trim();
if (input === String(generatedOTP)) {
    alert("✅ Verified as " + selectedUser);
    localStorage.setItem("confirmedName", selectedUser);
    location.reload();
} else {
    alert("❌ Incorrect OTP. Please try again.");
}
}

// Firebase imports
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, push, get, remove, child, onValue, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
  authDomain: "logindata173.firebaseapp.com",
  databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logindata173",
  storageBucket: "logindata173.appspot.com",
  messagingSenderId: "565454636117",
  appId: "1:565454636117:web:1fe752b72f64b9140640dc"
};

// Init Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const db = getDatabase();

// Get class and user info
const className = localUser?.firstName || "UnknownClass"; // e.g. "9A"
const UserID = localStorage.getItem("confirmedName") || "UnknownUser";

// DOM Elements
const messageInp = document.getElementById("messageInp");
const sendBtn = document.getElementById("sendMessage");
const displayBox = document.getElementById("messagesDisplay");

// Send Message
function sendMessage() {
	const message = messageInp.value.trim();
	if (!message) return;

	const fullMessage = `${UserID} - ${message}`;
	const chatRef = ref(db, `chat/${className}`);

	// Disable input during sending
	sendBtn.disabled = true;
	messageInp.disabled = true;
	sendBtn.textContent = "Sending...";

	push(chatRef, {
		text: fullMessage,
		timestamp: Date.now()
	}).then(() => {
		// Re-enable input after message is confirmed sent
		messageInp.value = "";
		sendBtn.disabled = false;
		messageInp.disabled = false;
		sendBtn.textContent = "Send";
	}).catch(err => {
		console.error("❌ Error sending:", err);
		alert("❌ Message failed to send.");
		sendBtn.disabled = false;
		messageInp.disabled = false;
		sendBtn.textContent = "Send";
	});
}

// Polling every 1 second to load messages
setInterval(() => {
	const chatRef = ref(db, `chat/${className}`);
	get(chatRef).then(snapshot => {
		const data = snapshot.val() || {};
		const sorted = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);

		// Clear and rebuild
		displayBox.innerHTML = "";
		sorted.forEach(msg => {
			const p = document.createElement("p");
			p.textContent = msg.text;
			p.classList.add("chat-msg");
			displayBox.appendChild(p);
		});
	});
}, 1000);
window.sendMessage = sendMessage;
window.confirmed = confirmed;
window.verifyOTP = verifyOTP;
window.handleUserSelect = handleUserSelect;