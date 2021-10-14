import express from 'express';

import checkAuth from '../middleware/checkAuth.js';
import checkPermission from '../middleware/checkPermission.js';

import { create } from '../controllers/team/index.js';

const router = express.Router();

router.post(
  '/create',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'department', 'C'),
  create
);

export default router;
