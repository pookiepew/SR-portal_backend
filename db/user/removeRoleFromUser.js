const removeRoleFromUser = async (userId, roleId, User) => {
  try {
    const user = await User.findById(userId);
    user.roles = user.roles.filter((id) => id.toString() !== roleId.toString());
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

export default removeRoleFromUser;
