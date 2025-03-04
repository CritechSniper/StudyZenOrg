console.log(`STOP! YOU ARE NOT ALLOWED TO VIEW THE SOURCE CODE!\nIF YOU WANT TO SEE THE SOURCE CODE, PLEASE CONTACT THE OWNER OF THE WEBSITE!`);
// function search() {
//     console.log("Search button clicked");
//     var input = document.getElementById("searchbar").value;
//     var url = "https://www.google.com/search?q=" + encodeURIComponent(input);
//     window.open(url, "_blank");
// }

// Ensure DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function() {
    // Open search popup
    document.getElementById("openSearch").addEventListener("click", function() {
        document.getElementById("searchPopup").style.display = "block";
    });

    // Close search popup
    document.getElementById("closeSearch").addEventListener("click", function() {
        document.getElementById("searchPopup").style.display = "none";
    });

    // Search function (Example: alert input value)
    document.getElementById("searchBtn").addEventListener("click", function() {
        let query = document.getElementById("searchbar").value;
        alert("You searched for: " + query);
    });
});

function search() {
    console.log("Search button clicked");
    var input = document.getElementById("searchbar").value;
    var url = "https://www.google.com/search?q=" + encodeURIComponent(input);
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
