import User from '../../models/User.js';
const findAll = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate({
        path: 'company',
      })
      .populate({
        path: 'team',
        select: '-users',
        populate: {
          path: 'location',
        },
      })
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
  } catch (err) {
    next(err);
  }
};

export default findAll;
