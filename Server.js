const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ExcelJS = require('exceljs');
const fs = require('fs').promises;

app.use(bodyParser.json());
app.use(cors());
let registrationCounter = 1;
app.post('/register', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    
    // Increment the registration counter for the next registration
    registrationCounter++;

    const userData = {
        registrationCounter: registrationCounter,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
    };
    try {
        await saveToExcel(userData);
        res.send('Registration successful!');
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).send('Registration failed. Please try again.');
    }
});
app.get('/', (req, res) => {
    res.send('Server is running.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});