require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const {createLanes} = require('./model/lane.model')

const router = require('./routes/routes');

app.use(express.json());
app.use('/api/kaglas', router);

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log('error')
});

database.once('connected', (error) => {
    console.log('Connected to database successfully!')
    createLanes();
});

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);

})

module.exports = database;