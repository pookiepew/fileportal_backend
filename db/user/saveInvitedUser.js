module.exports = saveInvitedUser = async (
  email,
  invitedBy,
  token,
  InvitedUser
) => {
  if (!email || !invitedBy || !token)
    throw new Error('Email, invitedBy or token missing');
  try {
    const user = new InvitedUser({
      email,
      invitedBy,
      token,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
