document.addEventListener("DOMContentLoaded", () => {
    const goBelow = document.querySelector('.goBelow');
    let hidden = false;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const screenHeight = window.innerHeight;
        const scrollThreshold = screenHeight * 0.3;

        if (!hidden && scrollY > scrollThreshold) {
            goBelow.classList.add('fade-out');
            hidden = true;

            // Remove from layout after fade
            setTimeout(() => {
                goBelow.style.display = 'none';
            }, 500); // Match transition duration
        }
    });
});
