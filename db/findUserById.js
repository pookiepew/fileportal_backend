module.exports = findUserById = async (
  userId,
  filter = '',
  User,
  HttpError
) => {
  if (!userId) throw new Error('userId not provided');
  try {
    const user = await User.findOne({ _id: userId }).select(filter);
    if (!user) {
      const error = new HttpError('User with that id was not found', 404);
      throw error;
    }
    return user;
  } catch (err) {
    throw err;
  }
};
