exports.uploadFile = (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded or invalid file type');
    }
  
    res.status(200).send({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
    });
  };
  