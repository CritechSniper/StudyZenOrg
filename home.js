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
document.addEventListener('contextmenu', e => e.preventDefault());const bgVideo = document.querySelector('.bg-video');

// window.addEventListener('scroll', () => {
//   const scrollTop = window.scrollY;
//   const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//   const scrollPercent = scrollTop / docHeight;

//   // Invert the percentage so top = 1 and bottom = 0
//   const opacity = 1 - Math.min(Math.max(scrollPercent, 0), 1);
//   bgVideo.style.opacity = opacity.toFixed(2);
// });
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  const fadeEnd = 0.5; // Fade ends at 50% scroll
  let opacity;

  if (scrollPercent < fadeEnd) {
    opacity = 1 - (scrollPercent / fadeEnd); // Fades from 1 to 0 by 50% scroll
  } else {
    opacity = 0;
  }

  bgVideo.style.opacity = opacity.toFixed(2);
});
