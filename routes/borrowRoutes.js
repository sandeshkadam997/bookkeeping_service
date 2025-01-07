const express = require('express');
const borrowController = require('../controllers/borrowController');
const roleMiddleware = require('../middleware/roleMiddleware');
// const {jwtAuthMiddleware} = require('../jwt');

const router = new express.Router();

// Borrow a book (requires Borrower role)
router.post('/',  roleMiddleware(['Borrower']), borrowController.borrowBook);

// Return a borrowed book (requires Borrower role)
router.put('/return/:bookId',   roleMiddleware(['Borrower']), borrowController.returnBook);

module.exports = router;
