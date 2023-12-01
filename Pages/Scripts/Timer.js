let intervalId; // Declare intervalId as a global variable
let countDownDate; // Declare countDownDate as a global variable

document.getElementById("startButton").addEventListener("click", function () {
    startCountdown();
  });
  
  document.getElementById("resetButton").addEventListener("click", function () {
    resetCountdown();
  });