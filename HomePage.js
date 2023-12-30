function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

let registrationCounter = 1;

function performRegistration() {
    var firstName = document.querySelector("#registerPopup input[placeholder='First Name']").value;
    var lastName = document.querySelector("#registerPopup input[placeholder='Last Name']").value;
    var phoneNumber = document.querySelector("#registerPopup input[placeholder='Phone Number']").value;
    var email = document.querySelector("#registerPopup input[type='email']").value;
    var password = document.querySelector("#registerPopup input[type='password']").value;

    if (firstName === '' || lastName === '' || phoneNumber === '' || email === '' || password === '') {
        alert('Please fill in all the fields');
    } else {
        // Send registration data to the server
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                password: password,
                registrationCounter: registrationCounter,
            }),
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            closePopup('registerPopup');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    }
}
function goToTasks() {
    window.location.href = "./Pages/Tasks.html";
}

function goToTimer() {
    window.location.href = "./Pages/Timer.html";
}

function goToCalendar() {
    window.location.href = "./Pages/Calendar.html";
}

function goToBlogs() {
    window.location.href = "./Pages/Blogs.html";
}

function goToContact() {
    window.location.href = "./Pages/Contact.html";
}

function enableButtons() {
    document.getElementById('tasksButton').classList.remove('disabled');
    document.getElementById('timerButton').classList.remove('disabled');
    document.getElementById('calendarButton').classList.remove('disabled');
    document.getElementById('blogsButton').classList.remove('disabled');
    document.getElementById('contactButton').classList.remove('disabled');
}