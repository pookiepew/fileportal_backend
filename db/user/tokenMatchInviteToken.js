module.exports = tokenMatchInviteToken = async (token, InvitedUser) => {
  if (!token) throw new Error('[tokenMatchInviteToken] - Token not provided');
  try {
    const isMatch = await InvitedUser.findOne({ token });
    if (isMatch) return true;
    return false;
  } catch (err) {
    throw err;
  }
};
