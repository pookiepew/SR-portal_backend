import express from 'express';

import checkAuth from '../middleware/checkAuth.js';

import { create, findAll } from '../controllers/trailer-type/index.js';

const router = express.Router();

router.post('/create', checkAuth, create);

router.get('/find-all', checkAuth, findAll);

export default router;
