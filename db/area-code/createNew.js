const createNew = async (name, creator, AreaCode) => {
  try {
    const areaCode = new AreaCode({
      name,
      creator,
    });
    await areaCode.save();
    return areaCode;
  } catch (error) {
    throw error;
  }
};

export default createNew;
