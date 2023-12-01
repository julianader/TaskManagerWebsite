function addTaskWithDateTime() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    var dateInput = document.getElementById("dateInput");
    var timeInput = document.getElementById("timeInput");

    var selectedDate = dateInput.value;
    var selectedTime = timeInput.value;

    if (taskText !== "") {
        if (selectedDate !== "" && selectedTime !== "") {
            var taskList = document.getElementById("taskList");
            var newTask = document.createElement("li");
            newTask.textContent = taskText;
            taskList.appendChild(newTask);

            var taskChips = document.getElementById("taskChips");
            var taskWithDateTime = document.createElement("div");
            taskWithDateTime.classList.add("chip");
            var dateTimeText = "Date: " + selectedDate + ", Time: " + selectedTime;
            taskWithDateTime.textContent = taskText + " - " + dateTimeText;

            var removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                taskChips.removeChild(taskWithDateTime);
                taskList.removeChild(newTask);
            };
            taskWithDateTime.appendChild(removeButton);

            taskChips.appendChild(taskWithDateTime);

            // Clear all inputs after adding task with date/time
            taskInput.value = "";
            dateInput.value = "";
            timeInput.value = "";
        } else {
            alert("Please select both date and time!");
        }
    } else {
        alert("Please enter a task!");
    }
}
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default behavior of the "Enter" key in the input
        addTaskWithDateTime();
    }
});