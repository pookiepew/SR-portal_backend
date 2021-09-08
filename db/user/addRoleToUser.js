const addRoleToUser = async (userId, roleId, User, HttpError) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    user.roles.push(roleId);
    await user.save();
    const updatedUser = await User.findById(userId).populate({
      path: 'roles',
      select: 'feature access',
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export default addRoleToUser;
