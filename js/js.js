function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggle-btn");

    if (!sidebar || !toggleButton) {
        console.error("Sidebar or toggle button not found!");
        return;
    }

    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate"); // Apply rotate class to button

    console.log('%c' + (sidebar.classList.contains("close") ? "Closing sidebar..." : "Opening sidebar..."), 'color: lightgray;');

}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded. Setting up event listeners...");

    const toggleButton = document.getElementById("toggle-btn");

    if (toggleButton) {
        toggleButton.onclick = toggleSidebar; // Assign function directly
    } else {
        console.error("Toggle button not found in the DOM.");
    }
});
