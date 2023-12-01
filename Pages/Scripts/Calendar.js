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