module.exports = findLaneByName = async (name, Lane, HttpError) => {
  try {
    const lane = await Lane.findOne({ name }).populate({
      path: 'creator',
      select: 'name email',
    });
    if (!lane) throw new HttpError('Lane not found', 404);
    return lane;
  } catch (err) {
    throw err;
  }
};
