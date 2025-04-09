window.addEventListener("load", function () {
    console.log("%cHome script connected", "background-color: blue; color: white; border-radius: 5px;");
    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData && typeof userData === "object") {
        // Ensure user data exists before setting textContent
        document.getElementById("userGreetings").textContent = `Welcome ${userData.firstName}!` || "";
    } else {
        // If no user data is found, show a message
        document.getElementById('userGreetings').textContent = "Welcome!"
    }
});
