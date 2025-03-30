function toggleTable() {
    var table = document.getElementById("myTable");
    var button = document.getElementById("toggleButton");
    if (table) {
        if (table.classList.contains("minimized")) {
            table.classList.remove("minimized");
            table.classList.add("maximized");
            button.textContent = "- Minimize Table";
        } else {
            table.classList.remove("maximized");
            table.classList.add("minimized");
            button.textContent = "+ Maximize Table";
        }
    }
}

function addNote() {
    var noteSection = document.getElementById("noteSection");
    if (noteSection) {
        var newNote = document.createElement("div"); // Create a new div element for the note
        newNote.classList.add("note"); // Add a class for styling

        var closeButton = document.createElement("button"); // Create a new button element for closing the note
        closeButton.textContent = "X"; // Set the button text to "x"
        closeButton.classList.add("closeButton"); // Add a class for styling
        closeButton.onclick = function() {
            noteSection.removeChild(newNote); // Remove the note when the button is clicked
        };

        var textArea = document.createElement("textarea"); // Create a new textarea element
        textArea.placeholder = "Add your note here...";
        textArea.classList.add("noteTextArea"); // Add a class for styling

        newNote.appendChild(closeButton); // Append the close button to the new div
        newNote.appendChild(textArea); // Append the textarea to the new div
        noteSection.appendChild(newNote); // Append the new div to the note section
    }
}

function toggleTheme() {
    const html = document.documentElement; // Access the <html> element
    var button = document.getElementById("toggleTheme");
    // Toggle between light and dark theme
    if (html.classList.contains("light-theme")) {
        html.classList.remove("light-theme");
        html.classList.add("dark-theme");
        button.textContent = "🌙";
    } else {
        html.classList.remove("dark-theme");
        html.classList.add("light-theme");
        button.textContent = "☀️";
    }
}

