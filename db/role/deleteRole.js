const deleteRole = async (roleId, Role) => {
  try {
    await Role.deleteOne({ _id: roleId });
  } catch (error) {
    throw error;
  }
};

export default deleteRole;
