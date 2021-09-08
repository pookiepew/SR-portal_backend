import DeletedUser from '../../models/DeletedUser.js';

const findAllDeletedUsers = async (req, res, next) => {
  try {
    const users = await DeletedUser.find()
      .populate({
        path: 'roles',
        select: 'feature access',
      })
      .populate({
        path: 'invitedBy',
        select: 'name email',
      })
      .sort({ email: 1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export default findAllDeletedUsers;
