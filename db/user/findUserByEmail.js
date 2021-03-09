module.exports = findUserByEmail = async (email, User) => {
  if (!email) throw new Error('userId not provided');
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
};
