const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ExcelJS = require('exceljs');
const fs = require('fs').promises;

app.use(bodyParser.json());
app.use(cors());

let registrationCounter = 1;

async function saveToExcel(data) {
    const filePath = 'WebsiteData.xlsx';
    const workbook = new ExcelJS.Workbook();
    let sheet;

    try {
        // Read the existing workbook or create a new one if not exists
        await workbook.xlsx.readFile(filePath);
        sheet = workbook.getWorksheet('User Data');

        // Find the next empty row in the sheet
        const nextRow = sheet.lastRow ? sheet.lastRow.number + 1 : 2;

        // Add data to the next empty row
        const newRow = sheet.getRow(nextRow);
        newRow.getCell(1).value = data.registrationCounter;
        newRow.getCell(2).value = data.firstName;
        newRow.getCell(3).value = data.lastName;
        newRow.getCell(4).value = data.phoneNumber;
        newRow.getCell(5).value = data.email;
        newRow.getCell(6).value = data.password;

        // Write the updated workbook to the file
        await workbook.xlsx.writeFile(filePath);

        console.log('Data added to Excel file:', data);
    } catch (error) {
        console.error('Error in saveToExcel:', error);
        throw error;
    }
}

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
