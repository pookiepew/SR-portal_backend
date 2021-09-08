const saveUser = async (name, email, password, role, invitedBy, User) => {
  if (!name || !email || !password)
    throw new Error('Name, Email or Password missing');
  try {
    const user = new User({
      name,
      email,
      password,
      roles: [role],
      invitedBy,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

export default saveUser;
