const removeUserFromRole = async (roleId, userId, Role) => {
  try {
    const role = await Role.findById(roleId);
    role.users = role.users.filter((id) => id.toString() !== userId.toString());
    await role.save();
    return role;
  } catch (error) {
    throw error;
  }
};

export default removeUserFromRole;
