const findRoleById = async (roleId, Role) => {
  try {
    const role = Role.findById(roleId);
    return role;
  } catch (error) {
    throw new Error('Something went wrong, please try again');
  }
};

export default findRoleById;
