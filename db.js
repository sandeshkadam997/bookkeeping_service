const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL_Local= process.env.mongoURL_Local
const mongoURL_Atlas= mongodb+srv://sandeshkadam997:oNHHZ1ewtRT1G8Nd@bookeeping-service.hukoz.mongodb.net/
// const mongoURL_Atlas= process.env.mongoURL_Atlas

mongoose.connect(mongoURL_Atlas, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 50000 })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


module.exports = db;

