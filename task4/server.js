const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully!",
    file: req.file,
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});