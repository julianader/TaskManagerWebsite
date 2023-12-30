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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const workbook = new ExcelJS.Workbook();
        const filePath = 'WebsiteData.xlsx';        
        await workbook.xlsx.readFile(filePath);
    
        const worksheet = workbook.getWorksheet('User Data'); // Assuming your data is on the first sheet
    
        // Get the values from the respective columns
        const usernameColumn = worksheet.getColumn(5).values;
        const passwordColumn = worksheet.getColumn(6).values;
   
        // Replace 'searchedUsername' and 'searchedPassword' with the actual data you're searching for
        const searchedUsername = email;
        const searchedPassword = password;
    
        const rowIndex = usernameColumn.indexOf(searchedUsername);
    
        if (passwordColumn[rowIndex] === searchedPassword) {
          res.send('Login successful');
          console.log(email);
          console.log(password);
          console.log("Login Successful");
        } else {
            console.log(email);
            console.log(password);
            console.log("Invalid Invalid");
          res.send('Login Failed');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/', (req, res) => {
    res.send('Server is running.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});