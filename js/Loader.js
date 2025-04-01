window.addEventListener("load", function () {
    console.log("%c-Page loaded.-", "background-color: green; font-size: 20px; color: white; border-radius: 5px;");

    let loader = document.querySelector(".loader");
    if (loader) {
        loader.style.opacity = "0"; // Trigger fade-out animation
    }
});
