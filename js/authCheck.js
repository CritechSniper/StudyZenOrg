document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));
    const profileNavItem = document.querySelector('a[href="profile.html"]');

    if (!userData && profileNavItem) {
        // Replace the profile link with a "Log In" button
        profileNavItem.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M480-480q-83 0-141.5-58.5T280-680q0-83 58.5-141.5T480-880q83 0 141.5 58.5T680-680q0 83-58.5 141.5T480-480Zm0 80q83 0 156 31.5t127 85.5q54 54 85.5 127T880-80H80q0-83 31.5-156t85.5-127q54-54 127-85.5T480-400Z"/>
            </svg>
            <span>Log In</span>
        `;
        profileNavItem.href = "login.html"; // Redirect to login page
    }
});
