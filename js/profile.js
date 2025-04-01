window.addEventListener("load", function () {
    console.log("%cProfile script connected", "background-color: blue; color: white; border-radius: 5px;");
    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData && typeof userData === "object") {
        // Ensure user data exists before setting textContent
        document.getElementById("firstName").textContent = userData.firstName || "N/A";
        document.getElementById("lastName").textContent = userData.lastName || "N/A";
        document.getElementById("email").textContent = userData.email || "N/A";
        document.getElementById("username").textContent = userData.username || "N/A";
        console.log("User data loaded successfully:", userData);
    } else {
        // If no user data is found, show a message
        document.getElementById("profileInfo").innerHTML = "<p>User data not found. Please log in again.</p>";
    }
});
