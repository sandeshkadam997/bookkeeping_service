const Library = require('../models/library');

// Get all libraries
exports.getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find().populate('books');
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching libraries' });
  }
};

// Get a library by ID
exports.getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate('books');
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching library' });
  }
};

// Create a new library
exports.createLibrary = async (req, res) => {
  const libraryData = req.body;
  try {
    const newLibrary = new Library(libraryData);
    await newLibrary.save();
    console.log('Book Saved:',newLibrary);
    res.status(201).json(newLibrary);
  } catch (error) {
    res.status(400).json({ error: 'Error creating library' });
  }
};

// Update a library by ID
exports.updateLibraryById = async (req, res) => {
  const libraryData = req.body;
  try {
    const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, libraryData, { new: true, runValidators: true });
    if (!updatedLibrary) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.status(200).json(updatedLibrary);
  } catch (error) {
    res.status(400).json({ error: 'Error updating library' });
  }
};

// Delete a library by ID
exports.deleteLibraryById = async (req, res) => {
  try {
    const deletedLibrary = await Library.findByIdAndDelete(req.params.id);
    if (!deletedLibrary) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.status(200).json({ message: 'Library deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting library' });
  }
};
