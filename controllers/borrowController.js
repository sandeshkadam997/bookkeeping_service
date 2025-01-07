const Book = require('../models/book');


exports.borrowBook = async (req, res) => {
    const { bookId, borrowerId } = req.body;
    const lang = req.locale;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: req.t("bookNotFound") });
        }
        if (book.borrower) {
            return res.status(400).json({ error: req.t('bookAlreadyBorrowed') });
        }

        book.borrower = borrowerId;
        console.log(book.borrower);
        await book.save();

        res.status(200).json({ message: req.t("bookBorrowedSuccessfully") });
    } catch (error) {
        res.status(400).json({ error: req.t("errorProcessingRequest") });
    }
};

exports.returnBook = async (req, res) => {
    const { bookId } = req.params;
    const borrowerId  = req.body;

    console.log("BookId:", bookId);
    console.log("Request User ID:", borrowerId);

    try {
        const book = await Book.findById(bookId);
        if ( !book ){ 
            return res.status(404).json({ error: req.t("bookNotFound")});
        }
        
        if(!book.borrower.equals (borrowerId)){
            return res.status(400).json({ error: req.t("bookNotBorrowedByUser") });
        }

        book.borrower = null;
        await book.save();

        res.status(200).json({ message: req.t("bookReturnedSuccessfully") });
    } catch (error) {
        res.status(400).json({ error: req.t("errorProcessingRequest") });
    }
};
