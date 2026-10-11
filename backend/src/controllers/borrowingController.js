const mongoose = require("mongoose");
const Borrowing = require("../models/borrowingModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const borrowingController = {
    issueBook: async (req, res, next) => {
        let session = null;
        try {
            const { userId, bookId, dueDate } = req.body;

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    error: { message: "Valid userId is required" }
                });
            }

            if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
                return res.status(400).json({
                    error: { message: "Valid bookId is required" }
                });
            }

            if (!dueDate) {
                return res.status(400).json({
                    error: { message: "Due date is required" }
                });
            }

            const parsedDueDate = new Date(dueDate);
            if (Number.isNaN(parsedDueDate.getTime())) {
                return res.status(400).json({
                    error: { message: "Invalid due date format" }
                });
            }

            if (parsedDueDate <= new Date()) {
                return res.status(400).json({
                    error: { message: "Due date must be in the future" }
                });
            }

            // Verify user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    error: { message: "User not found" }
                });
            }

            // Verify book exists
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({
                    error: { message: "Book not found" }
                });
            }

            // Check duplicate active loan
            const activeLoan = await Borrowing.findOne({
                userId,
                bookId,
                status: "issued"
            });
            if (activeLoan) {
                return res.status(409).json({
                    error: { message: "User already has an active loan for this book" }
                });
            }

            // Check available copies
            if (book.availableCopies <= 0) {
                return res.status(409).json({
                    error: { message: "No available copies for this book" }
                });
            }

            // Use transaction when supported by MongoDB session and connection is active
            let useTransaction = false;
            try {
                if (mongoose.connection.readyState === 1 && typeof mongoose.startSession === "function") {
                    session = await mongoose.startSession();
                    if (session && typeof session.startTransaction === "function") {
                        session.startTransaction();
                        useTransaction = true;
                    }
                }
            } catch {
                session = null;
                useTransaction = false;
            }

            const sessionOpt = useTransaction && session ? { session } : {};

            // Atomically decrement stock
            const updatedBook = await Book.findOneAndUpdate(
                { _id: bookId, availableCopies: { $gt: 0 } },
                { $inc: { availableCopies: -1 } },
                { new: true, ...sessionOpt }
            );

            if (!updatedBook) {
                if (useTransaction && session) {
                    await session.abortTransaction();
                }
                return res.status(409).json({
                    error: { message: "No available copies for this book" }
                });
            }

            // Create borrowing record
            const [borrowing] = await Borrowing.create(
                [
                    {
                        userId,
                        bookId,
                        dueDate: parsedDueDate,
                        status: "issued",
                        issueDate: new Date()
                    }
                ],
                sessionOpt
            );

            if (useTransaction && session) {
                await session.commitTransaction();
            }

            return res.status(201).json({
                data: {
                    borrowing: borrowing.toSafeObject(),
                    book: updatedBook.toSafeObject()
                }
            });
        } catch (err) {
            if (session) {
                try {
                    await session.abortTransaction();
                } catch {}
            }
            return next(err);
        } finally {
            if (session) {
                try {
                    await session.endSession();
                } catch {}
            }
        }
    }
};

module.exports = borrowingController;
