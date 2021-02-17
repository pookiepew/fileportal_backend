module.exports = findInvitedUser = async (email, InvitedUser) => {
  if (!email) throw new Error('userId not provided');
  try {
    const user = await InvitedUser.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
};
