import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

fs.mkdirSync("tmp", { recursive: true });
app.use(express.static("tmp"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // this sets the name of the file to the original name
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload",
  cors(),
  upload.single("file"),
  function (req, res, next) {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.send(req.file);
  },
  (err, req, res, next) => {
    // Custom error handling for multer
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.message); // Handles multer-specific errors
    }
    res.status(500).send("Internal server error"); // Generic error handler
  },
);

import path from "path";

app.get("/:name", (req, res) => {
  try {
    const filePath = path.join(__dirname, "tmp", req.params.name);
    const isAvailable = fs.existsSync(filePath);
    if (isAvailable) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
