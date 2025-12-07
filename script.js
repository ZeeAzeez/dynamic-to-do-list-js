document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage when page loads
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Add a new task
  function addTask(taskText, save = true) {
    // Get task text from input if not provided
    if (save === true && taskText === undefined) {
      taskText = taskInput.value.trim();
    }

    // Check if taskText is empty
    if (taskText === "") {
      return;
    }

    // Create new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Add click event to remove button
    removeBtn.onclick = function () {
      taskList.removeChild(li);

      // Remove from Local Storage
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = storedTasks.filter((task) => task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    // Append button to list item
    li.appendChild(removeBtn);
    // Append list item to task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";

    // Save to Local Storage if save is true
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // Load tasks when page loads
  loadTasks();

  // Add task when button is clicked
  addButton.addEventListener("click", addTask);

  // Add task when Enter key is pressed
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
