
 // Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Initialize the app
function initializeApp() {
  // Load tasks from localStorage
  let tasks = loadTasksFromLocalStorage();
  
  // Render tasks to the UI
  renderTasks(tasks);
  
  // Attach event listener for the "Add Task" button
  addTaskBtn.addEventListener('click', () => addTask(tasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render the tasks to the UI
function renderTasks(tasks) {
  taskList.innerHTML = ''; // Clear the existing list
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index, tasks);
    taskList.appendChild(taskElement);
  });
}

// Create a task element
function createTaskElement(task, index, tasks) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span contenteditable="true" onblur="updateTask(${index}, this.innerText, tasks)">${task}</span>
    <button class="deleteBtn">Delete</button>
  `;
  
  // Add event listener for delete button
  const deleteButton = li.querySelector('.deleteBtn');
  deleteButton.addEventListener('click', function() {
    deleteTask(index, tasks);
  });
  
  return li;
}

// Add a new task
function addTask(tasks) {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText); // Add new task to the array
    taskInput.value = ''; // Clear input
    saveTasksToLocalStorage(tasks); // Save to localStorage
    renderTasks(tasks); // Re-render the tasks
  }
}

// Update an existing task
function updateTask(index, newText, tasks) {
  tasks[index] = newText; // Update the task text
  saveTasksToLocalStorage(tasks); // Save the updated list
  renderTasks(tasks); // Re-render the tasks
}

// Delete a task
function deleteTask(index, tasks) {
  tasks.splice(index, 1); // Remove the task from the array
  saveTasksToLocalStorage(tasks); // Save the updated list
  renderTasks(tasks); // Re-render the tasks
}

// Initialize the app when the page loads
initializeApp();

  