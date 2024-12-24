const express = require('express');
const libraryInventoryController = require('../controllers/libraryInventoryController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new express.Router();

// List books in library inventory
router.get('/:id/inventory',  libraryInventoryController.getLibraryInventory);

// Add a book to inventory (only Author)
router.post('/:id/inventory', roleMiddleware(['Author']), libraryInventoryController.addBookToInventory);

// Remove book from inventory (only Author)
router.delete('/:id/inventory/:bookId', roleMiddleware(['Author']), libraryInventoryController.removeBookFromInventory);

module.exports = router;
