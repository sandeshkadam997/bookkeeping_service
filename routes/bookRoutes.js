const express = require('express');
const bookController = require('../controllers/bookController');
const { setLocale } = require('../middleware/multilingualMiddleware');

const router = new express.Router();

router.use(setLocale);

router.get('/', bookController.getAllBooks);
router.get('/:id',  bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBookById);
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
