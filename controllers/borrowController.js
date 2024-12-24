const Book = require('../models/book');

exports.borrowBook = async (req, res) => {
    const { bookId,userId } = req.body;
   
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        if (book.borrower) {
            return res.status(400).json({ error: 'Book is already borrowed' });
        }

        book.borrower = userId;
        console.log(book.borrower);
        await book.save();

        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user._id;

    try {
        const book = await Book.findById(bookId);
        if (!book || book.borrower !== userId) {
            return res.status(404).json({ error: 'Book not found or not borrowed by this user' });
        }

        book.borrower = null;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
