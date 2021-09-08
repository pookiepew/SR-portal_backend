import express from 'express';

import checkAuth from '../middleware/checkAuth.js';
import checkPermission from '../middleware/checkPermission.js';

import { create, findAll, findOne } from '../controllers/trailer/index.js';

const router = express.Router();

router.post(
  '/create',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'trailer', 'C'),
  create
);

router.get(
  '/find-all',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'trailer', 'R'),
  findAll
);

router.get(
  '/find-one/:id',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'trailer', 'R'),
  findOne
);

export default router;
