const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ExcelJS = require('exceljs');
const fs = require('fs').promises;

app.use(bodyParser.json());
app.use(cors());
let registrationCounter = 1;