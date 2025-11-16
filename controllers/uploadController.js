const fs = require('fs');
const path = require('path');

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier reçu." });
  }

  res.json({
    message: "Fichier uploadé avec succès !",
    file: {
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`
    }
  });
};

exports.listFiles = (req, res) => {
  const uploadDir = path.join(__dirname, "..", "uploads");
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Impossible de lister les fichiers." });
    const items = files.map(f => ({ filename: f, url: `/uploads/${f}` }));
    res.json({ files: items });
  });
};
