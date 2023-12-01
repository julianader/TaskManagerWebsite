let intervalId; // Declare intervalId as a global variable
let countDownDate; // Declare countDownDate as a global variable

document.getElementById("startButton").addEventListener("click", function () {
    startCountdown();
  });
  
  document.getElementById("resetButton").addEventListener("click", function () {
    resetCountdown();
  });

  function startCountdown() {
    const countdownTimeInMinutes = document.getElementById("countdownTime").value;
    const countdownInput = document.getElementById("countdownTime");
  
    if (!countdownTimeInMinutes || isNaN(countdownTimeInMinutes)) {
      alert("Please enter a valid countdown time.");
      return;
    }
  
    const countdownTimeInMilliseconds = countdownTimeInMinutes * 60 * 1000;
    countDownDate = new Date().getTime() + countdownTimeInMilliseconds;
  
    countdownInput.disabled = true; // Disable the input field
  
    clearInterval(intervalId); // Clear any previous intervals
  
    intervalId = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;
  
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("countdown").innerHTML = `${hours}:${minutes}:${seconds}`;
  
      if (distance < 0) {
        clearInterval(intervalId); // Stop the countdown when time has ended
        document.getElementById("countdown").innerHTML = "Time has ended";
        countdownInput.disabled = false; // Enable the input field when the countdown ends
      }
    }, 1000);
  }

  function resetCountdown() {
    clearInterval(intervalId); // Stop the ongoing countdown
  
    // Reset the timer to 00:00:00
    document.getElementById("countdown").innerHTML = "00:00:00";
  
    const countdownInput = document.getElementById("countdownTime");
    countdownInput.disabled = false; // Enable the input field when resetting the countdown
  }