document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("todo-list");
    const addBtn = document.getElementById("add-btn");
  
    function createLine() {
      const line = document.createElement("div");
      line.classList.add("line");
  
      line.innerHTML = `
        <input id="tickmark" type="checkbox">
        <input type="text" class="line-context">
        <button class="delete-btn">✖</button>
      `;
  
      // Add delete functionality
      const deleteBtn = line.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        line.remove();
      });
  
      list.appendChild(line);
    }
  
    // Add line when + Add button is clicked
    addBtn.addEventListener("click", createLine);
  
    // Make sure the delete button works for any existing lines on page load
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", function () {
        this.parentElement.remove();
      });
    });
  });
document.addEventListener('contextmenu', e => e.preventDefault());const bgVideo = document.querySelector('.bg-video');