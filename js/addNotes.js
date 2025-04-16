// Add a new note when the "Add Note" button is clicked


// Load notes from localStorage when the page is fully loaded
window.addEventListener('DOMContentLoaded', loadNotes);

/**
 * Adds a new note to the DOM and sets up event listeners.
 * @param {string} content - The content of the new note (optional).
 */
function addNote(content = '') {
    // Create the note container
    const note = `
    <div id="noteDiv" style="display: flex; flex-direction: row; column-gap: 5px; width: fit-content; margin-bottom: 5px;">
      <input type="checkbox"><textarea style="resize: none; max-width: 500px; max-height: 200px; height: 25px; font-size: 15px;" id="toDo"></textarea>
    </div>
    `
    let textarea = document.getElementById('toDo')
    textarea.addEventListener('input', updateLocalStorage); // Save changes to localStorage
    note.appendChild(textarea);

    // Create the delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
            note.remove(); // Remove the note
            updateLocalStorage(); // Update localStorage
    });
    
    note.appendChild(deleteBtn);

    // Add the note to the notes container
    document.getElementById('notes').appendChild(note);

    // Ensure the textarea does not receive immediate focus
    textarea.blur();

    // Update localStorage immediately after adding a new note
    updateLocalStorage();
}

/**
 * Updates the localStorage with the current state of all notes.
 */
function updateLocalStorage() {
    const notes = Array.from(document.querySelectorAll('.note textarea')).map(textarea => ({
        content: textarea.value
    }));
    localStorage.setItem('notes', JSON.stringify(notes));
}

/**
 * Loads notes from localStorage and adds them to the DOM.
 */
function loadNotes() {
    try {
        // Parse notes from localStorage or initialize with an empty array
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

        // Add each saved note to the DOM
        savedNotes.forEach(note => addNote(note.content));
    } catch (error) {
        console.error('Error loading notes from localStorage:', error);
    }
}


