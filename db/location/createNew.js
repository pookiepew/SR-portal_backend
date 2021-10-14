const createNew = async (
  address,
  postalcode,
  postalarea,
  country,
  creator,
  Location,
  HttpError
) => {
  try {
    const location = new Location({
      address,
      postalcode,
      postalarea,
      country,
      creator,
    });
    await location.save();
    return location;
  } catch (error) {
    return new HttpError('Creating new location failed, please try again', 500);
  }
};

export default createNew;
