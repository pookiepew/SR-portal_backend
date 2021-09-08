const findRoleByAccess = async (access, feature, Role, HttpError) => {
  try {
    const role = await Role.findOne({ access, feature });
    if (!role) {
      throw new HttpError('Role does not exist', 404);
    }
    return role;
  } catch (error) {
    throw error;
  }
};

export default findRoleByAccess;
