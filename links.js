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