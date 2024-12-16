const Library = require('../models/library');

// GET library inventory
exports.getLibraryInventory = async (req, res) => {
    const { id } = req.params;

    try {
        const library = await Library.findById(id).populate('books');
        if (!library) {
            return res.status(404).json({ error: 'Library not found' });
        }

        res.status(200).json({ books: library.books });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// POST add book to library inventory
exports.addBookToInventory = async (req, res) => {
    const { id } = req.params;
    const { bookId } = req.body;

    try {
        const library = await Library.findById(id);
        if (!library) {
            return res.status(404).json({ error: 'Library not found' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        library.books.push(book);
        await library.save();

        res.status(200).json({ message: 'Book added to inventory' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE remove book from library inventory
exports.removeBookFromInventory = async (req, res) => {
    const { id, bookId } = req.params;

    try {
        const library = await Library.findById(id);
        if (!library) {
            return res.status(404).json({ error: 'Library not found' });
        }

        const bookIndex = library.books.indexOf(bookId);
        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not in inventory' });
        }

        library.books.splice(bookIndex, 1);
        await library.save();

        res.status(200).json({ message: 'Book removed from inventory' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
