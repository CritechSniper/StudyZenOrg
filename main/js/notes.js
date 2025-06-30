import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnVEwq0ZFqrQroNRaMaU1iFNLO5X0P2MY",
  authDomain: "logindata173.firebaseapp.com",
  databaseURL: "https://logindata173-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "logindata173",
  storageBucket: "logindata173.appspot.com",
  messagingSenderId: "353759129689",
  appId: "1:353759129689:web:c92420b9e0deba90e5f683"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function formatText(command) {
  document.execCommand(command, false, null);
}

function appendHr() {
  const Docs = document.getElementById('editor');
  const hr = document.createElement('hr');
  hr.style.marginTop = '5px';
  hr.style.marginBottom = '5px';
  Docs.appendChild(hr);
}

function saveDocument() {
  const title = document.getElementById('docTitle').value.trim();
  const content = document.getElementById('editor').innerHTML;

  if (title === '') {
    alert("Please enter a title for the document.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      set(ref(database, `users/${userId}/docs/${title}`), {
        content: content,
        createdAt: Date.now()
      }).then(() => {
        alert("Document saved to Firebase!");
        populateDropdown();
      });
    } else {
      alert("Not logged in.");
    }
  });
}

function loadDocument(title) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const docRef = ref(database, `users/${userId}/docs/${title}`);

      get(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          document.getElementById('docTitle').value = title;
          document.getElementById('editor').innerHTML = snapshot.val().content;
        } else {
          alert("No such document found.");
        }
      });
    }
  });
}

function deleteDocument() {
  const title = document.getElementById('docTitle').value.trim();

  if (!title) {
    alert("No document title provided.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      remove(ref(database, `users/${userId}/docs/${title}`)).then(() => {
        alert("Document deleted.");
        document.getElementById('docTitle').value = '';
        document.getElementById('editor').innerHTML = '';
        populateDropdown();
      });
    }
  });
}

function populateDropdown() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const docsRef = ref(database, `users/${userId}/docs`);

      get(docsRef).then((snapshot) => {
        const dropdown = document.getElementById('savedDocs');
        dropdown.innerHTML = `<option value="">-- Select a saved document --</option>`;

        if (snapshot.exists()) {
          const docs = snapshot.val();
          for (const title in docs) {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            dropdown.appendChild(option);
          }
        }
      });
    }
  });
}

const saveBtn = document.querySelector('.docsbtn');

document.getElementById('savedDocs').addEventListener('change', function () {
  const selectedTitle = this.value;

  if (selectedTitle) {
    loadDocument(selectedTitle);

    // Change Save button to Update
    saveBtn.textContent = "📝 Update Document";

    // Replace click behavior to update
    saveBtn.onclick = function () {
      const newContent = document.getElementById('editor').innerHTML;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid;
          set(ref(database, `users/${userId}/docs/${selectedTitle}`), {
            content: newContent,
            updatedAt: Date.now()
          }).then(() => {
            alert("Document updated!");
            populateDropdown();
          });
        }
      });
    };
  } else {
    // Revert back to Save mode if no selection
    saveBtn.textContent = "💾 Save Document";
    saveBtn.onclick = saveDocument;
  }
});

document.addEventListener("DOMContentLoaded", populateDropdown);

window.saveDocument = saveDocument;
window.loadDocument = loadDocument;
window.deleteDocument = deleteDocument;
window.populateDropdown = populateDropdown;