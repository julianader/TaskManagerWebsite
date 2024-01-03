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
 ////This part is used to disable the first days of the next month without entering it
 for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  //this part to add all the days of the current month
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
  ///This part is used to disable the last days of the previous month without entering it.
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  //To include the months and the days in the HTML file.
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  // Commit 4: Add Event Listeners for Task Buttons To add tasks based on the day
  const addTaskButtons = document.querySelectorAll(".add-task");
  addTaskButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const day = event.target.parentElement.dataset.day;
      const task = prompt(`Enter a task for Day ${day}:`);
      if (task) {
        //If he entered a task then add it
        addTask(day, task);
      }
    });
  });
};
// Commit 5: Define Function to Add Task
const addTask = (day, task) => {
  ////to add an edit button and a checkbox to any task
  const listItem = document.createElement("li");
  listItem.innerHTML = `<input type="checkbox" class="task-checkbox">
                        <span class="task-text">Day ${day}: ${task}</span>
                        <button class="edit-task">Edit</button>`;
  taskList.appendChild(listItem); 

  // Commit 6: Add Event Listener for the Edit Button
  //Adding actions for the edit button
  const editButton = listItem.querySelector(".edit-task");
  const taskText = listItem.querySelector(".task-text");
  const checkbox = listItem.querySelector(".task-checkbox");

  //The action of editing the task itself
  editButton.addEventListener("click", () => {
    const updatedTask = prompt("Enter the updated task:", taskText.innerText.split(":")[1].trim());
    if (updatedTask !== null) {
      taskText.innerText = `Day ${day}: ${updatedTask}`;
    }
  });

   // Commit 7: Add Event Listener for Checkbox
   ///To change the format of the ticked task to be strikethrough
   checkbox.addEventListener("change", () => {
    taskText.classList.toggle("strikethrough", checkbox.checked);
  });
};
// Commit 8: Initial Calendar Rendering
//To show the task
renderCalendar();

// Commit 9: Add Event Listeners for Prev/Next Icons
prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
  
      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });