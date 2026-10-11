const express = require("express");
const { authenticateUser, requireAdmin } = require("../middleware/authMiddleware");
const borrowingController = require("../controllers/borrowingController");

const router = express.Router();

router.post("/", authenticateUser, requireAdmin, borrowingController.issueBook);

module.exports = router;
