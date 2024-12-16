const express = require('express');
const libraryController = require('../controllers/libraryController');
const roleMiddleware = require('../middleware/roleMiddleware');

// const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/',  libraryController.getAllLibraries);
router.get('/:id',  libraryController.getLibraryById);
router.post('/',  libraryController.createLibrary);
router.put('/:id',  libraryController.updateLibraryById);
router.delete('/:id',  libraryController.deleteLibraryById);

module.exports = router;
