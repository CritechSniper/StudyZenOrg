window.addEventListener("load", function () {
  console.log("%cProfile script connected", "background-color: blue; color: white; border-radius: 5px;");

  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData && typeof userData === "object") {
      if (userData.type === "class") {
          // Show class layout only
          document.getElementById("className").textContent = userData.firstName || "N/A";
          document.getElementById("classInfo").style.display = "block";
          document.getElementById("userInfo").style.display = "none";
      } else {
          // Show regular user layout
          document.getElementById("firstName").textContent = userData.firstName || "N/A";
          document.getElementById("lastName").textContent = userData.lastName || "N/A";
          document.getElementById("email").textContent = userData.email || "N/A";
          document.getElementById("username").textContent = userData.username || "N/A";
          document.getElementById("userInfo").style.display = "block";
          document.getElementById("classInfo").style.display = "none";
      }
      document.getElementById("noUser").style.display = "none";
  } else {
      document.getElementById("profileInfo").style.display = "none";
      document.getElementById("noUser").style.display = "block";
  }
});
document.addEventListener('contextmenu', e => e.preventDefault());const bgVideo = document.querySelector('.bg-video');