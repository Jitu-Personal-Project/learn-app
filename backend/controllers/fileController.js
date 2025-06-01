const File = require("../models/fileModel");
const winston = require("winston");

const createFile = async (req, res) => {
  try {
    const { name, content, language } = req.body;

    // Set all existing files to inactive without modifying their name or content
    await File.updateMany({ active: true }, { $set: { active: false } });

    const newFile = new File({ name, content, language, active: true });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    winston.error(error);
    res.status(400).json({ message: error.message });
  }
};

const createFileWithLanguage = async (req, res) => {
  try {
    const { name, content, language } = req.body;

    // Set all existing files to inactive without modifying their name or content
    await File.updateMany({ active: true }, { $set: { active: false } });

    const newFile = new File({ name, content, language, active: true });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    winston.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    winston.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateFile = async (req, res) => {
  try {
    const { name, content, active } = req.body;
    const file = await File.findByIdAndUpdate(
      req.params.id,
      { name, content, active },
      { new: true }
    );
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    winston.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileCount = await File.countDocuments();
    if (fileCount <= 1) {
      return res
        .status(400)
        .json({ message: "At least one file must remain." });
    }

    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await File.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "File deleted successfully" });
    // Set if there files the last file of length file active status to true
    const files = await File.find();
    if (files.length > 0) {
      const lastFile = files[files.length - 1];
      await File.findByIdAndUpdate(
        lastFile._id,
        { active: true },
        { new: true }
      );
    }
  } catch (error) {
    winston.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    winston.error(error);
    res.status(500).json({ message: error.message });
  }
};

const saveCode = async (req, res) => {
  try {
    const { content, fileId } = req.body;

    const file = await File.findByIdAndUpdate(
      fileId, // Corrected query to directly use fileId
      { content },
      { new: true }
    );
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    winston.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFile,
  getFileById,
  updateFile,
  deleteFile,
  getAllFiles,
  createFileWithLanguage,
  saveCode,
};
