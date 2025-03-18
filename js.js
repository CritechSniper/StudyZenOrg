console.log(`STOP! YOU ARE NOT ALLOWED TO VIEW THE SOURCE CODE!\nIF YOU WANT TO SEE THE SOURCE CODE, PLEASE CONTACT THE OWNER OF THE WEBSITE!`);

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input, textarea");
    const searchBar = document.getElementById("search"); // Assuming your search bar has an ID of 'search'

    inputs.forEach(input => {
        if (input !== searchBar) { // Ignore the search bar
            const storedValue = localStorage.getItem(input.id || input.name);
            if (storedValue) {
                input.value = storedValue;
            }
            input.addEventListener("input", function () {
                localStorage.setItem(input.id || input.name, input.value);
            });
        }
    });
});


function search() {
    console.log("Search button clicked");
    let input = document.getElementById("search-input").value;
    const url = "https://www.google.com/search?q=" + encodeURIComponent(input);
    window.open(url, "_blank");
}

function classroomlink() {
    console.log("Classroom button clicked");
    var url = "https://classroom.google.com/";
    window.open(url, "_blank");
}

function gmaillink() {
    console.log("Gmail button clicked");
    var url = "https://mail.google.com/";
    window.open(url, "_blank");
}

function drivelink() {
    console.log("Drive button clicked");
    var url = "https://drive.google.com/";
    window.open(url, "_blank");
}

function calendarlink() {
    console.log("Calendar button clicked");
    var url = "https://calendar.google.com/";
    window.open(url, "_blank");
}

function sheetslink() {
    console.log("Sheets button clicked");
    var url = "https://sheets.google.com/";
    window.open(url, "_blank");
}

function slideslink() {
    console.log("Slides button clicked");
    var url = "https://slides.google.com/";
    window.open(url, "_blank");
}

function docslink() {
    console.log("Docs button clicked");
    var url = "https://docs.google.com/";
    window.open(url, "_blank");
}

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