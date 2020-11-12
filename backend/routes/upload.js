import express from 'express';
import multer from 'multer';
import path from 'path';

import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const validFileType = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const validMimeType = fileTypes.test(file.mimetype);

  if (validFileType && validMimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Image files supported only!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), protect, admin, (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
