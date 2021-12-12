const findUserById = async (userId, filter = "", User, HttpError) => {
  if (!userId) throw new HttpError("userId not provided", 400);
  try {
    const user = await User.findOne({ _id: userId })
      .select(filter)
      .populate({
        path: "roles",
        select: "feature access",
      })
      .populate({
        path: "company",
        select: "-users -teams",
        populate: {
          path: "location",
          populate: {
            path: "areacode",
          },
        },
      })
      .populate({
        path: "team",
        select: "-users",
        populate: {
          path: "location",
          populate: {
            path: "areacode",
          },
        },
      })
      .populate({
        path: "invitedBy",
        select: "-password",
        populate: {
          path: "roles",
          select: "feature access",
        },
      });
    return user;
  } catch (err) {
    throw new HttpError("Something went wrong", 500);
  }
};

export default findUserById;
