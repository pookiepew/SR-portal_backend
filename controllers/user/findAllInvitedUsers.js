import InvitedUser from '../../models/InvitedUser.js';

const findAllInvitedUsers = async (req, res, next) => {
  try {
    const users = await InvitedUser.find()
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

export default findAllInvitedUsers;
