const createNew = async (areacodeId, creator, Area) => {
  try {
    const area = new Area({
      areas: [],
      code: areacodeId,
      creator,
    });
    await area.save();
    return area;
  } catch (error) {
    throw error;
  }
};

export default createNew;
