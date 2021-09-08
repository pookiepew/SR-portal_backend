const addUserToRole = async (userId, roleId, Role, HttpError) => {
  try {
    const role = await Role.findById(roleId);
    if (!role) {
      throw new HttpError('Role not found', 404);
    }
    role.users.push(userId);
    await role.save();
  } catch (err) {
    throw err;
  }
};

export default addUserToRole;
