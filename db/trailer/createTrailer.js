const createTrailer = async (
  regNumber,
  type,
  currentLocation,
  nextLocation,
  geoLocation,
  specs,
  imgURL,
  creator,
  Trailer
) => {
  try {
    const trailer = new Trailer({
      regNumber,
      type,
      currentLocation,
      nextLocation,
      geoLocation,
      specs,
      imgURL,
      creator,
    });
    await trailer.save();
    return trailer;
  } catch (error) {
    throw error;
  }
};

export default createTrailer;
