module.exports = findTripByNumber = async (number, Trip, HttpError) => {
  try {
    const SRGtrip = await Trip.findOne({ 'numbers.SRG': number })
      .populate({
        path: 'creator',
        select: 'name email',
      })
      .populate({
        path: 'jobs',
        populate: { path: 'creator', select: 'name email' },
      });
    const LUBtrip = await Trip.findOne({ 'numbers.LUB': number })
      .populate({
        path: 'creator',
        select: 'name email',
      })
      .populate({
        path: 'jobs',
        populate: { path: 'creator', select: 'name email' },
      });
    if (!SRGtrip && !LUBtrip) {
      const error = new HttpError('Trip not found', 404);
      throw error;
    }
    if (SRGtrip) return SRGtrip;
    if (LUBtrip) return LUBtrip;
  } catch (err) {
    throw err;
  }
};
