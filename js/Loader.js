window.onload = function () {
    console.log("Page fully loaded. Waiting before hiding loader...");
    setTimeout(() => {
        let loader = document.querySelector(".loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                console.log("Loader hidden!");
            }, 500);
        }
    }, 3000); // Loader stays for 3 seconds before hiding
};
