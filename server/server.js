const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./src/router/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});