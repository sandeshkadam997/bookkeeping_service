const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const {jwtAuthMiddleware} = require('./jwt');

// const bodyParser = require('body-parser'); 
// app.use(bodyParser.json()); 
app.use(express.json());
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const libraryInventoryRoutes = require('./routes/libraryInventoryRoutes');

app.use('/api/users', userRoutes);
app.use('/api/books',jwtAuthMiddleware, bookRoutes);
app.use('/api/libraries',jwtAuthMiddleware, libraryRoutes);
app.use('/api/borrow',jwtAuthMiddleware, borrowRoutes);
app.use('/api/libraries',jwtAuthMiddleware, libraryInventoryRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})