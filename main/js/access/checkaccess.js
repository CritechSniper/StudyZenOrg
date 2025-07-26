const granted = localStorage.getItem("access") === "accessgranted24h";
const grantedTime = localStorage.getItem("accessTime");
const now = Date.now();

const twentyFourHours = 24 * 60 * 60 * 1000;

if (!granted || !grantedTime || now - grantedTime > twentyFourHours) {
  localStorage.removeItem("access");
  localStorage.removeItem("accessTime");
  window.location.href = "access-denied.html"; 
}
