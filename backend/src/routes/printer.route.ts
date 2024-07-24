import express from 'express';
import { query } from 'express-validator';

import { printUpload } from '../middlewares/upload';
import { print, cancelJob } from '../controllers/printer.controller';
import { PrintQuality } from '../utils/enums';
import { validate, requiredFile } from '../middlewares/validate';

const router = express.Router();

const printValidationRules = () => [
  query('numberOfCopies')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Number of copies must be between 1 and 10'),
  query('toLandScape')
    .optional()
    .isBoolean()
    .withMessage('toLandScape must be a boolean')
    .toBoolean(),
  query('pages')
    .optional()
    .isString()
    .customSanitizer((value) => value.replace(/\s+/g, ''))
    .matches(/^(((\d+-\d+)|(\d+)),)*(((\d+-\d+)|(\d+)))?$/)
    .withMessage('Invalid pages string'),
  query('quality')
    .optional()
    .custom((value) => Object.keys(PrintQuality).includes(value))
    .withMessage('Invalid quality value'),
];

router.post(
  '/',
  printUpload.single('upload'),
  requiredFile(),
  printValidationRules(),
  validate,
  print
);
router.post('/cancel', cancelJob);

export default router;
