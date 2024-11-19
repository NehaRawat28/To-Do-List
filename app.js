document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task)); // Corrected 'taks' to 'task'
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim(); // Corrected 'valur' to 'value'

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; // Clear input after adding task
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text; // Set input field to task text

    tasks.splice(index, 1); // Remove task from array
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100; // Prevent division by zero

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`; // Fixed 'widows' to 'width'

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById('taskList'); // Fixed 'task-list' to 'taskList'
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('taskItem');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <!-- Updated image paths to reflect the folder structure -->
                <img src="images/edit.jpeg" onClick="editTask(${index})" alt="Edit task"/>
                <img src="images/bin.png" onClick="deleteTask(${index})" alt="Delete task"/>
            </div>
        </div>
        `;
        
        // Add event listener for checkbox to toggle completion
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));

        taskList.append(listItem);
    });
};

// Event listener for form submit to add task
document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    addTask();
});
