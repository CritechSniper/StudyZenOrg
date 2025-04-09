window.addEventListener("load", function () {
    console.log("%cHome script connected", "background-color: blue; color: white; border-radius: 5px;");

    // User from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    // Define an array of greetings
    const greetings = ["Hi", "Hello", "Welcome", "Bonjour", "Hola", "Greetings", "Hey there"];

    // Randomly select a greeting
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    if (userData && typeof userData === "object") {
        // Ensure user data exists before setting textContent
        document.getElementById("userGreetings").textContent = `${randomGreeting} ${userData.firstName}!`;
    } else {
        // If no user data is found, show a default message
        document.getElementById('userGreetings').textContent = `${randomGreeting}!`;
    }
});
