module.exports = findInvitedUserByToken = async (token, InvitedUser) => {
  if (!token) throw new Error('[tokenMatchInviteToken] - Token not provided');
  try {
    const user = await InvitedUser.findOne({ token });
    return user;
  } catch (err) {
    throw err;
  }
};
