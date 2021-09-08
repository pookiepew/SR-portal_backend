const deleteUser = async (userId, User) => {
  try {
    await User.deleteOne({ _id: userId });
  } catch (error) {
    throw error;
  }
};

export default deleteUser;
