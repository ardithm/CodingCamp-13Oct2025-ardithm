let taskDb = [];

// Tambah task baru
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskDate = document.getElementById("date-input");

  if (!validateInput(taskInput.value, taskDate.value)) return;

  const newTask = {
    id: Date.now(),
    name: taskInput.value.trim(),
    date: taskDate.value,
    status: "Pending"
  };

  taskDb.push(newTask);
  taskInput.value = "";
  taskDate.value = "";

  renderTaskList(taskDb);
}

// Validasi input
function validateInput(task, date) {
  if (task.trim() === "" || date.trim() === "") {
    alert("Tasks and dates cannot be empty!");
    return false;
  }
  return true;
}

// Render list tugas
function renderTaskList(tasks) {
  const tableBody = document.getElementById("tasks-list");

  if (tasks.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="py-4 text-center text-[#efdfbb]/70">No tasks added yet.</td></td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = tasks
    .map(
      (task) => `
      <tr class="border-b border-[#5b1d25] text-[#efdfbb]">
        <td class="py-2 pl-2 text-left">${task.name}</td>
        <td class="py-2">${task.date}</td>
        <td class="py-2">${task.status}</td>
        <td class="py-2 text-right pr-2">
          <button onclick="toggleStatus(${task.id})" class="bg-[#efdfbb] text-[#722F37] text-xs px-3 py-1 rounded-md font-semibold hover:scale-105 transition">Status</button>
          <button onclick="deleteTask(${task.id})" class="bg-[#722F37] text-[#efdfbb] text-xs px-3 py-1 rounded-md hover:scale-105 transition">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Ganti status tugas
function toggleStatus(id) {
  taskDb = taskDb.map((task) =>
    task.id === id
      ? { ...task, status: task.status === "Pending" ? "Done" : "Pending" }
      : task
  );
  renderTaskList(taskDb);
}

// Hapus satu task
function deleteTask(id) {
  taskDb = taskDb.filter((task) => task.id !== id);
  renderTaskList(taskDb);
}

// Hapus semua task
function deleteAllTasks() {
  if (taskDb.length === 0) {
    alert("No tasks to delete!");
    return;
  }

  if (confirm("Are you sure you want to delete all tasks?")) {
    taskDb = [];
    renderTaskList(taskDb);
  }
}

// Filter berdasarkan nama atau tanggal
function filterTasks() {
  const searchValue = document.getElementById("task-input").value.toLowerCase();
  const searchDate = document.getElementById("date-input").value;

  const filtered = taskDb.filter((task) => {
    const matchName = task.name.toLowerCase().includes(searchValue);
    const matchDate = searchDate ? task.date === searchDate : true;
    return matchName && matchDate;
  });

  renderTaskList(filtered);
}

// Event listener
document.getElementById("add-task-button").addEventListener("click", addTask);
document.getElementById("filter-task").addEventListener("click", filterTasks);
document.getElementById("delete-all").addEventListener("click", deleteAllTasks);

// Render awal
renderTaskList(taskDb);
