module.exports = updateUser = async (userId, userDetails, User) => {
  try {
    const query = {
      _id: userId,
    };
    const options = {
      new: true,
    };
    const user = await User.findOneAndUpdate(
      query,
      userDetails,
      options
    ).select('-password');
    return user;
  } catch (err) {
    throw err;
  }
};
