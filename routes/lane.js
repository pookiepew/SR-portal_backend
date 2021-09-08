import express from 'express';

import checkAuth from '../middleware/checkAuth.js';

import { create, findOne } from '../controllers/lane/index.js';

const router = express.Router();

router.post('/create', checkAuth, create);

router.get('/find-one', checkAuth, findOne);

export default router;
