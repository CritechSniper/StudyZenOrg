// init Quill editor
const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: '#toolbar'
    }
  });
  
  // Example: Save notes when button is clicked
  document.getElementById('saveNotes').addEventListener('click', () => {
    const content = quill.root.innerHTML;
    console.log('Saving content:', content);
  
    // TODO: Replace this with Firebase saving logic
  });
  