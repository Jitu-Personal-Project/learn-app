const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.post("/", fileController.createFile);
router.post("/new", fileController.createFileWithLanguage); // Ensure this route exists
router.get("/:id", fileController.getFileById);
router.put("/:id", fileController.updateFile);
router.post("/save", fileController.saveCode); // New route for saving code content
router.delete("/:id", fileController.deleteFile);
router.get("/", fileController.getAllFiles);

module.exports = router;
