document.addEventListener("DOMContentLoaded", function () {
    console.log("Rjs.js loaded!");

    const registerButton = document.querySelector("#registerButton");

    if (!registerButton) {
        console.error("Register button not found!");
        return;
    }

    registerButton.addEventListener("click", function (event) {
        event.preventDefault();

        const firstName = document.querySelector("#firstName").value.trim();
        const lastName = document.querySelector("#lastName").value.trim();
        const email = document.querySelector("#email").value.trim();
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        if (!firstName || !lastName || !email || !username || !password) {
            alert("Please fill in all fields!");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User registered:", user.uid);

                // Save user data to Firebase Database
                return firebase.database().ref("users/" + user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username
                });
            })
            .then(() => {
                alert("Registration successful! You can now log in.");
                window.location.href = "login.html";
            })
            .catch((error) => {
                console.error("Registration failed:", error.message);
                alert("Registration failed: " + error.message);
            });
    });
});
