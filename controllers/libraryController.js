const Library = require('../models/library');

// Get all libraries
exports.getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find().populate('books');
    res.status(200).json({ message: req.t('librariesFetchedSuccessfully'), libraries});
  } catch (error) {
    res.status(500).json({ error: req.t('errorFetchingLibraries') });
  }
};

// Get a library by ID
exports.getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate('books');
    if (!library) {
      return res.status(404).json({ error: req.t('libraryNotFound') });
    }
    res.status(200).json({ message: req.t('libraryFetchedSuccessfully'), library });
  } catch (error) {
    res.status(500).json({ error: req.t('errorFetchingLibrary') });
  }
};

// Create a new library
exports.createLibrary = async (req, res) => {
  const libraryData = req.body;
  try {
    const newLibrary = new Library(libraryData);
    await newLibrary.save();
    console.log('Book Saved:',newLibrary);
    res.status(201).json({ message: req.t('libraryCreatedSuccessfully'), library: newLibrary });;
  } catch (error) {
    res.status(400).json({ error: req.t('errorCreatingLibrary') });
  }
};

// Update a library by ID
exports.updateLibraryById = async (req, res) => {
  const libraryData = req.body;
  try {
    const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, libraryData, { new: true, runValidators: true });
    if (!updatedLibrary) {
      return res.status(404).json({ error: req.t('libraryNotFound') });
    }
    res.status(200).json({ message: req.t('libraryUpdatedSuccessfully'), library: updatedLibrary });
  } catch (error) {
    res.status(400).json({ error: req.t('errorUpdatingLibrary') });
  }
};

// Delete a library by ID
exports.deleteLibraryById = async (req, res) => {
  try {
    const deletedLibrary = await Library.findByIdAndDelete(req.params.id);
    if (!deletedLibrary) {
      return res.status(404).json({ error: req.t('libraryNotFound') });
    }
    res.status(200).json({ message: req.t('libraryDeletedSuccessfully') });
  } catch (error) {
    res.status(500).json({ error: req.t('errorDeletingLibrary') });
  }
};
