const createRole = async (feature, access, creator, Role) => {
  try {
    const newRole = new Role({
      feature,
      access,
      users: [creator],
      creator,
    });
    await newRole.save();
    return newRole;
  } catch (err) {
    throw err;
  }
};

export default createRole;
