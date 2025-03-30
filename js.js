console.log(`STOP! YOU ARE NOT ALLOWED TO VIEW THE SOURCE CODE!\nIF YOU WANT TO SEE THE SOURCE CODE, PLEASE CONTACT THE OWNER OF THE WEBSITE!`);
// alert('Dear user Please refain from reloading the page if you have added details. As this website is still on work, some features might not work properly. If you have feedbacks/suggestions, please send it buy clicking on the email below the page on the footer')

function showHelp() {
    alert("Welcome to School Work Organizer!\n\n- Use the search bar to search faster.\n- Add notes using the '+ Add Note' button.\n- Save your timetable to avoid losing data.\n- Use the sidebar for quick links to Google services.");
}

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
