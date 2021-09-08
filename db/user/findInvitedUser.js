const findInvitedUser = async (email, InvitedUser, HttpError) => {
  if (!email) throw new HttpError('Email is not provided', 400);
  try {
    const user = await InvitedUser.findOne({ email })
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
    throw new HttpError('Something went wrong', 500);
  }
};

export default findInvitedUser;
