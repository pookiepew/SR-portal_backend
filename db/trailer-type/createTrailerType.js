const createTrailerType = async (name, creator, TrailerType) => {
  try {
    const trailerType = new TrailerType({
      name,
      creator,
    });
    await trailerType.save();
    return trailerType;
  } catch (error) {
    throw error;
  }
};

export default createTrailerType;
