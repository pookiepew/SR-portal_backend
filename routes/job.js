import express from 'express';

import checkAuth from '../middleware/checkAuth.js';

import { create, findOne, findAll } from '../controllers/job/index.js';

const router = express.Router();

router.post('/create', checkAuth, create);

router.get('/find-one', checkAuth, findOne);

router.get('/find-all', checkAuth, findAll);

export default router;
