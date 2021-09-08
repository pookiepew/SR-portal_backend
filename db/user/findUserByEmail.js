const findUserByEmail = async (email, User) => {
  if (!email) throw new Error('userId not provided');
  try {
    const user = await User.findOne({ email })
      .populate({
        path: 'roles',
        select: 'feature access',
      })
      .populate({
        path: 'invitedBy',
        select: '-password',
        populate: {
          path: 'roles',
          select: 'feature access',
        },
      });
    return user;
  } catch (err) {
    throw err;
  }
};

export default findUserByEmail;
