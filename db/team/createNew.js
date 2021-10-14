const createNew = async (name, location, creator, Team, HttpError) => {
  try {
    const team = new Team({
      name,
      users: [creator],
      location,
      creator,
    });
    await team.save();
    return team;
  } catch (error) {
    return new HttpError('Creating new team failed, please try again', 500);
  }
};

export default createNew;
