const mongoose = require("mongoose");
const Borrowing = require("../models/borrowingModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const borrowingController = {
    issueBook: async (req, res, next) => {
        let session = null;
        let decremented = false;

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

            if (book.availableCopies <= 0) {
                return res.status(409).json({
                    error: { message: "No available copies for this book" }
                });
            }

            // Use replica-set/Atlas transaction when supported
            const topology = mongoose.connection?.client?.topology?.description;
            const supportsTransactions = Boolean(
                topology && topology.type !== "Single" && topology.setName
            );

            if (supportsTransactions) {
                session = await mongoose.startSession();
                session.startTransaction();
            }

            const sessionOpt = session ? { session } : {};

            // Check duplicate active loan
            const activeLoan = await (session
                ? Borrowing.findOne({ userId, bookId, status: "issued" }).session(session)
                : Borrowing.findOne({ userId, bookId, status: "issued" }));

            if (activeLoan) {
                if (session) {
                    await session.abortTransaction();
                }
                return res.status(409).json({
                    error: { message: "User already has an active loan for this book" }
                });
            }

            // Atomically decrement stock
            const updatedBook = await Book.findOneAndUpdate(
                { _id: bookId, availableCopies: { $gt: 0 } },
                { $inc: { availableCopies: -1 } },
                { returnDocument: "after", ...sessionOpt }
            );

            if (!updatedBook) {
                if (session) {
                    await session.abortTransaction();
                }
                return res.status(409).json({
                    error: { message: "No available copies for this book" }
                });
            }
            decremented = true;

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

            if (session) {
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
            } else if (decremented) {
                // Guaranteed atomic rollback: restore stock if loan creation failed
                try {
                    await Book.findByIdAndUpdate(req.body.bookId, { $inc: { availableCopies: 1 } });
                } catch {}
            }

            if (err.code === 11000) {
                return res.status(409).json({
                    error: { message: "User already has an active loan for this book" }
                });
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
