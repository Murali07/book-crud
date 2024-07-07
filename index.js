const express = require('express');
const dontenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

dontenv.config();

const app = express();

const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use('/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})