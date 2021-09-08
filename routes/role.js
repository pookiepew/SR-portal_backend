import express from 'express';

import checkAuth from '../middleware/checkAuth.js';
import checkPermission from '../middleware/checkPermission.js';

import {
  addUser,
  create,
  deleteRole,
  findByFeature,
  findAll,
  removeUser,
} from '../controllers/role/index.js';

const router = express.Router();

router.put(
  '/add-user',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'role', 'U'),
  addUser
);

router.post(
  '/create',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'role', 'C'),
  create
);

router.delete(
  '/delete',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'role', 'D'),
  deleteRole
);

router.get(
  '/find-by-feature',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'role', 'R'),
  findByFeature
);

router.get(
  '/find-all',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'role', 'R'),
  findAll
);

router.put(
  '/remove-user',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'role', 'U'),
  removeUser
);

export default router;
