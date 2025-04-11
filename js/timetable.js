function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggle-btn");
    const saveTable = document.getElementById("saveTable");

    if (!sidebar || !toggleButton) {
        console.error("Sidebar or toggle button not found!");
        return;
    }

    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate"); // Apply rotate class to button
    saveTable.classList.toggle("close");

    console.log('%c' + (sidebar.classList.contains("close") ? "Closing sidebar..." : "Opening sidebar..."), 'color: lightgray;');

}