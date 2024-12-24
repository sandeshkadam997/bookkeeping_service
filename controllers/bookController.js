const Book = require('../models/book');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author').populate('library').populate('borrower');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
    try {
    const book = await Book.findById(req.params.id).populate('library').populate('author').populate('borrower');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
console.log('Request received:', req.body);
  const bookData = req.body;
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    console.log('Book saved:', req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Error creating book' });
  }
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
  const bookData = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, bookData,
         { new: true,
           runValidators: true 
        });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    console.log('Book updated successfully');
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    console.log('Book deleted successfully');
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting book' });
  }
};
