const findRoleByFeature = async (feature, Role) => {
  try {
    const role = await Role.find({ feature }).populate({
      path: 'users',
      select: '-password -createdAt -updatedAt',
    });
    return role;
  } catch (error) {
    throw error;
  }
};

export default findRoleByFeature;
