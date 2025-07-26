window.addEventListener("load", function () {
  // User from local storage
  const userData = JSON.parse(localStorage.getItem("user"));

  // Define an array of greetings
  const greetings = ["Hi", "Hello", "Welcome", "Bonjour", "Hola", "Greetings", "Hey there", "Sup'"];

  // Randomly select a greeting
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  if (userData && typeof userData === "object") {
    // Ensure user data exists before setting textContent
    document.getElementById("userGreetings").textContent = `${randomGreeting} ${userData.firstName}!`;
  } else {
    // If no user data is found, show a default message
    document.getElementById('userGreetings').textContent = `${randomGreeting}!`;
  }
});

let currentCard = null;

function showPopup(message, cardId) {
  const popupBox = document.getElementById('pbox');
  const popupContent = document.getElementById('pcontent');

  currentCard = cardId;

  if (popupBox && popupContent) {
    popupContent.innerHTML = `
      ${message}<br>
      <button id="openLink">Open Feature</button>
    `;

    // Show popup
    popupBox.style.display = 'flex';

    // Trigger fade-in
    requestAnimationFrame(() => {
      popupBox.style.opacity = '1';
    });

    // Button handler
    const openLinkButton = document.getElementById('openLink');
    if (openLinkButton) {
      openLinkButton.addEventListener('click', () => {
        const pages = {
          'timetable-card': 'timetable.html',
          'notes-card': 'notes.html',
          'todo-card': 'todo.html',
          'exclusive1': 'chat.html'
        };
        if (currentCard && pages[currentCard]) {
          window.location.href = pages[currentCard];
        }
      });
    }
  }
}

function hidePopup() {
  const popupBox = document.getElementById('pbox');
  if (popupBox) {
    popupBox.style.opacity = '0';
    setTimeout(() => {
      popupBox.style.display = 'none';
    }, 300); // Match CSS transition duration
  }
}

function initCardEvents() {
const cards = {
  'timetable-card': {
    url: 'timetable.html',
    message: 'View your daily class schedule.',
    subtitle: 'You must use this!',
    title: 'Timetable'
  },
  'notes-card': {
    url: 'notes.html',
    subtitle: 'Defenitely must use this!',
    message: 'Check and review your saved notes.',
    title: 'Notes'
  },
  'todo-card': {
    url: 'todo.html',
    message: 'Add and manage your tasks easily.',
    subtitle: 'Absolutely must use this!',
    title: 'To-Do List'
  },
  'exclusive1': {
    url: 'exclusive.html',
    message: 'This is an exclusive feature for people who are using a school account!',
    subtitle: 'You must use this!',
    title: 'Chat (Exclusive Feature)'
  }
};

Object.keys(cards).forEach(cardId => {
  const el = document.getElementById(cardId);
  if (el) {
    el.addEventListener('click', () => {
      const { title, message, subtitle } = cards[cardId];
      showPopup(`<h2 class="popup-title">${title}</h3><p><i>${subtitle}</i></p><p>${message}</p>`, cardId);
    });
  }
});
  const popupBox = document.getElementById('pbox');
  const popupContent = document.getElementById('pcontent');

  if (popupBox) {
    popupBox.addEventListener('click', hidePopup);
  }
  if (popupContent) {
    popupContent.addEventListener('click', e => e.stopPropagation());
  }
}
document.addEventListener('DOMContentLoaded', initCardEvents);