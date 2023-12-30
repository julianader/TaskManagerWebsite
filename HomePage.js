function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function performLogin() {
    // Get user input
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // Validate login (you can replace this with actual validation logic)
    if (email && password) {
        alert('Login successful!'); // Replace this with your actual login logic
        closePopup('loginPopup');
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

function performRegistration() {
    // Get user input
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('registerEmail').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var password = document.getElementById('registerPassword').value;

    // Validate registration (you can replace this with actual validation logic)
    if (firstName && lastName && email && phoneNumber && password) {
        alert('Registration successful!'); // Replace this with your actual registration logic
        closePopup('registerPopup');
    } else {
        alert('Please fill in all fields.');
    }
}