const findTrailerById = async (trailerId, Trailer) => {
  try {
    const trailer = await Trailer.findById(trailerId).populate({
      path: 'creator',
      select: 'name email',
    });
    return trailer;
  } catch (error) {
    throw error;
  }
};

export default findTrailerById;
