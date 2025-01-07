const Library = require('../models/library');
const Book = require('../models/book');

// GET library inventory
exports.getLibraryInventory = async (req, res) => {
    const { id } = req.params;

    try {
        const library = await Library.findById(id).populate('books');
        if (!library) {
            return res.status(404).json({ error: req.t("libraryNotFound") });
        }

        res.status(200).json({ message: req.t("inventoryFetchedSuccessfully"), books: library.books });
    } catch (error) {
        res.status(400).json({ error: req.t("errorFetchingInventory") });
    }
};

// POST add book to library inventory
exports.addBookToInventory = async (req, res) => {
    const { id } = req.params;
    const { bookId } = req.body;

        try {
        const library = await Library.findById(id);
        if (!library) {
            return res.status(404).json({ error: req.t("libraryNotFound") });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: req.t("bookNotFound") });
        }

        library.books.push(book);
        await library.save();

        res.status(200).json({ message: req.t("bookAddedToInventory") });
    } catch (error) {
        res.status(400).json({ error: req.t("errorAddingBookToInventory") });
    }
};

// DELETE remove book from library inventory
exports.removeBookFromInventory = async (req, res) => {
    const { id, bookId } = req.params;

    try {
        const library = await Library.findById(id);
        if (!library) {
            return res.status(404).json({ error: req.t("libraryNotFound") });
        }

        const bookIndex = library.books.indexOf(bookId);
        if (bookIndex === -1) {
            return res.status(404).json({ error: req.t("bookNotInInventory") });
        }

        library.books.splice(bookIndex, 1);
        await library.save();

        res.status(200).json({ message: req.t("bookRemovedFromInventory") });
    } catch (error) {
        res.status(400).json({ error: req.t("errorRemovingBookFromInventory") });
    }
};
