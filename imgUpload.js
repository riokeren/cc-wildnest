const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'capstone-project-wildnest',
  keyFilename: 'capstone-project-wildnest-986c69d7b95f.json',
});

const bucket = storage.bucket('wildnest-image');

function uploadImage(req, res, next) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Generate a unique filename
  const filename = `${Date.now()}-${req.file.originalname}`;

  // Create a file object and upload the file to the bucket
  const file = bucket.file(filename);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  });

  stream.on('error', (err) => {
    next(err);
  });

  stream.on('finish', () => {
    // File upload completed
    res.status(200).send('File uploaded successfully.');
  });

  // Write the file buffer to the bucket
  stream.end(req.file.buffer);
}

module.exports = { uploadImage };