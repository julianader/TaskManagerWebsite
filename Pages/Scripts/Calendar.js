// Commit 1: Initialize Calendar Variables
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  taskList = document.querySelector(".task-list");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Commit 2: Define Calendar Rendering Function
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

 // Commit 3: Generate Calendar Days
 for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-day="${i}">
        ${i}
        <button class="add-task">+</button>
        </li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  // Commit 4: Add Event Listeners for Task Buttons
  const addTaskButtons = document.querySelectorAll(".add-task");
  addTaskButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const day = event.target.parentElement.dataset.day;
      const task = prompt(`Enter a task for Day ${day}:`);
      if (task) {
        addTask(day, task);
      }
    });
  });
};
// Commit 5: Define Function to Add Task
const addTask = (day, task) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<input type="checkbox" class="task-checkbox">
                        <span class="task-text">Day ${day}: ${task}</span>
                        <button class="edit-task">Edit</button>`;
  taskList.appendChild(listItem); 