const createNew = async (name, team, location, creator, Company, HttpError) => {
  try {
    const company = new Company({
      name,
      users: [creator],
      teams: [team],
      location,
      creator,
    });
    await company.save();
    return company;
  } catch (error) {
    return new HttpError('Creating new company failed, please try again', 500);
  }
};

export default createNew;
