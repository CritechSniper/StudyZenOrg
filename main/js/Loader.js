window.onload = function() {
    setTimeout(() => {
    const overlay = document.querySelector('.loader-overlay');
    const loader = document.querySelector('.loaderS');

    if (overlay) overlay.style.opacity = '0';
    if (loader) loader.style.opacity = '0';

    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';
        if (loader) loader.style.display = 'none';
    }, 700);
    }, 400);
};
// window.addEventListener('load', () => {
// setTimeout(() => {
//     const overlay = document.querySelector('.loader-overlay');
//     const loader = document.querySelector('.loaderS');

//     // Start fading out
//     if (overlay) overlay.style.opacity = '0';
//     if (loader) loader.style.opacity = '0';

//     // After fade-out completes (0.5s), hide the elements
//     setTimeout(() => {
//     if (overlay) overlay.style.display = 'none';
//     if (loader) loader.style.display = 'none';
//     }, 500);
// }, 1400);
// });