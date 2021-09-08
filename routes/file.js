import express from 'express';

import checkAuth from '../middleware/checkAuth.js';

import { upload } from '../controllers/file/index.js';

const router = express.Router();

router.post('/upload', checkAuth, upload);

export default router;
