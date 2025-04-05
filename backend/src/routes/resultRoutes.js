import express from 'express';
import { handleResultSubmission } from '../controllers/resultController.js';

const router = express.Router();

router.post('/submit', handleResultSubmission);

export default router;
