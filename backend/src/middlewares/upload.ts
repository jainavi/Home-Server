import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const printStorage = multer.diskStorage({
  destination: 'uploads/print-documents',
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + uuidv4());
  },
});

export const printUpload = multer({
  storage: printStorage,
  limits: {
    fields: 4,
    fileSize: 1e8,
    files: 1,
  },
});
