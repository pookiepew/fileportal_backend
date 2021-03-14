module.exports = createNewLane = async (name, creator, Lane) => {
  try {
    const lane = new Lane({
      name,
      creator,
    });
    await lane.save();
    return lane;
  } catch (err) {
    throw err;
  }
};
