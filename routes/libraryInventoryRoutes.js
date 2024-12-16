const express = require('express');
const libraryInventoryController = require('../controllers/libraryInventoryController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new express.Router();

// List books in library inventory
router.get('/',  libraryInventoryController.getLibraryInventory);

// Add a book to inventory (only Author)
router.post('/', roleMiddleware(['Author']), libraryInventoryController.addBookToInventory);

// Remove book from inventory (only Author)
router.delete('/:bookId', roleMiddleware(['Author']), libraryInventoryController.removeBookFromInventory);

module.exports = router;
