const express = require('express');
const libraryController = require('../controllers/libraryController');


const router = new express.Router();

router.get('/',  libraryController.getAllLibraries);
router.get('/:id',  libraryController.getLibraryById);
router.post('/',  libraryController.createLibrary);
router.put('/:id',  libraryController.updateLibraryById);
router.delete('/:id',  libraryController.deleteLibraryById);

module.exports = router;
