import express from 'express';

import checkAuth from '../middleware/checkAuth.js';
import checkPermission from '../middleware/checkPermission.js';

import {
  login,
  addRole,
  register,
  data,
  deleteUser,
  invite,
  deleteInvite,
  generateNewInviteToken,
  update,
  findAllInvitedUsers,
  findAllDeletedUsers,
  findAll,
  removeRole,
  checkPassword,
  changePassword,
} from '../controllers/user/index.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', checkAuth, register);

router.get('/data', checkAuth, data);

router.delete(
  '/delete/:id',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'D'),
  deleteUser
);

router.post(
  '/invite',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'C'),
  invite
);

router.post('/new-invite-token', checkAuth, generateNewInviteToken);

router.post('/check-password', checkAuth, checkPassword);

router.delete(
  '/invite',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'D'),
  deleteInvite
);

router.put('/update', checkAuth, update);

router.put('/change-password', checkAuth, changePassword);

router.get(
  '/find-all',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'R'),
  findAll
);

router.get(
  '/find-all-deleted',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'R'),
  findAllDeletedUsers
);

router.get(
  '/invite/find-all',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'R'),
  findAllInvitedUsers
);

router.put(
  '/remove-role',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'U'),
  removeRole
);

router.put(
  '/add-role',
  checkAuth,
  (req, res, next) => checkPermission(req, res, next, 'user', 'U'),
  addRole
);

export default router;
