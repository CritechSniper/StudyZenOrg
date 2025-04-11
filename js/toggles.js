function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggle-btn");
    const saveTable = document.getElementById("saveTable");
    const saveNotes = document.getElementById("saveNotes");

    if (!sidebar || !toggleButton) {
        console.error("Sidebar or toggle button not found!");
        return;
    }

    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
    saveTable.classList.toggle("close");
    saveNotes.classList.toggle("close");
}